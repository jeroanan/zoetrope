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

import lib.boincindicator.resulttypes.SuccessError as se

import config as conf
import boincsite.dbinit as dbinit
import boincsite.boinc.ProjectTasks as pt
import boincsite.boinc.TaskTasks as tt
import boincsite.boinc.SystemInfoTasks as sit
import boincsite.boinc.UserTasks as ut

import boincsite.status.DiskUsage as duj
import boincsite.status.GlobalPreferences as ggp

import boincsite.util.JSONAttrEncoder as jsae

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))


class WebServer(object):

    def __init__(self):
        logging.basicConfig(filename=conf.log_file_name, level=conf.log_level, format=conf.log_message_format)

        dbinit.init_db()

        self.__project_tasks = pt.ProjectTasks()
        self.__task_tasks = tt.TaskTasks()
        self.__system_info_tasks = sit.SystemInfoTasks()
        self.__user_tasks = ut.UserTasks()
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
        def f():
            task_name = kwargs.get('task_name', '')
            return self.__task_tasks.get_task(task_name)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def projects_json(self, **kwargs):
        return self.do_authenticated_request(self.__get_projects)

    @cherrypy.expose
    def get_statistics_json(self, **kwargs):
        f  = lambda: self.project_operation(kwargs, self.__project_tasks.get_project_statistics)
        return self.do_authenticated_request(f)

    @cherrypy.expose
    def project_json(self, **kwargs):        
        f = lambda: [t for t in self.__get_projects() if t.project_name==kwargs.get('project', '')].pop()
        return self.do_authenticated_request(f, False)

    def __get_projects(self):
        return list(self.__project_tasks.get_project_status())

    @cherrypy.expose
    def messages_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_messages)

    @cherrypy.expose
    def tasks_json(self, **kwargs):
        return self.do_authenticated_request(self.__task_tasks.get_tasks)

    @cherrypy.expose
    def disk_usage_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_disk_usage, False, duj.JSONEncoder)

    @cherrypy.expose
    def host_info_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_host_info, False)        

    @cherrypy.expose
    def daily_transfer_history_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_daily_transfer_history)

    @cherrypy.expose
    def notices_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_notices)
    
    @cherrypy.expose
    def get_global_preferences_json(self, **kwargs):
        return self.do_authenticated_request(self.__system_info_tasks.get_global_preferences, False)

    @cherrypy.expose
    def get_all_projects_list_json(self, **kwargs):
        return self.do_authenticated_request(self.__project_tasks.get_all_projects_list)

    @cherrypy.expose
    def detach_project(self, **kwargs):
        f  = lambda: self.project_operation(kwargs, self.__project_tasks.detach_project)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def detach_project_when_done(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.detach_project_when_done)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def dont_detach_project_when_done(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.dont_detach_project_when_done)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def suspend_task(self, **kwargs):
        f = lambda: self.task_name_operation(kwargs, self.__task_tasks.suspend_task)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def resume_task(self, **kwargs):
        f = lambda: self.task_name_operation(kwargs, self.__task_tasks.resume_task)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def abort_task(self, **kwargs):
        f = lambda: self.task_name_operation(kwargs, self.__task_tasks.abort_task)
        return self.do_authenticated_request(f, False)

    def task_name_operation(self, kwargs, operation_func):
        task_name = kwargs.get('task_name', '')

        if task_name=='':
            return

        operation_func(task_name)

    @cherrypy.expose
    def attach_project(self, **kwargs):
        def f():
            project_url = kwargs.get('projectUrl', '')
            email_address = kwargs.get('email', '')
            password_hash = kwargs.get('password', '')
            
            return self.__project_tasks.attach_project(project_url, email_address, password_hash)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def create_account(self, **kwargs):
        def f():
            project_url = kwargs.get('projectUrl', '')
            email_address = kwargs.get('email', '')
            password_hash = kwargs.get('password', '')
            username = kwargs.get('username', '')
            
            return self.__project_tasks.create_account_and_attach_to_project(project_url,
                                                                             email_address,
                                                                             password_hash,
                                                                             username)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def get_platform_json(self, **kwargs):
        platform = self.__system_info_tasks.get_platform()
        return '{{"platform": "{platform}"}}'.format(platform=platform)

    @cherrypy.expose
    def no_more_work(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.no_more_work_for_project)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def allow_more_work(self, **kwargs):
        f = self.project_operation(kwargs, self.__project_tasks.allow_more_work_for_project)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def suspend_project(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.suspend_project)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def resume_project(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.resume_project)
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def update_project(self, **kwargs):
        f = lambda: self.project_operation(kwargs, self.__project_tasks.update_project)
        return self.do_authenticated_request(f, False)

    def project_operation(self, kwargs, operation_function):
        project_url = kwargs.get('projectUrl', '')
        return operation_function(project_url)

    @cherrypy.expose
    def add_user_json(self, **kwargs):
        def f():
            user_id = kwargs.get('userId', '')
            password = kwargs.get('password', '')
            result = self.__user_tasks.add_user(user_id, password)
            return result
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def get_users_json(self, **kwargs):
        return self.do_authenticated_request(self.__user_tasks.get_users)

    """
    Run a function if the user is authenticated, or if authentication is turned off

    Parameters:
    func: The function to potentially run
    as_list: Whether the result of func should be returned in a list
    json_encoder: The JSON encoder to run on the result of func. By default this is a generic JSON encoder.

    Returns:
    The JSON-encoded result of running func if it is run. If not then an instance of SuccessError that indicates that 
    authentication failed. If func runs and returns None, then None is returned.
    """
    def do_authenticated_request(self, func, as_list=True, json_encoder=jsae.JSONEncoder):
        authentication_result = self.authenticate(as_list)
        
        if authentication_result is not None and conf.authentication_enabled:
             return json.dumps(authentication_result, self.__io, cls=jsae.JSONEncoder)

        result = list(func()) if as_list else func()

        if result is not None:
            return json.dumps(result, self.__io, cls=json_encoder)

    @cherrypy.expose
    def delete_user_json(self, **kwargs):
        def f():
            user_no = kwargs.get('userNo', '')
            user_id = kwargs.get('userId', '')
            row_no = kwargs.get('rowNo', '')        
            result = self.__user_tasks.delete_user(user_no)

            # We add user_id and row_no back in here because I don't want such front-end concerns in UserTasks.
            result.error_message += '|{user_id}|{row_no}'.format(user_id=user_id, row_no=row_no)
            return result
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def change_password_json(self, **kwargs):
        def f():
            user_no = kwargs.get('userNo', '')
            user_id = kwargs.get('userId', '')
            password = kwargs.get('password', '')
            confirm_password = kwargs.get('confirmPassword', '')
            result = self.__user_tasks.change_password(user_no, password, confirm_password)
            # We add user_id back in here because I don't want such front-end concerns in UserTasks.
            result.error_message += '|{user_id}'.format(user_id=user_id)
            return result
        return self.do_authenticated_request(f, False)

    @cherrypy.expose
    def login_json(self, **kwargs):
        username = kwargs.get('username', '')
        password = kwargs.get('password', '')

        result = self.__user_tasks.login(username, password)

        if result.success==True:
            cherrypy.session['LoggedIn'] = 1
            
        return json.dumps(result, self.__io, cls=jsae.JSONEncoder)

    @cherrypy.expose
    def logout(self, **kwargs):
        cherrypy.session['LoggedIn'] = None
        raise cherrypy.HTTPRedirect('/')
        
    @cherrypy.expose
    def experimental_task(self, **kwargs):
        pass

    """
    Check if the user is authenticated

    The check is performed by checking the session for a 'LoggedIn' entry.

    Parameters:
    as_list: Whether or not the return value should be contained in a list

    Returns:
    If the user is not authenticated then an instance of SuccessError is returned to indicate that the user is not 
    logged in. If the user is authenticated then None is returned.
    """
    def authenticate(self, as_list):
        ret_val = se.SuccessError()
        
        if cherrypy.session.get('LoggedIn', 0) != 1:
            ret_val.success = False
            ret_val.error_message = -1414
            ret_val = [ret_val] if as_list else ret_val
            return ret_val
    
if __name__=='__main__':
    cwd = os.getcwd()
    from cherrypy.process.plugins import Daemonizer
    d = Daemonizer(cherrypy.engine)
    d.subscribe()

    ws = WebServer()
    ws.start(cwd)

