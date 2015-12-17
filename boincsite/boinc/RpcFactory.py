import boincsite.boinc.rpc.GetTasks as gts


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        return gts.GetTasks()
