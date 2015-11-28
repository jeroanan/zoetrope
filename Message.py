class Message(object):

    def __init__(self, message_string):
        space_split = list(reversed(message_string.split(' ')))
        self.__message_number = int(space_split.pop().strip(':'))
        self.__date_time = '{date} {time}'.format(date=space_split.pop(), time=space_split.pop())
        self.__message_type = space_split.pop().strip('()')
        self.__project_name = space_split.pop().strip('[]')
        self.__message_text = ' '.join(list(reversed(space_split)))

    @property
    def message_number(self):
        return self.__message_number

    @message_number.setter
    def message_number(self, val):
        self.__message_number = val

    @property
    def date_time(self):
        return self.__date_time

    @date_time.setter
    def date_time(self, val):
        self.__date_time = val

    @property
    def message_type(self):
        return self.__message_type

    @message_type.setter
    def message_type(self, val):
        self.__message_type = val

    @property
    def project_name(self):
        return self.__project_name

    @project_name.setter
    def project_name(self, val):
        self.__project_name = val

    @property
    def message_text(self):
        return self.__message_text

    @message_text.setter
    def message_text(self, val):
        self.__message_text = val
