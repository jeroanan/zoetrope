class Task(object):

    def __init__(self, task_string):
        self.__name = ""

        task_strings = task_string.split('\n')

        for ts in task_strings:
            line_split = ts.split(':')
            self.__set_name(line_split)

    def __set_name(self, line_split):
        if len(line_split)<2:
            return
        if line_split[0].strip().startswith('name'):
            self.name = str.join(' ', line_split[1:])
        else:
            print(line_split[0])


    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, val):
        self.__name = val
