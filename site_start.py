import os
from subprocess import Popen, PIPE

import cherrypy

import boinc.GetTasks as get_tasks
import boinc.GetProjectStatus as get_project_status
import boinc.DoNetworkCommunication as do_comms
import boinc.GetMessages as get_messages
import boinc.DiskUsage as disk_usage
import boinc.HostInfo as host_info
import boinc.DailyTransferHistory as dth

import Task as boinc_task
import templates.TemplateRenderer as tr

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))

class WebServer(object):

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer(), '/', 'server.conf')

    @cherrypy.expose
    def index(self):
        boinc_tasks = list(get_tasks.GetTasks().execute())
        projects = list(get_project_status.GetProjectStatus().execute())

        for t in boinc_tasks:
            pns = [p.name for p in projects if p.master_url==t.project_url]
            t.project_name = pns.pop()

        return tr.TemplateRenderer().render('index.html', tasks=boinc_tasks, title='Boinc Tasks')

    @cherrypy.expose
    def task(self, task_name):
        boinc_tasks = list(get_tasks.GetTasks().execute())
        projects = list(get_project_status.GetProjectStatus().execute())

        task = [t for t in boinc_tasks if t.name==task_name].pop()
        task.project_name = [p.name for p in projects if p.master_url==task.project_url].pop()

        return tr.TemplateRenderer().render('task.html', task=task, title=task_name)

    @cherrypy.expose
    def projects(self):
        task = get_project_status.GetProjectStatus()
        projects = task.execute()
        return tr.TemplateRenderer().render('projects.html',projects=projects, title='Boinc Projects')

    @cherrypy.expose
    def project(self, **args):
        project = [t for t in get_project_status.GetProjectStatus().execute() if t.name==args.get('project', '')].pop()
        return tr.TemplateRenderer().render('project.html', project=project, title=project.name)

    @cherrypy.expose
    def do_network_communication(self):
        command = do_comms.DoNetworkCommunication()
        command.execute()
        raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def disk_usage(self):
        du = disk_usage.DiskUsage().execute()
        return tr.TemplateRenderer().render('diskusage.html', title='Disk Usage', disk_usage=du)

    @cherrypy.expose
    def messages(self):
        messages = get_messages.GetMessages().execute()
        return tr.TemplateRenderer().render('messages.html', messages=reversed(list(messages)), title="Messages")

    @cherrypy.expose
    def host_info(self):
        hi = host_info.HostInfo().execute()
        return tr.TemplateRenderer().render('hostinfo.html', title='Host Info', host_info=hi)

    @cherrypy.expose
    def daily_transfer_history(self):
        dts = dth.DailyTransferHistory().execute()
        return tr.TemplateRenderer().render('dailytransferhistory.html', title='Daily Transfer History', transfers=dts)

if __name__=='__main__':
    ws = WebServer()
    ws.start()
