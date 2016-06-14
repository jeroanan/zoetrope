# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import logging
import sqlite3

import bcrypt

import lib.boincindicator.resulttypes.SuccessError as se

import boincsite.status.User as u

import config


class UserTasks(object):
    """
    Handles tasks that perform user-related operations
    """

    def add_user(self, user_id, password):

        ret_val = se.SuccessError()

        conn, c = self.get_connection()

        sql = "SELECT UserId FROM User WHERE userId=?"
        results = c.execute(sql, (user_id,))

        if not any(results.fetchall()):
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            sql = 'INSERT INTO User VALUES (?, ?)'
            c.execute(sql, (user_id, hashed_password))
        else:
            ret_val.success = False
            ret_val.error_message = 'User {user_id} already exists'.format(user_id=user_id)

        conn.commit()
        c.close()

        return ret_val

    def get_users(self):
        conn, cursor = self.get_connection()

        sql = "SELECT RowId, UserId FROM User"
        results = cursor.execute(sql).fetchall()

        users = []
        
        for r in results:
            user = u.User()
            user.user_no, user.user_id = r
            users.append(user)

        cursor.close()
        return users

    def get_connection(self):
        conn = sqlite3.connect(config.database_file)
        cursor = conn.cursor()
        return (conn, cursor)
