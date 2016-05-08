# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import datetime as dtime

import boincsite.util.DateTimeUtil as dt
import lib.boincindicator.client as client


class GetStatistics(object):

    def execute(self, project_url):
        stats = client.BoincClient().get_statistics()
        return [self.__get_stats(s) for s in stats.project_statistics if self.__filter(project_url, s)]

    def __get_stats(self, stats):

        def process_stat(stat):
            stat.day = dt.get_date_from_epoch_seconds(int(float(stat.day)))
            return stat
        
        # We just want the stats. Not the master_url field.
        just_stats = [s for s in stats if hasattr(s, 'day')]
        return list(map(lambda x: process_stat(x), just_stats))

    def __filter(self, project_url, project_statistics):

        for stat in project_statistics:
            if hasattr(stat, 'url'):
                if stat.url == project_url:
                    return True
        return False
        
    
