# Copyright (c) David Wilson 2016, 2017
#
# Licensed under the GPL version 3

import logging
import sqlite3

import config

import boincsite.boinc.UserTasks as ut


def get_connection():
    conn = sqlite3.connect(config.database_file)
    c = conn.cursor()
    return (conn, c)

def init_db():
    logging.info('Initialising database')

    logging.info('Using database file ' + config.database_file)

    conn, c = get_connection()

    tables = { 
                'User': 'CREATE TABLE User (userID text, password text)' 
             }

    for t in tables:
        if not table_exists(t):
            logging.debug('Table {} does not exist. Creating.'.format(t))  
            c.execute(tables[t])
        
    conn.commit()
    c.close()

    if config.authentication_enabled:
        create_default_user()

def table_exists(table_name):
    logging.info('Checking for existence of table: {}'.format(table_name))

    sql = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=?'
    conn = sqlite3.connect(config.database_file)
    cursor = conn.cursor()
    results = conn.execute(sql, (table_name,))

    exists = any(results.fetchall())

    cursor.close()

    return exists

def create_default_user():
    t = ut.UserTasks()

    if t.user_exists(config.default_username): return

    t.add_user(config.default_username, config.default_password)
    logging.info('Created default user {} with password {}. CHANGE OR DELETE ASAP!!!'
            .format(config.default_username, config.default_password))
