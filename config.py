# Copyright (c) David Wilson 2016, 2017, 2021
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

authentication_enabled = False

# Should we daemonize cherrpy on start?
# When running in Docker we shouldn't; if you're just running
# in the console then maybe you'd want to.
daemonize = False

# If you're running boinc on the same server as this site then
# leave rpc_hostname as blank, otherwise set to the hostname:port 
# that boinc runs on.
rpc_hostname = "192.168.0.88"


# if boinc is running on the same server as this site then
# you should able to set the rpc_password to None (no quotes).
rpc_password = "123"

# The following two should be changed. 
default_username = 'user'
default_password = 'password'
