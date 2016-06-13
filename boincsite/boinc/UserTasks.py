# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import logging
import sqlite3

import bcrypt

import lib.boincindicator.resulttypes.SuccessError as se

import config


class UserTasks(object):
    """
    Handles tasks that perform user-related operations
    """

    def add_user(self, user_id, password):

        ret_val = se.SuccessError()

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        conn = sqlite3.connect(config.database_file)
        logging.debug(config.database_file)

        c = conn.cursor()

        sql = "SELECT UserId FROM User WHERE userId=?"
        results = c.execute(sql, (user_id,))

        if not any(results.fetchall()):
            sql = 'INSERT INTO User VALUES (?, ?)'
            c.execute(sql, (user_id, hashed_password))
        else:
            logging.debug('User {user_id} already exists!'.format(user_id=user_id))
            ret_val.success = False
            ret_val.error_message = 'User {user_id} already exists'.format(user_id=user_id)

        conn.commit()
        c.close()

        return ret_val

