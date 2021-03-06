# Copyright (c) David Wilson 2016, 2017
#
# Licensed under the GPL version 3

import os

import logging

gui_rpc_file_location = '/etc/boinc-client/gui_rpc_auth.cfg'
boinc_data_dir = '/var/lib/boinc-client'

cpu_temperature_file = '/sys/class/thermal/thermal_zone0/temp'

log_file_name = 'zoetrope.log'
log_level = logging.DEBUG
log_message_format = '%(asctime)s %(message)s'

WorkingDirectory = os.path.dirname(os.path.abspath(__file__))

database_file = WorkingDirectory + '/zoetrope.db'

authentication_enabled = True

# The following two should be changed. 
default_username = 'user'
default_password = 'password'
