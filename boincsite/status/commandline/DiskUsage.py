import boincsite.status.DiskUsage as du


class DiskUsage(du.DiskUsage):

    def __init__(self, disk_usage):
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
        super().__init__(disk_usage)

        lines = list(reversed([l.strip() for l in disk_usage.split('\n') if l.strip() != '']))

        lines.pop()

        def next_header_value():
            return lines.pop().split(':')[1].strip()

        self.total_disk_space = next_header_value()
        self.free_disk_space = next_header_value()
        self.project_disk_usages = []

        while len(lines)>=3:
            du_str = '{a}\n{b}\n{c}'.format(a=lines.pop(), b=lines.pop(), c=lines.pop())
            self.project_disk_usages.append(ProjectDiskUsage(du_str))

class ProjectDiskUsage(du.ProjectDiskUsage):
    def __init__(self, project_disk_usage):
        super().__init__(project_disk_usage)
        lines = list(reversed(project_disk_usage.split('\n')))

        lines.pop()

        self.master_url = ':'.join(lines.pop().split(':')[1:]).strip()
        self.disk_usage = lines.pop().split(':')[1].strip()
