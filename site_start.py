# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3


from io import StringIO
import json
import os
import sys

import cherrypy

import boincsite.boinc.RpcFactory as rf

import boincsite.status.AvailableProject as ap
import boincsite.status.DailyTransfer as dt
import boincsite.status.DiskUsage as duj
import boincsite.status.GlobalPreferences as ggp
import boincsite.status.Notice as notice

import boincsite.templates.TemplateRenderer as tr

import boincsite.util.JSONAttrEncoder as jsae

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))


class WebServer(object):

    def __init__(self):
        self.__rpc_factory = rf.RpcFactory

        self.__renderer = tr.TemplateRenderer()
        self.__io = StringIO()

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080
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
    def task_json(self, **kwargs):
        task_name = kwargs.get('task_name', '')
        task_command = self.__rpc_factory.create('GetTask')
        task = task_command.execute(task_name)
        return json.dumps(task, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def projects_json(self, **kwargs):
        return json.dumps(self.__get_projects(), self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def project_json(self, **kwargs):
        project = [t for t in self.__get_projects() if t.name==kwargs.get('project', '')].pop()
        return json.dumps(project, self.__io, cls=jsae.JSONEncoder)

    def __get_projects(self):
        projects_command = self.__rpc_factory.create('GetProjectStatus')
        return list(projects_command.execute())

    @cherrypy.expose
    def messages_json(self, **kwargs):
        return self.__straight_json_dump('GetMessages', jsae, lambda x: list(x))

    @cherrypy.expose
    def tasks_json(self, **kwargs):
        return self.__straight_json_dump('GetTasks', jsae, lambda x: list(x))

    @cherrypy.expose
    def disk_usage_json(self, **kwargs):
        return self.__straight_json_dump('DiskUsage', duj)

    @cherrypy.expose
    def host_info_json(self, **kwargs):
        return self.__straight_json_dump('HostInfo', jsae)

    @cherrypy.expose
    def daily_transfer_history_json(self, **kwargs):
        return self.__straight_json_dump('DailyTransferHistory', dt, lambda x: list(x))

    @cherrypy.expose
    def notices_json(self, **kwargs):
        return self.__straight_json_dump('GetNotices', notice, lambda x: list(x))

    @cherrypy.expose
    def get_global_preferences_json(self, **kwargs):
        return self.__straight_json_dump('GetGlobalPreferences', ggp)

    @cherrypy.expose
    def get_all_projects_list_json(self, **kwargs):
        return self.__straight_json_dump('GetAllProjectsList', ap, lambda x: list(x))

    def __straight_json_dump(self, command_type, result_type, post_process=None):
        command = self.__rpc_factory.create(command_type)
        result = command.execute()

        if post_process is not None:
            result = post_process(result)

        return json.dumps(result, self.__io, cls=result_type.JSONEncoder)

    def __render(self, page, **kwargs):
        return self.__renderer.render(page, **kwargs)

    @cherrypy.expose
    def suspend_resume(self, **kwargs):

        task_name = kwargs.get('task_name', '')
        return_url = kwargs.get('return_url', '/')

        if task_name!='':
            task_command = self.__rpc_factory.create('GetTask')
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

    @cherrypy.expose
    def attach_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        email_address = kwargs.get('email', '')
        password_hash = kwargs.get('password', '')

        command = self.__rpc_factory.create('AttachProject')
        command.execute(project_url, email_address, password_hash)

        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def dettach_project(self, **kwargs):
        project_url = kwargs.get('project_url', '')

        command = self.__rpc_factory.create('DetachProject')
        command.execute(project_url)

    @cherrypy.expose
    def experimental_task(self, **kwargs):
        command = self.__rpc_factory.create('ExperimentalTask')
        command.execute()

if __name__=='__main__':
    ws = WebServer()
    ws.start()
