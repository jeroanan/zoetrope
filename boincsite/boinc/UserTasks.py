# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import logging
import sqlite3

import bcrypt

import config


class UserTasks(object):
    """
    Handles tasks that perform user-related operations
    """

    def add_user(self, user_id, password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        conn = sqlite3.connect(config.database_file)
        logging.debug(config.database_file)

        c = conn.cursor()

        sql = 'INSERT INTO User VALUES (?, ?)'
        c.execute(sql, (user_id, hashed_password))

        conn.commit()
        c.close()
