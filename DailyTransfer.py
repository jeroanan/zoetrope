import util.ByteConversion as bc

class DailyTransfer(object):

    def __init__(self, daily_transfer_string):
        print(daily_transfer_string)
        colon_split = daily_transfer_string.split(':')
        self.__date = colon_split[0]

        string_to_next_space = lambda x: x[0:x.find(' ')]

        uploaded_onwards = colon_split[1].strip()
        self.__uploaded = string_to_next_space(uploaded_onwards)

        downloaded_onwards = daily_transfer_string.split(',')[1].strip()
        self.__downloaded = string_to_next_space(downloaded_onwards)

    @property
    def date(self):
        return self.__date

    @date.setter
    def date(self, val):
        self.__date = val

    @property
    def uploaded(self):
        return bc.bytes_to_megabytes(self.__uploaded)

    @uploaded.setter
    def uploaded(self, val):
        self.__uploaded = val

    @property
    def downloaded(self):
        return bc.bytes_to_megabytes(self.__downloaded)

    @downloaded.setter
    def downloaded(self, val):
        self.__downloaded = val
