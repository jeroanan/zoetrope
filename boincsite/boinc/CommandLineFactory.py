import boincsite.boinc.commandline.AbortTask as at
import boincsite.boinc.commandline.DailyTransferHistory as dth
import boincsite.boinc.commandline.DiskUsage as du
import boincsite.boinc.commandline.DoNetworkCommunication as dnc
import boincsite.boinc.commandline.GetMessages as gm
import boincsite.boinc.commandline.GetProjectStatus as gps
import boincsite.boinc.commandline.GetTask as gt
import boincsite.boinc.commandline.GetTasks as gts
import boincsite.boinc.commandline.HostInfo as hi


class CommandLineFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'AbortTask': at.AbortTask,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DiskUsage': du.DiskUsage,
            'DoNetworkCommunication': dnc.DoNetworkCommunication,
            'GetMessages': gm.GetMessages,
            'GetProjectStatus': gps.GetProjectStatus,
            'GetTask': gt.GetTask,
            'GetTasks': gts.GetTasks,
            'HostInfo': hi.HostInfo
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
