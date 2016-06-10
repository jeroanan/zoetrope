# Zoetrope
Zoetrope provides a web front-end to BOINC. It provides a few different views:

* Summary of current, recently completed and upcoming tasks
* Detailed view of a task
* Subscribed projects
* Recent messages from the BOINC process
* Disk usage, including a project breakdown
* General host information
* Daily transfer history going back as far as the BOINC process has got data for.
* A summary of global preferences
* A list of publicly available BOINC projects
* Browse all public BOINC projects and attach to them

Additionally, Zoetrope offers functionality to interact with BOINC, including:

* Suspend or resume tasks and projects
* Abort tasks
* Attach and detach from projects


The web application provided by Zoetrope makes heavy use of Bootstrap and AngularJS. Presently it allows the user to view the status of an interact with BOINC _without any kind of authentication_. This is by design -- my personal wish was to interact with BOINC running on computers on my home network. Some kind of authentication may come later but right now don't run it exposed on the public Internet unless you want some sort of crazy situation where any visitor who happens by can controll your BOINC computing.

Calls to the running BOINC process are made using XML-RPC. In order to do that I am making use of parts of the boinc-indicator project <https://github.com/MestreLion/boinc-indicator>, which I have shamelessly sliced and diced and added to for the needs of this project. It seems that Ubuntu is needed to build and run it correctly. Since I run Debian I haven't been able to run it directly, but if you do run Ubuntu or a derivative then you should definitely check it out. Many thanks to MestreLion for providing a solid foundation for the XML-RPC functionality provided here.

## Installation

1. Have Python>=3.4
2. Get BOINC running
3. Clone this repository
4. In the repository folder make a virtualenv for python3.4. I have added "env" to the .gitignore so that's probably a good place.
5. activate the virtualenv (e.g. source env/bin/activate (under GNU/Linux))
6. pip install --upgrade setuptools pip
7. pip install -r requirements.txt
8. Check config.py -- it should contain a fairly universal location for the RPC password file, but you might need to change it.
9. Check the start() method in site_start.py for how the webserver should bind. I will move this into server.conf sometime soon but for now, there it is.
10. python site_start.py

## Development

The JavaScript files that the web application uses are minified using grunt, so:

1. Make sure you've got node and npm installed
2. Now make sure you've got grunt-cli
3. In the repository folder: npm install

The Angular views in Zoetrope are mostly built from M4 templates (boncsite/m4) [More Info on M4](https://en.wikipedia.org/wiki/M4_%28computer_language%29). Changing the html files will also have the desired effect on the website but will be overwritten whenever the M4 templates are rebuilt.

Note that npm and M4 are only needed to make changes to Zoetrope, not to run it.

Currently to-do items are being tracked in todo.org. It's best viewed in emacs' org-mode.
