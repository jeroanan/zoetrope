from subprocess import Popen, PIPE

import cherrypy
import boinc.GetTasks as get_tasks
from jinja2 import Environment, PackageLoader

class WebServer(object):

    def start(self):
        cherrypy.config.update({'server.socket_host': '0.0.0.0',
                                'server.socket_port': 8080,
        })
        cherrypy.quickstart(WebServer())

    @cherrypy.expose
    def index(self):
        # boinccmd = Popen(['boinccmd --get_tasks'], shell=True, stdout=PIPE, stderr=PIPE)
        # out, err = boinccmd.communicate()
        # return out.decode("utf-8").split(') -----------')[1].replace('\n', '<br />') #TemplateRenderer().render('index.html')
        task = get_tasks.GetTasks()
        boinc_tasks = task.execute()
        out = ''
        for bt in boinc_tasks:
            out += '<p>{task}<p>'.format(task=bt.replace('\n', '<br />'))
        return out

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
