# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import boincsite.util.DateTimeUtil as dt


class Notice(object):

    def __init__(self, notice):

        self.fields = ['title', 'description', 'create_time', 'arrival_time', 'is_private', 'project_name', 'category', 'link', 'seqno']
        self.title=notice.title
        self.description=notice.description
        self.create_time=dt.get_date_from_epoch_seconds(round(float(notice.create_time)))
        self.arrival_time=dt.get_date_from_epoch_seconds(round(float(notice.arrival_time)))
        self.is_private=notice.is_private
        self.project_name=notice.project_name
        self.category=notice.category
        self.link=notice.link
        self.seqno=int(notice.seqno)

    def __str__(self):
        return """Title: {title}
Description: {description}
Create Time: {create_time}
Arrival Time: {arrival_time}
Is Private: {is_private}
Project Name: {project_name}
Category: {category}
Link: {link}
Sequence No: {seqno}
""".format(title=self.title,
           description=self.description,
           create_time=self.create_time,
           arrival_time=self.arrival_time,
           is_private=self.is_private,
           project_name=self.project_name,
           category=self.category,
           link=self.link,
           seqno=self.seqno)
