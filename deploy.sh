#!/bin/bash

if [ $# -ne 2 ]; then
	echo Usage: $0 "<user>" "<hostname>"
	exit 1
fi


rsync -a --exclude="deploy.sh" --exclude=".git" --exclude="env" --exclude="__pycache__/" --exclude="db.sqlite3" \
  --exclude=".gitignore" -v -e ssh . $1@$2:~/src/boincsite
