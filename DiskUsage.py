import util.ByteConversion as bc

class DiskUsage(object):

    def __init__(self, disk_usage_string):
        """
        Expects data in the form of:

        total: 15187017728.000000
        free: 7903444992.000000
        1) -----------
           master URL: http://einstein.phys.uwm.edu/
           disk usage: 9.39MB
        2) -----------
           master URL: http://www.enigmaathome.net/
           disk usage: 1.46MB
        3) -----------
           master URL: http://www.vdwnumbers.org/
           disk usage: 0.00MB
        4) -----------
           master URL: http://setiathome.berkeley.edu/
           disk usage: 0.11MB
        """

        lines = list(reversed([l.strip() for l in disk_usage_string.split('\n') if l.strip() != '']))

        lines.pop()

        def next_header_value():
            return lines.pop().split(':')[1].strip()

        self.__total_disk_space = next_header_value()
        self.__free_disk_space = next_header_value()
        self.__project_disk_usages = []

        while len(lines)>=3:
            du_str = '{a}\n{b}\n{c}'.format(a=lines.pop(), b=lines.pop(), c=lines.pop())
            self.__project_disk_usages.append(ProjectDiskUsage(du_str))

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

    def __init__(self, project_disk_usage_string):
        """
        Expects data in the form of:

        4) -----------
           master URL: http://setiathome.berkeley.edu/
           disk usage: 0.11MB
        """
        lines = list(reversed(project_disk_usage_string.split('\n')))

        lines.pop()

        self.__master_url = ':'.join(lines.pop().split(':')[1:]).strip()
        self.__disk_usage = lines.pop().split(':')[1].strip()


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
