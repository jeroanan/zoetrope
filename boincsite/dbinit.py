# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import logging
import sqlite3

import config

def init_db():
    logging.info('Initialising database')

    logging.info('Using database file ' + config.database_file)
    conn = sqlite3.connect(config.database_file)

    logging.info('Checking for existence of users table')
    sql = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'User\''

    c = conn.cursor()
    results = c.execute(sql)

    if not any(results.fetchall()):
        logging.debug('User table does not exist. Creating')

        sql = "CREATE TABLE User (userID text, password text)"
        c.execute(sql)
        
    conn.commit()
    c.close()
