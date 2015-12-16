import boincsite.boinc.BoincCommand as bc

import boincsite.Message as m

class GetMessages(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_messages')

        messages = [m for m in out.decode("utf-8").split('\n') if m.strip() != '']

        return map(lambda x: m.Message(x), messages)
