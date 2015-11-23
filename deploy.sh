#!/bin/bash

rsync -a --exclude="deploy.sh" --exclude=".git" --exclude="env" --exclude="__pycache__/" --exclude="db.sqlite3" \
  --exclude=".gitignore" -v -e ssh . pi@192.168.1.154:~/src/boincsite
