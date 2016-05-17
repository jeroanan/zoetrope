# TOOD list for Zoetrope

**Fix the "Time So Far" information for tasks**

For the project that I am mostly crunching for while developing this, Enigma@Home, the Time So Far is always empty. However, upon further investigation of what BOINC's XML-RPC functionality provides, the functions that return tonnes of data, e.g. simple\_gui\_info, contains a populated elapsed_time field. For some reason this isn't provided by the get\_results call that is currently made.

**Make tasks' deadline times indicate when deadline is near/exceeded**

When the current time is within a (configurable?) period of a task's deadline, indicate this somehow with colour/warning icon. When the deadline has passed, indicate it with a more severe colour/icon.

The thing that most suggests itself here is when we're within the "warning" period, apply Bootstrap's text-warning class. When the deadline is exceeded then apply text-danger.

**Add further details to the Host Info page**

1. Current CPU temperature
2. Load averages

**Add the ability to be able to change global preferences**

**What happens if BOINC isn't running?**

**What happens when various requests throw exceptions?**

**Make the statistics section of the project page into a directive**

**On the task page, add success/error feedback when projects are resumed, suspended or aborted**
