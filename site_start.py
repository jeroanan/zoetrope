import cherrypy
from jinja2 import Environment, PackageLoader

class WebServer(object):

    def start(self):
        cherrypy.quickstart(WebServer())

    @cherrypy.expose
    def index(self):
        return TemplateRenderer().render('index.html')

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
