class User(object):

    def __init__(self):
        self.fields = ['user_id', 'user_no']
        self.user_id = ''
        self.user_no = -1

    @staticmethod
    def from_user_id(user_id):
        u = User()
        u.user_id = user_id
        return u
