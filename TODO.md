# TOOD list for Zoetrope

**Fix the "Time So Far" information for tasks**

For the project that I am mostly crunching for while developing this, Enigma@Home, the Time So Far is always empty. However, upon further investigation of what BOINC's XML-RPC functionality provides, the functions that return tonnes of data, e.g. simple\_gui\_info, contains a populated elapsed_time field. For some reason this isn't provided by the get\_results call that is currently made.

**Make tasks' deadline times indicate when deadline is near/exceeded**

When the current time is within a (configurable?) period of a task's deadline, indicate this somehow with colour/warning icon. When the deadline has passed, indicate it with a more severe colour/icon.

The thing that most suggests itself here is when we're within the "warning" period, apply Bootstrap's text-warning class. When the deadline is exceeded then apply text-danger.

**Indicate which projects match the current platform**

When the user navigates to /#/getallprojectlist a list of all available BOINC projects is shown. Clicking on a project name allows the user to see more information about the project including the platforms it supports. To begin with on this page it ought to be possible to indicate whether the platform that the connected BOINC is running on matches one of the supported platforms. I am thinking one/both of the following:

1. Have some text at the top of the page saying "This project supports/does not support this platform"
2. In the list of platforms, apply Bootstrap's text-success class to a matching platform and maybe add an icon alongside.

Once that's done it should also be possible to add this to the main "All Boinc Projects" screen as well as to the screens that show list/details of currently-attached projects.

**Indicate which projects are already attached in the All Boinc Projects list**

And on the details pages that are reached from there.

**Add an "Attach to Project" button on project details pages for projects that are not already attached**

This button can take the user to the "Attach Project" page that can have its url pre-selected.

**Support creation of new accounts when attaching to new projects**

Currently only attaching to an existing account is supported.

**Add a "Detach from Project" button to project details pages for projects already attached**

Similar to the "Attach to Project" button above, this can redirect to the Detach Project screen with the url pre-selected. This button could be added to the details pages reached from listing all available BOINC projects, as well as the details pages reached from the currently-attached projects.

**Add further details to the Host Info page**

1. Current CPU temperature
2. Load averages

**get_statistics looks pretty interesting**

See the sample XML at lib/boincindicator/doc/samplexml/get_statistics.xml. Need to make a page based on this data.

**Add the ability to be able to change global preferences**

