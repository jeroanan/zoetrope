# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class Coproc(struct.Struct):
    ''' represents a set of identical coprocessors on a particular computer.
        Abstract class;
        objects will always be a derived class (COPROC_CUDA, COPROC_ATI)
        Used in both client and server.
    '''
    def __init__(self):
        self.type        = ""     #// must be unique
        self.count       = 0      #// how many are present
        self.peak_flops  = 0.0
        self.used        = 0.0    #// how many are in use (used by client)
        self.have_cuda   = False  #// True if this GPU supports CUDA on this computer
        self.have_cal    = False  #// True if this GPU supports CAL on this computer
        self.have_opencl = False  #// True if this GPU supports openCL on this computer
        self.available_ram = 0
        self.specified_in_config = False
            #// If true, this coproc was listed in cc_config.xml
            #// rather than being detected by the client.

        #// the following are used in both client and server for work-fetch info
        self.req_secs = 0.0
            #// how many instance-seconds of work requested
        self.req_instances = 0.0
            #// client is requesting enough jobs to use this many instances
        self.estimated_delay = 0
            #// resource will be saturated for this long

        self.opencl_device_count = 0
        self.last_print_time = 0.0

        #self.opencl_prop = None  # OPENCL_DEVICE_PROP
