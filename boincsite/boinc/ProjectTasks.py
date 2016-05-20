# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import time


import lib.boincindicator.client as client
import lib.boincindicator.resulttypes.SuccessError as se

import boincsite.status.Project as p
import boincsite.util.DateTimeUtil as dt

import config as conf


class ProjectTasks(object):

    def __init__(self):
        self.__client = client.BoincClient()

    def get_all_projects_list(self):
        return self.__client.get_all_projects_list()

    def get_project_status(self):
        try:
            result = self.__client.get_project_status()
            return map(lambda r: p.Project(r), result)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            print("Connection Refused. Is boinc running?")
            return []

    def no_more_work_for_project(self, project_url):
        self.__client.project_no_more_work(project_url)

    def allow_more_work_for_project(self, project_url):
        self.__client.project_allow_more_work(project_url)

    def suspend_project(self, project_url):
        self.__client.project_suspend(project_url)

    def resume_project(self, project_url):
        self.__client.project_resume(project_url)

    def update_project(self, project_url):
        self.do_authorized_task(lambda c: c.project_update(project_url))

    def attach_project(self, project_url, email_address, password_hash):
        """
        Attach to a project with existing credentials (i.e. you already signed up for it)

        Do a lookup on the account to make sure that it exists. If it does then attach to it
        using the credentials supplied.

        params:
          project_url: The url of the project to attach to

          email_address: The email address to act as username

          password_hash: The MD5 hash of email_address+password
        
        returns:
          An instance of SuccessError. Its success field is true for a successful attach.
          Otherwise it will be false and the error_message field will contain details of
          what went wrong.
        """
        lookup_function = lambda c: c.lookup_account(project_url, email_address, password_hash, already_hashed=True)
        poll_function = lambda c: c.lookup_account_poll()
        return self.attach_new_or_existing_account(project_url, lookup_function, poll_function)

    def detach_project(self, project_url):
        return self.do_authorized_task(lambda c: c.project_detach(project_url))

    def create_account_and_attach_to_project(self, project_url, email_address, password_hash, username):
        lookup_function = lambda c: c.create_account(project_url, email_address, password_hash, username)
        poll_function = lambda c: c.create_account_poll()
        return self.attach_new_or_existing_account(project_url, lookup_function, poll_function)

    def attach_new_or_existing_account(self, project_url, lookup_or_create_function, poll_function):

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
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)
            return work_function(c)

    def get_project_statistics(self, project_url):

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

        

        

        
