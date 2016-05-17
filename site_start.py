# Copyright (c) David Wilson 2015, 2016
# This file is part of Zoetrope.
# 
# Zoetrope is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# Zoetrope is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.

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
    def get_statistics_json(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        command = self.__rpc_factory.create('GetStatistics')
        statistics = command.execute(project_url)
        return json.dumps(statistics, self.__io, cls=jsae.JSONEncoder)

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

    @cherrypy.expose
    def detach_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')

        command = self.__rpc_factory.create('DetachProject')
        command_result = command.execute(project_url)
        return json.dumps(command_result, self.__io, cls=jsae.JSONEncoder)

    def __straight_json_dump(self, command_type, result_type, post_process=None):
        command = self.__rpc_factory.create(command_type)
        result = command.execute()

        if post_process is not None:
            result = post_process(result)

        return json.dumps(result, self.__io, cls=result_type.JSONEncoder)

    def __render(self, page, **kwargs):
        return self.__renderer.render(page, **kwargs)

    @cherrypy.expose
    def suspend_task(self, **kwargs):
        self.task_name_operation('SuspendTask', kwargs)

    @cherrypy.expose
    def resume_task(self, **kwargs):
        self.task_name_operation('ResumeTask', kwargs)

    @cherrypy.expose
    def abort_task(self, **kwargs):
        self.task_name_operation('AbortTask', kwargs)

    def task_name_operation(self, operation, kwargs):
        task_name = kwargs.get('task_name', '')

        if task_name=='':
            return

        command = self.__rpc_factory.create(operation)
        command.execute(task_name)

    @cherrypy.expose
    def attach_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        email_address = kwargs.get('email', '')
        password_hash = kwargs.get('password', '')

        command = self.__rpc_factory.create('AttachProject')
        result = command.execute(project_url, email_address, password_hash)
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def create_account(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        email_address = kwargs.get('email', '')
        password_hash = kwargs.get('password', '')
        username = kwargs.get('username', '')
        
        command = self.__rpc_factory.create('CreateAccount')
        command.execute(project_url, email_address, password_hash, username)

    @cherrypy.expose
    def update_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        
        command = self.__rpc_factory.create('UpdateProject')
        command.execute(project_url)

    @cherrypy.expose
    def get_platform_json(self, **kwargs):
        command = self.__rpc_factory.create('GetPlatform')
        platform = command.execute()
        return '{{"platform": "{platform}"}}'.format(platform=platform)

    @cherrypy.expose
    def no_more_work(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        command = self.__rpc_factory.create('NoMoreWork')
        command.execute(project_url)

    @cherrypy.expose
    def allow_more_work(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        command = self.__rpc_factory.create('AllowMoreWork')
        command.execute(project_url)

    @cherrypy.expose
    def suspend_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        command = self.__rpc_factory.create('SuspendProject')
        command.execute(project_url)

    @cherrypy.expose
    def resume_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        command = self.__rpc_factory.create('ResumeProject')
        command.execute(project_url)

    @cherrypy.expose
    def experimental_task(self, **kwargs):
        command = self.__rpc_factory.create('ExperimentalTask')
        command.execute()
    

if __name__=='__main__':
    ws = WebServer()
    ws.start()
