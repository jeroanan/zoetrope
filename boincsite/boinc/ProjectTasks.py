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

import time

import lib.boincindicator.client as client
import lib.boincindicator.resulttypes.SuccessError as se

import boincsite.status.Project as p
import boincsite.util.DateTimeUtil as dt

import config as conf


class ProjectTasks(object):
    """
    Handles tasks that perform project operations
    """

    def __init__(self):
        self.__client = client.BoincClient()

    def get_all_projects_list(self):
        """
        Get a list of all public projects
        """
        return self.__client.get_all_projects_list()
    
    def get_project_status(self):
        """
        Get details of all attached projects.
        
        Returns:
          A list of Project objects
        """
        try:
            result = self.__client.get_project_status()
            return map(lambda r: p.Project(r), result)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            print("Connection Refused. Is boinc running?")
            return []

    def no_more_work_for_project(self, project_url):
        """
        Request that no more work is requested for the given project
        Workunits for the project that are in progress or waiting to be processed
        will be completed even when the project is set to request no more work.
        
        Params:
        project_url: The url of the project to perform the request on
        """
        self.__client.project_no_more_work(project_url)
    
    def allow_more_work_for_project(self, project_url):
        """
        Request that work is requested for the given project
        To be called for projects that are currently set not to request more work.
        
        Params:
          project_url: The url of the project to perform the request on
        """
        self.__client.project_allow_more_work(project_url)
    
    def suspend_project(self, project_url):
        """
        Request that work is suspended for the given project
        Workunits for the project that are currently in progress or waiting to processed will be paused.
        
        Params:
          project_url: The url of the project to perform the request on
        """
        self.__client.project_suspend(project_url)
    
    def resume_project(self, project_url):
        """
        Request that work is resumed for the given project
        Existing workunits for the project will be resumed.

        Params:
          project_url: The url of the project to perform the request on
        """
        self.__client.project_resume(project_url)
    
    def update_project(self, project_url):
        """
        Request that the given project is updated.
        This can entail uploading results and downloading new workunits and project settings.
    
        Params:
          project_url: The url of the project to perform the request on
        """          
        self.do_authorized_task(lambda c: c.project_update(project_url))

    def attach_project(self, project_url, email_address, password_hash):
        """
        Request to attach to a project

	Params:
	  projectUrl: The url of the proejct to attach to
	  email: The email address to use to sign into the project account
	  password: The MD5-hash of password + email address
        """
        lookup_function = lambda c: c.lookup_account(project_url, email_address, password_hash, already_hashed=True)
        poll_function = lambda c: c.lookup_account_poll()
        return self.attach_new_or_existing_account(project_url, lookup_function, poll_function)

    def detach_project(self, project_url):
        """
        Request to detach from a project
	
        Detaching causes any queued or in-progress workunits for that project to be aborted.

	Params:
	  projectUrl: The url of the project to detach from
        """
        return self.do_authorized_task(lambda c: c.project_detach(project_url))

    def create_account_and_attach_to_project(self, project_url, email_address, password_hash, username):
        """
        Request to create an account with a project. Once the account is successfully created, the project
        is attached to.
        
        Params:

          project_url: The url of the proejct to attach to
	  email: The email address to use to sign into the project account
	  password: The MD5-hash of password + email address
	  username: If signing up for a new account, the username of the acount
        """
        lookup_function = lambda c: c.create_account(project_url, email_address, password_hash, username)
        poll_function = lambda c: c.create_account_poll()
        return self.attach_new_or_existing_account(project_url, lookup_function, poll_function)

    def attach_new_or_existing_account(self, project_url, lookup_or_create_function, poll_function):
        """
        Attach to a project with existing or new credentials

        Run a function to lookup or create an account. Once that's done then attach to
        it using the received authenticator string.

        Params:

          project_url: The url of the project to attach to

          lookup_or_create_account: A function that takes an authenticated BoincClient instance
                                    that is used to lookup an existing account or create a new one.

          poll_function: When a request is sent to lookup or create an account, the corresponding
                         message is sent to the project's servers. This function polls the BOINC 
                         client to check for a response. poll_function is run every two seconds
                         until a response is received, whether that is success or failure.
        
        returns:
          An instance of SuccessError. Its success field is true for a successful attach.
          Otherwise it will be false and the error_message field will contain details of
          what went wrong.
        """
        def work_function(c):
            lookup_or_create_function(c)

            lookup_result = poll_function(c)
            success_error = se.SuccessError()

            try:
                still_waiting = '-204'

                while lookup_result.error_num == still_waiting:

                    lookup_result = poll_function(c)
                    time.sleep(2)
                
                    if lookup_result.authenticator != '':
                        print('Attaching. project_url: ' + project_url + ' Authenticator: ' + lookup_result.authenticator)
                        attach_result = c.project_attach(project_url, lookup_result.authenticator)
                    elif lookup_result.error_msg != '':
                        success_error.success = False
                        success_error.error_message = lookup_result.error_msg

            except AttributeError as e:
                success_error.success = False
                success_error.error_message = str(e)
            finally:
                return success_error

        return self.do_authorized_task(lambda c: work_function(c))

    def do_authorized_task(self, work_function):
        """
        Generic function to perform a BOINC task with an authorized client

        Params:
          work_function: What should be done once authorization has taken place.

        Returns:
          Whatever is returned by work_function
        """
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)
            return work_function(c)

    def get_project_statistics(self, project_url):
        """
        Get daily statistics for the given project.

	Params:
	  project_url: The url of the project to get statistics for.
        """
        def do_filter(project_url, project_statistics):

            for stat in project_statistics:
                if hasattr(stat, 'url'):
                    if stat.url == project_url:
                        return True
            return False

        def get_stats(stats):

            def process_stat(stat):
                stat.day = dt.get_date_from_epoch_seconds(int(float(stat.day)))
                return stat
        
            # We just want the stats. Not the master_url field.
            just_stats = [s for s in stats if hasattr(s, 'day')]
            return list(map(lambda x: process_stat(x), just_stats))

        stats = self.__client.get_statistics()
        return [get_stats(s) for s in stats.project_statistics if do_filter(project_url, s)]
