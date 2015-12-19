import boincsite.util.ByteConversion as bc

class DiskUsage(object):

    def __init__(self, disk_usage):
        self.__total_disk_space = ''
        self.__free_disk_space = ''
        self.__project_disk_usages = []

    @property
    def total_disk_space(self):
        return bc.bytes_to_gigabytes(self.__total_disk_space)

    @total_disk_space.setter
    def total_disk_space(self, val):
        self.__total_disk_space = val

    @property
    def free_disk_space(self):
        return bc.bytes_to_gigabytes(self.__free_disk_space)

    @free_disk_space.setter
    def free_disk_space(self, val):
        self.__free_disk_space = val

    @property
    def project_disk_usages(self):
        return self.__project_disk_usages

    @project_disk_usages.setter
    def project_disk_usages(self, val):
        self.__project_disk_usages = val

class ProjectDiskUsage(object):

    def __init__(self, project_disk_usage):
        """
        Expects data in the form of:

        4) -----------
           master URL: http://setiathome.berkeley.edu/
           disk usage: 0.11MB
        """
        self.master_url = ''
        self.disk_usage = ''

    @property
    def master_url(self):
        return self.__master_url

    @master_url.setter
    def master_url(self, val):
        self.__master_url = val

    @property
    def disk_usage(self):
        return self.__disk_usage

    @disk_usage.setter
    def disk_usage(self, val):
        self.__disk_usage = val
