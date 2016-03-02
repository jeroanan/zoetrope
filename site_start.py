# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3


from io import StringIO
import json
import os

import cherrypy

import boincsite.boinc.CommandLineFactory as clf
import boincsite.boinc.RpcFactory as rf
import boincsite.boinc.commandline.GetTask as get_task

import boincsite.status.DailyTransfer as dt
import boincsite.status.DiskUsage as duj

import boincsite.templates.TemplateRenderer as tr

import boincsite.util.JSONEncoder as jse

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))


class WebServer(object):

    def __init__(self):
        self.__command_factory = clf.CommandLineFactory
        self.__rpc_factory = rf.RpcFactory

        self.__renderer = tr.TemplateRenderer()
        self.__io = StringIO()

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer(), '/', 'server.conf')

    @cherrypy.expose
    def index(self, **kwargs):
        tasks_command = self.__rpc_factory.create('GetTasks')
        boinc_tasks = list(tasks_command.execute())

        projects = self.__get_projects()

        for t in boinc_tasks:
            pns = [p.name for p in projects if p.master_url==t.project_url]
            t.project_name = pns.pop()

        return self.__render('index.html', tasks=boinc_tasks, title='Boinc Tasks')

    @cherrypy.expose
    def tasks_json(self, **kwargs):
        command = self.__rpc_factory.create('GetTasks')
        tasks = command.execute()
        return json.dumps(list(tasks), self.__io, cls=jse.JSONEncoder)

    @cherrypy.expose
    def task_json(self, **kwargs):
        task_name = kwargs.get('task_name', '')
        task_command = self.__rpc_factory.create('GetTask')
        task = task_command.execute(task_name)
        return json.dumps(task, self.__io, cls=jse.JSONEncoder)

    @cherrypy.expose
    def projects_json(self, **kwargs):
        return json.dumps(self.__get_projects(), self.__io, cls=jse.JSONEncoder)

    @cherrypy.expose
    def project_json(self, **kwargs):
        project = [t for t in self.__get_projects() if t.name==kwargs.get('project', '')].pop()
        return json.dumps(project, self.__io, cls=jse.JSONEncoder)

    def __get_projects(self):
        projects_command = self.__rpc_factory.create('GetProjectStatus')
        return list(projects_command.execute())

    @cherrypy.expose
    def do_network_communication(self, **kwargs):
        command = self.__command_factory.create('DoNetworkCommunication')
        command.execute()
        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def disk_usage_json(self, **kwargs):
        disk_usage_command = self.__rpc_factory.create('DiskUsage')
        du = disk_usage_command.execute()
        return json.dumps(du, self.__io, cls=duj.JSONEncoder)

    @cherrypy.expose
    def messages_json(self, **kwargs):
        command = self.__command_factory.create('GetMessages')
        ms = list(command.execute())
        return json.dumps(ms, self.__io, cls=jse.JSONEncoder)

    @cherrypy.expose
    def host_info_json(self, **kwargs):
        host_info_command = self.__command_factory.create('HostInfo')
        hi = host_info_command.execute()
        return json.dumps(hi, self.__io, cls=jse.JSONEncoder)

    @cherrypy.expose
    def daily_transfer_history_json(self, **kwargs):
        daily_transfer_history_command = self.__command_factory.create('DailyTransferHistory')
        dts = list(daily_transfer_history_command.execute())
        return json.dumps(dts, self.__io, cls=dt.JSONEncoder)

    def __render(self, page, **kwargs):
        return self.__renderer.render(page, **kwargs)

    @cherrypy.expose
    def suspend_resume(self, **kwargs):

        task_name = kwargs.get('task_name', '')
        return_url = kwargs.get('return_url', '/')

        if task_name!='':
            task_command = self.__command_factory.create('GetTask')
            task = task_command.execute(task_name)

            factory_string = 'ResumeTask' if task.suspended_via_gui else 'SuspendTask'
            command = self.__rpc_factory.create(factory_string)
            command.execute(task_name)

        raise cherrypy.HTTPRedirect(return_url)

    @cherrypy.expose
    def abort_task(self, **kwargs):
        task_name = kwargs.get('task_name', '')

        if task_name!='':
            abort_task_command = self.__rpc_factory.create('AbortTask')
            abort_task_command.execute(task_name)

        raise cherrypy.HTTPRedirect('/')

if __name__=='__main__':
    ws = WebServer()
    ws.start()
