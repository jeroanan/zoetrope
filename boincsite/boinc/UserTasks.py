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

        if user_id.find('|') > -1:
            ret_val.success = False
            ret_val.error_message = 'User names cannot contain the pipe (|) character'
            return ret_val

        conn, c = self.get_connection()

        sql = 'SELECT UserId FROM User WHERE userId=?'
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

        sql = 'SELECT RowId, UserId FROM User'
        results = cursor.execute(sql).fetchall()

        users = []
        
        for r in results:
            user = u.User()
            user.user_no, user.user_id = r
            users.append(user)

        cursor.close()
        return users

    def delete_user(self, user_id):
        ret_val = se.SuccessError()
        
        conn, cursor = self.get_connection()

        sql = 'DELETE FROM User WHERE RowId=?'
        cursor.execute(sql, (user_id,))

        ret_val.success = True
        ret_val.error_message = user_id

        conn.commit()
        cursor.close()

        return ret_val

    def change_password(self, user_no, password, confirm_password):
        ret_val = se.SuccessError()

        if password == '' or confirm_password == '':
            ret_val.success = False
            ret_val.error_message = 'Please supply a password and confirmation'
            return ret_val

        if password != confirm_password:
            ret_val.success = False
            ret_val.error_message = 'Password and confirmation must match.'
            return ret_val

        conn, cursor = self.get_connection()
        sql = 'UPDATE User SET password = ? WHERE userId=?'

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute(sql, (hashed_password, user_no))

        ret_val.success = True
        ret_val.error_message = user_no

        conn.commit()
        cursor.close()

        return ret_val

    def get_connection(self):
        conn = sqlite3.connect(config.database_file)
        cursor = conn.cursor()
        return (conn, cursor)
