# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import os

import cherrypy

import boincsite.boinc.CommandLineFactory as clf
import boincsite.boinc.RpcFactory as rf
import boincsite.boinc.commandline.GetTask as get_task

import boincsite.templates.TemplateRenderer as tr

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))


class WebServer(object):

    def __init__(self):
        self.__command_factory = clf.CommandLineFactory
        self.__rpc_factory = rf.RpcFactory

        self.__renderer = tr.TemplateRenderer()

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer(), '/', 'server.conf')

    @cherrypy.expose
    def index(self, **kwargs):
        tasks_command = self.__command_factory.create('GetTasks')
        boinc_tasks = list(tasks_command.execute())

        projects = self.__get_projects()

        for t in boinc_tasks:
            pns = [p.name for p in projects if p.master_url==t.project_url]
            t.project_name = pns.pop()

        return self.__render('index.html', tasks=boinc_tasks, title='Boinc Tasks')

    @cherrypy.expose
    def task(self, **kwargs):

        task_name = kwargs.get('task_name', '')

        if task_name == '':
            raise cherrypy.HTTPRedirect('/')

        try:
            task_command = self.__command_factory.create('GetTask')
            task = task_command.execute(task_name)
        except get_task.TaskNotFoundException:
            return "Task {task_name} not found".format(task_name=task_name)

        projects = self.__get_projects()

        task.project_name = [p.name for p in projects if p.master_url==task.project_url].pop()

        return self.__render('task.html', task=task, title=task_name)

    @cherrypy.expose
    def projects(self, **kwargs):
        return self.__render('projects.html',projects=self.__get_projects(), title='Boinc Projects')

    @cherrypy.expose
    def project(self, **kwargs):

        project = [t for t in self.__get_projects() if t.name==kwargs.get('project', '')].pop()
        return self.__render('project.html', project=project, title=project.name)

    def __get_projects(self):
        projects_command = self.__command_factory.create('GetProjectStatus')
        return list(projects_command.execute())

    @cherrypy.expose
    def do_network_communication(self, **kwargs):
        command = self.__command_factory.create('DoNetworkCommunication')
        command.execute()
        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def disk_usage(self, **kwargs):
        disk_usage_command = self.__command_factory.create('DiskUsage')
        du = disk_usage_command.execute()
        return self.__render('diskusage.html', title='Disk Usage', disk_usage=du)

    @cherrypy.expose
    def messages(self, **kwargs):
        get_messages_command = self.__command_factory.create('GetMessages')
        messages = get_messages_command.execute()
        return self.__render('messages.html', messages=reversed(list(messages)), title="Messages")

    @cherrypy.expose
    def host_info(self, **kwargs):
        host_info_command = self.__command_factory.create('HostInfo')
        hi = host_info_command.execute()
        return self.__render('hostinfo.html', title='Host Info', host_info=hi)

    @cherrypy.expose
    def daily_transfer_history(self, **kwarhs):
        daily_transfer_history_command = self.__command_factory.create('DailyTransferHistory')
        dts = daily_transfer_history_command.execute()
        return self.__render('dailytransferhistory.html', title='Daily Transfer History', transfers=dts)

    def __render(self, page, **kwargs):
        return self.__renderer.render(page, **kwargs)

    @cherrypy.expose
    def suspend_resume(self, task_name, return_url):
        raise cherrypy.HTTPRedirect(return_url)

    @cherrypy.expose
    def abort_task(self, **kwargs):
        task_name = kwargs.get('task_name', '')

        if task_name!='':
            abort_task_command = self.__rpc_factory.create('AbortTask')
            abort_task_command.execute(task_name)

        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def experimental_tasks(self, **kwargs):
        command = self.__rpc_factory.create('GetTasks')
        result = command.execute()
        for r in result:
            print(r.name + ' ' + str(r.fraction_done))

if __name__=='__main__':
    ws = WebServer()
    ws.start()
