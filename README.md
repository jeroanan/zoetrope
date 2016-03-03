# Zoetrope
Zoetrope provides a web front-end to boinc. It provides a few different views:

* Summary of current, recently completed and upcoming tasks
* Detailed view of a task
* Subscribed projects
* Recent messages from the Boinc process
* Disk usage, including a project breakdown
* General host information
* Daily transfer history going back as far as the Boinc process has got data for.

## Requirements:

* Python3.4
 * cherrypy
 * jinja2 (for now)
 * uptime
 * nosetests (for running the unit tests)

* Boinc (I am currently developing against 7.0.27 arm-unknown-linux-gnueabihf, which runs on my Raspberry Pi 2.)


## Why?
I run Boinc on a Raspberry Pi 2. I wrote Zoetrope so I could have a nice modern, clean interface to view how it is getting on without having to use the app/boinc client.
