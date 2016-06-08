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
import logging
import os

import cherrypy

import config as conf
import boincsite.boinc.ProjectTasks as pt
import boincsite.boinc.TaskTasks as tt
import boincsite.boinc.SystemInfoTasks as sit

import boincsite.status.AvailableProject as ap
import boincsite.status.DailyTransfer as dt
import boincsite.status.DiskUsage as duj
import boincsite.status.GlobalPreferences as ggp
import boincsite.status.Notice as notice

import boincsite.util.JSONAttrEncoder as jsae

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))


class WebServer(object):

    def __init__(self):
        logging.basicConfig(filename=conf.log_file_name, level=conf.log_level, format=conf.log_message_format)

        self.__project_tasks = pt.ProjectTasks()
        self.__task_tasks = tt.TaskTasks()
        self.__system_info_tasks = sit.SystemInfoTasks()
        self.__io = StringIO()
        self.__cwd = ''

    def start(self, cwd):
        self.__cwd = cwd
        cherrypy.quickstart(self, '/', 'server.conf')

    @cherrypy.expose
    def index(self, **kwargs):
        with open(self.__cwd + '/boincsite/templates/index.html') as f:
            return f.read()

    @cherrypy.expose
    def task_json(self, **kwargs):
        task_name = kwargs.get('task_name', '')
        task = self.__task_tasks.get_task(task_name)
        return json.dumps(task, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def projects_json(self, **kwargs):
        return json.dumps(self.__get_projects(), self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def get_statistics_json(self, **kwargs):
        statistics = self.project_operation(kwargs, self.__project_tasks.get_project_statistics)
        return json.dumps(statistics, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def project_json(self, **kwargs):
        project = [t for t in self.__get_projects() if t.name==kwargs.get('project', '')].pop()
        return json.dumps(project, self.__io, cls=jsae.JSONEncoder)

    def __get_projects(self):
        return list(self.__project_tasks.get_project_status())

    @cherrypy.expose
    def messages_json(self, **kwargs):
        result = list(self.__system_info_tasks.get_messages())
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def tasks_json(self, **kwargs):
        result = list(self.__task_tasks.get_tasks())
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def disk_usage_json(self, **kwargs):
        result = self.__system_info_tasks.get_disk_usage()
        return json.dumps(result, self.__io, cls=duj.JSONEncoder)

    @cherrypy.expose
    def host_info_json(self, **kwargs):
        result = self.__system_info_tasks.get_host_info()
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def daily_transfer_history_json(self, **kwargs):
        result = list(self.__system_info_tasks.get_daily_transfer_history())
        return json.dumps(result, self.__io, cls=dt.JSONEncoder)

    @cherrypy.expose
    def notices_json(self, **kwargs):
        result = list(self.__system_info_tasks.get_notices())
        return json.dumps(result, self.__io, cls=notice.JSONEncoder)

    @cherrypy.expose
    def get_global_preferences_json(self, **kwargs):
        result = self.__system_info_tasks.get_global_preferences()
        return json.dumps(result, self.__io, cls=ggp.JSONEncoder)

    @cherrypy.expose
    def get_all_projects_list_json(self, **kwargs):
        result = list(self.__project_tasks.get_all_projects_list())
        return json.dumps(result, self.__io, cls=ap.JSONEncoder)

    @cherrypy.expose
    def detach_project(self, **kwargs):
        result = self.project_operation(kwargs, self.__project_tasks.detach_project)
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def detach_project_when_done(self, **kwargs):
        result = self.project_operation(kwargs, self.__project_tasks.detach_project_when_done)

    @cherrypy.expose
    def dont_detach_project_when_done(self, **kwargs):
        result = self.project_operation(kwargs, self.__project_tasks.dont_detach_project_when_done)

    @cherrypy.expose
    def suspend_task(self, **kwargs):
        return self.task_name_operation(kwargs, self.__task_tasks.suspend_task)

    @cherrypy.expose
    def resume_task(self, **kwargs):
        return self.task_name_operation(kwargs, self.__task_tasks.resume_task)

    @cherrypy.expose
    def abort_task(self, **kwargs):
        return self.task_name_operation(kwargs, self.__task_tasks.abort_task)

    def task_name_operation(self, kwargs, operation_func):
        task_name = kwargs.get('task_name', '')

        if task_name=='':
            return

        operation_func(task_name)

    @cherrypy.expose
    def attach_project(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        email_address = kwargs.get('email', '')
        password_hash = kwargs.get('password', '')

        result = self.__project_tasks.attach_project(project_url, email_address, password_hash)
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def create_account(self, **kwargs):
        project_url = kwargs.get('projectUrl', '')
        email_address = kwargs.get('email', '')
        password_hash = kwargs.get('password', '')
        username = kwargs.get('username', '')

        self.__project_tasks.create_account_and_attach_to_project(project_url, email_address, password_hash, username)

    @cherrypy.expose
    def get_platform_json(self, **kwargs):
        platform = self.__system_info_tasks.get_platform()
        return '{{"platform": "{platform}"}}'.format(platform=platform)

    @cherrypy.expose
    def no_more_work(self, **kwargs):
        return self.project_operation(kwargs, self.__project_tasks.no_more_work_for_project)

    @cherrypy.expose
    def allow_more_work(self, **kwargs):
        return self.project_operation(kwargs, self.__project_tasks.allow_more_work_for_project)

    @cherrypy.expose
    def suspend_project(self, **kwargs):
        return self.project_operation(kwargs, self.__project_tasks.suspend_project)

    @cherrypy.expose
    def resume_project(self, **kwargs):
        return self.project_operation(kwargs, self.__project_tasks.resume_project)

    @cherrypy.expose
    def update_project(self, **kwargs):
        return self.project_operation(kwargs, self.__project_tasks.update_project)

    def project_operation(self, kwargs, operation_function):
        project_url = kwargs.get('projectUrl', '')
        return operation_function(project_url)

    @cherrypy.expose
    def experimental_task(self, **kwargs):
        pass
    

if __name__=='__main__':
    cwd = os.getcwd()
    from cherrypy.process.plugins import Daemonizer
    d = Daemonizer(cherrypy.engine)
    d.subscribe()

    ws = WebServer()
    ws.start(cwd) 
