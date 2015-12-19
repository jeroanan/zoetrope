import boincsite.status.Message as message


class Message(message.Message):

    def __init__(self, message):
        super().__init__(message)

        space_split = list(reversed(message.split(' ')))
        self.message_number = int(space_split.pop().strip(':'))
        self.date_time = '{date} {time}'.format(date=space_split.pop(), time=space_split.pop())

        def string_between_two_chars(char_one, char_two):
            char_one_onwards = message[message.find(char_one)+1:]
            return char_one_onwards [0:char_one_onwards.find(char_two)]

        self.message_type = string_between_two_chars('(', ')')
        self.project_name = string_between_two_chars('[', ']')

        self.message_text = message[message.find(']')+1:].strip()
