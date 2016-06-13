# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import bcrypt

import logging


class UserTasks(object):
    """
    Handles tasks that perform user-related operations
    """

    def add_user(self, user_id, password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        logging.debug('Enter add_user')
        logging.debug('user_id: ' + user_id)
        logging.debug('password: ' + password)
        logging.debug('hashed password: ' + hashed_password.decode())
