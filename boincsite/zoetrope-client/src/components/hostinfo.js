import React, { useEffect, useState } from 'react';

import { getHostInfo } from '../api/Api';
import { FourColumnRow } from './primitives/row';

const HostInfo = () => {
  
  const [hostInfo, setHostInfo] = useState({});

  useEffect(() => {
    getHostInfo(hi => setHostInfo(hi));
  }, []);

  const MakeRow = ({label1, key1, label2, key2}) => {
    const col1 = { col1Label: label1, col1Value: hostInfo[key1] };
    const col2 = { col2Label: label2, col2Value: hostInfo[key2] };

    return FourColumnRow({col1, col2});
  };

  return (
    <>
    <h2>Host Info</h2>
    <MakeRow label1="System uptime" key1={'uptime'} label2="CPU temperature" key2={'cpu_temperature'} />
    <MakeRow label1="Domain name" key1={'domain_name'} label2="IP address" key2={'ip_address'} />
    <MakeRow label1="Timezone" key1={'timezone'} label2="" key2={''} />
    <MakeRow label1="Number of CPUs" key1={'number_of_cpus'} label2="CPU Vendor" key2={'cpu_vendor'} />
    <MakeRow label1="CPU Model" key1={'cpu_model'} label2="CPU floating point operations/second" key2={'cpu_fps_ops'} />
    <MakeRow label1="CPU integer operations/second" key1={'cpu_int_ops'} label2="CPU memory bandwidth" key2={'cpu_mem_bw'} />
    <MakeRow label1="Operating system name" key1={'os_name'} label2="Operating system version" key2={'os_version'} />
    <MakeRow label1="Memory size" key1={'memory_size'} label2="Cache size" key2={'cache_size'} />
    <MakeRow label1="Swap size" key1={'swap_size'} label2="Disk size" key2={'disk_size'} />
    <MakeRow label1="Disk free" key1={'disk_free'} label2="" key2={''} />
    </>
  );
};


export default HostInfo;



