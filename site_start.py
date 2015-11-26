from subprocess import Popen, PIPE

import cherrypy

import boinc.GetTasks as get_tasks
import boinc.GetProjectStatus as get_project_status

import Task as boinc_task
import templates.TemplateRenderer as tr

class WebServer(object):

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer())

    @cherrypy.expose
    def index(self):
        task = get_tasks.GetTasks()
        boinc_tasks = task.execute()
        return tr.TemplateRenderer().render('index.html', tasks=boinc_tasks)

    @cherrypy.expose
    def projects(self):
        task = get_project_status.GetProjectStatus()
        projects = task.execute()
        return tr.TemplateRenderer().render('projects.html',projects=projects)

if __name__=='__main__':
    ws = WebServer()
    ws.start()
