from subprocess import Popen, PIPE

import Message as m

class GetMessages(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --get_messages'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()

        messages = [m for m in out.decode("utf-8").split('\n') if m.strip() != '']

        return map(lambda x: m.Message(x), messages)
