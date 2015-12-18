import boincsite.status.DailyTransfer as dt

class DailyTransfer(dt.DailyTransfer):

    def __init__(self, daily_transfer):
        super().__init__(daily_transfer)
        colon_split = daily_transfer.split(':')
        self.date = colon_split[0]

        string_to_next_space = lambda x: x[0:x.find(' ')]

        uploaded_onwards = colon_split[1].strip()
        self.uploaded = string_to_next_space(uploaded_onwards)

        downloaded_onwards = daily_transfer.split(',')[1].strip()        
        self.downloaded = string_to_next_space(downloaded_onwards)
