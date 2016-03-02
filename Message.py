class Message(object):

    def __init__(self, message_string):
        space_split = list(reversed(message_string.split(' ')))
        self.__message_number = int(space_split.pop().strip(':'))
        self.__date_time = '{date} {time}'.format(date=space_split.pop(), time=space_split.pop())

        def string_between_two_chars(char_one, char_two):
            char_one_onwards = message_string[message_string.find(char_one)+1:]
            return char_one_onwards [0:char_one_onwards.find(char_two)]

        self.__message_type = string_between_two_chars('(', ')')
        self.__project_name = string_between_two_chars('[', ']')

        self.__message_text = message_string[message_string.find(']')+1:].strip()

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
