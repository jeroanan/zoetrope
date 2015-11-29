def bytes_to_gigabytes(bytes):
    gb = float(1024 ** 3)
    return '{0:.2f}GB'.format(float(bytes)/gb)

def bytes_to_megabytes(bytes):
    gb = float(1024 ** 2)
    return '{0:.2f}MB'.format(float(bytes)/gb)
