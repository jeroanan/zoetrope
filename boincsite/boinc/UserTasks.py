# Copyright (c) David Wilson 2016, 2017
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

import logging
import sqlite3

import lib.boincindicator.resulttypes.SuccessError as se

import boincsite.status.User as u

import config

if config.authentication_enabled:
    import bcrypt


class UserTasks(object):
    """
    Handles tasks that perform user-related operations
    """

    def add_user(self, user_id, password):
        """
        Add a new user to Zoetrope.

        The user_id cannot contain the pipe character and must be unique. If either of these conditions are not met then 
        the new user will not be created.

        Params:
        user_id: An login name for the user. 
        password: A plaintext password for the new user. 

        Returns:
        An instance of SuccessError. If the user was saved successfully then its success flag will be set to True.
        Otherwise the success flag will be False and the error_message property will describe why the user was not
        added.
        """
        ret_val = se.SuccessError()

        if user_id.find('|') > -1:
            ret_val.success = False
            ret_val.error_message = 'User names cannot contain the pipe (|) character'
            return ret_val

        if not self.user_exists(user_id):
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            conn, c = self.get_connection()

            sql = 'INSERT INTO User VALUES (?, ?)'
            c.execute(sql, (user_id, hashed_password))

            conn.commit()
            c.close()
        else:
            ret_val.success = False
            ret_val.error_message = 'User {user_id} already exists'.format(user_id=user_id)

        return ret_val

    def user_exists(self, user_id):
        """
        Does a user with the given id exist?

        Returns: True if it does, otherwise False
        """
        conn, c = self.get_connection()
        sql = 'SELECT UserId FROM User WHERE userId=?'
        results = c.execute(sql, (user_id,))

        exists = any(results.fetchall())

        c.close()

        return exists

    def get_users(self):
        """
        Get all users stored in Zoetrope
        
        Returns:
        A list of User objects representing each user.
        """
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

    def delete_user(self, user_no):
        """
        Delete a user from Zoetrope

        Params:
        user_no: The user_no represents the RowId in Sqlite of the user's record.

        Returns:
        An instance of SuccessError. If all goes well this will be true and the error_message field will be set to the 
        user_no.
        """
        ret_val = se.SuccessError()
        
        conn, cursor = self.get_connection()

        sql = 'DELETE FROM User WHERE RowId=?'
        cursor.execute(sql, (user_no,))

        ret_val.success = True
        ret_val.error_message = user_no

        conn.commit()
        cursor.close()

        return ret_val

    def change_password(self, user_no, password, confirm_password):
        """
        Change the password of a user stored in Zoetrope.

        A password and confirmation password must be supplied and be identical. If neither of these conditions are met
        then the password will not be changed.

        Params:
        user_no: The RowId of the Sqlite record of the user to change the password for
        password: The user's new password
        confirm_password: The confirmation of the user's new password

        Returns:
        An instance of SuccessError. If the password was changed successfully then the success flag will be set to True
        and the error_message field will be set to user_no. If the password was not changed successfully then the 
        success flag will be set to False and the error_message field will describe what went wrong.
        """
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

    def login(self, username, password):
        ret_val = se.SuccessError()

        if username=='' or password=='':
            ret_val.success = False
            ret_val.error_message = 'Please supply a username and password'
            return ret_val

        conn, cursor = self.get_connection()

        # define this here to concisely close the db connection
        def close_conn_cursor():
            conn.commit()
            cursor.close()

        sql = 'SELECT userId, password FROM User WHERE userId=?'
        results = cursor.execute(sql, (username,)).fetchall()

        if not any(results):
            ret_val.success = False
            ret_val.error_message = 'Invalid username or password'
            close_conn_cursor()
            return ret_val

        close_conn_cursor()
        
        # The user we want will always be the first one returned.
        db_user = results[0]
        db_username, db_password = db_user

        attempted_hash = bcrypt.hashpw(password.encode('UTF-8'), db_password)

        if attempted_hash==db_password:
            ret_val.success = True
        else:
            ret_val.success = False
            ret_val.error_message = 'Invalid username or password'

        return ret_val

    def get_connection(self):
        conn = sqlite3.connect(config.database_file)
        cursor = conn.cursor()
        return (conn, cursor)
