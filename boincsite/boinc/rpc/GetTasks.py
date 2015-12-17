import lib.boincindicator.client as client

class GetTasks(object):

    def execute(self):
        c = client.BoincClient()
        return c.get_results(True)
