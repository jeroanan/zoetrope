import boincsite.util.ByteConversion as bc

class DailyTransfer(object):

    def __init__(self, daily_transfer):
        self.bytes_uploaded = 0.0
        self.bytes_downloaded = 0.0
        self.transfers_date = ''

    @property
    def date(self):
        return self.transfers_date

    @date.setter
    def date(self, val):
        self.transfers_date = val

    @property
    def uploaded(self):
        return bc.bytes_to_megabytes(self.bytes_uploaded)

    @uploaded.setter
    def uploaded(self, val):
        self.bytes_uploaded = val

    @property
    def downloaded(self):
        return bc.bytes_to_megabytes(self.bytes_downloaded)

    @downloaded.setter
    def downloaded(self, val):
        self.bytes_downloaded = val
