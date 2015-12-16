import os
from subprocess import Popen, PIPE

import cherrypy

import boincsite.boinc.CommandLineFactory as clf
import boincsite.Task as boinc_task
import boincsite.templates.TemplateRenderer as tr

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))

class WebServer(object):

    def __init__(self):
        self.__command_factory = clf.CommandLineFactory

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer(), '/', 'server.conf')

    @cherrypy.expose
    def index(self):
        tasks_command = self.__command_factory.create('GetTasks')
        projects_command = self.__command_factory.create('GetProjectStatus')

        boinc_tasks = list(tasks_command.execute())
        projects = list(projects_command.execute())

        for t in boinc_tasks:
            pns = [p.name for p in projects if p.master_url==t.project_url]
            t.project_name = pns.pop()

        return tr.TemplateRenderer().render('index.html', tasks=boinc_tasks, title='Boinc Tasks')

    @cherrypy.expose
    def task(self, task_name):

        try:
            task_command = self.__command_factory.create('GetTask')
            task = task_command.execute(task_name)
        except get_task.TaskNotFoundException:
            return "Task {task_name} not found".format(task_name=task_name)

        projects_command = self.__command_factory.create('GetProjectStatus')
        projects = list(projects_command.execute())
        task.project_name = [p.name for p in projects if p.master_url==task.project_url].pop()

        return tr.TemplateRenderer().render('task.html', task=task, title=task_name)

    @cherrypy.expose
    def projects(self):
        projects_command = self.__command_factory.create('GetProjectStatus')
        projects = projects_command.execute()
        return tr.TemplateRenderer().render('projects.html',projects=projects, title='Boinc Projects')

    @cherrypy.expose
    def project(self, **args):
        projects_command = self.__command_factory.create('GetProjectStatus')
        project = [t for t in projects_command.execute() if t.name==args.get('project', '')].pop()
        return tr.TemplateRenderer().render('project.html', project=project, title=project.name)

    @cherrypy.expose
    def do_network_communication(self):
        command = self.__command_factory.create('DoNetworkCommunication')
        command.execute()
        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def disk_usage(self):
        disk_usage_command = self.__command_factory.create('DiskUsage')
        du = disk_usage_command.execute()
        return tr.TemplateRenderer().render('diskusage.html', title='Disk Usage', disk_usage=du)

    @cherrypy.expose
    def messages(self):
        get_messages_command = self.__command_factory.create('GetMessages')
        messages = get_messages_command.execute()
        return tr.TemplateRenderer().render('messages.html', messages=reversed(list(messages)), title="Messages")

    @cherrypy.expose
    def host_info(self):
        host_info_command = self.__command_factory.create('HostInfo')
        hi = host_info_command.execute()
        return tr.TemplateRenderer().render('hostinfo.html', title='Host Info', host_info=hi)

    @cherrypy.expose
    def daily_transfer_history(self):
        daily_transfer_history_command = self.__command_factory.create('DailyTransferHistory')
        dts = daily_transfer_history_command.execute()
        return tr.TemplateRenderer().render('dailytransferhistory.html', title='Daily Transfer History', transfers=dts)

    @cherrypy.expose
    def suspend_resume(self, task_name, return_url):
        raise cherrypy.HTTPRedirect(return_url)

    @cherrypy.expose
    def abort_task(self, task_name):
        abort_task_command = self.__command_factory.create('AbortTask')
        abort_task_command.execute(task_name)
        raise cherrypy.HTTPRedirect('/')

if __name__=='__main__':
    ws = WebServer()
    ws.start()
