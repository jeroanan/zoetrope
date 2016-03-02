from jinja2 import Environment, PackageLoader

class TemplateRenderer(object):

    def render(self, template, **args):
        template = self.__get_template(template)
        return template.render(args)

    def __get_template(self, template):
        env = Environment(loader=PackageLoader("templates", "."))
        return env.get_template(template)
