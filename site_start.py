from subprocess import Popen, PIPE

import cherrypy
from jinja2 import Environment, PackageLoader

import boinc.GetTasks as get_tasks
import Task as boinc_task

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
        return TemplateRenderer().render('index.html', tasks=boinc_tasks)        

class TemplateRenderer(object):

    def render(self, template, **args):
        template = self.__get_template(template)
        return template.render(args)

    def __get_template(self, template):
        env = Environment(loader=PackageLoader("templates", "."))
        return env.get_template(template)

if __name__=='__main__':
    ws = WebServer()
    ws.start()
