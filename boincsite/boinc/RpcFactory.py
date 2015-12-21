import boincsite.boinc.rpc.GetTasks as gts
import boincsite.boinc.rpc.AbortTask as at

class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'GetTasks': gts.GetTasks,
            'AbortTask': at.AbortTask
        }

        if command_type in mappings:
            return mappings[command_type]()
