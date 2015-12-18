import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.status.commandline.DailyTransfer as dt


class DailyTransferHistory(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_daily_xfer_history')

        lines = [l for l in out.decode('UTF-8').split('\n') if l.strip()!='']

        return map(lambda x: dt.DailyTransfer(x), lines)
