import React, { useEffect, useState } from 'react';

import { getGlobalPreferences } from '../api/Api';
import { FourColumnRow } from './primitives/row';

const GlobalPreferences = () => {

  const [globalPrefs, setGlobalPrefs] = useState({});

  useEffect(() => {
    getGlobalPreferences(x => setGlobalPrefs(x));
  }, []);

  const MakeRow = ({label1, key1, label2, key2}) => {
    const col1 = { col1Label: label1, col1Value: globalPrefs[key1] };
    const col2 = { col2Label: label2, col2Value: globalPrefs[key2] };

    return FourColumnRow({col1, col2});
  };

  return (
    <>
    <h2>Global Preferences</h2>
    <h3>CPU/GPU</h3>
    <MakeRow label1="Percentage of the CPUs to use" key1={'cpu_usage_limit'} 
      label2="Maximum CPU Usage" key2={'suspend_cpu_usage'} />
    <MakeRow label1="Maximum number of CPUs to use" key1={'max_cpus'} 
      label2="Use GPU if computer in use" key2={'run_gpu_if_user_active'} />
    <MakeRow label1="CPU scheduling period" key1={'cpu_scheduling_period_minutes'} 
      label2="" key2={''} />

    <h3>Memory</h3>
    <MakeRow label1="Maximum RAM to use when idle" key1={'ram_max_used_idle_pct'} 
      label2="Maximum % of RAM to use when in use" key2={'ram_max_used_busy_pct'} />
    <MakeRow label1="Leave apps in memory?" key1={'leave_apps_in_memory'} 
      label2="" key2={''} />

    <h3>When to Run</h3>
    <MakeRow label1="Start hour" key1={'start_hour'} 
      label2="End hour" key2={'end_hour'} />
    <MakeRow label1="Run if computer in use" key1={'run_if_user_active'} 
      label2="Run when idle for" key2={'idle_time_to_run'} />

    <h3>Network</h3>
    <MakeRow label1="Hangup if dialed" key1={'hangup_if_dialed'} 
      label2="Confirm before making an internet connection" key2={'idle_time_to_run'} />
    <MakeRow label1="Maximum download speed" key1={'max_byes_sec_down'} 
      label2="Maximum upload speed" key2={'max_byes_sec_up'} />
    <MakeRow label1="Starting hour for network traffic" key1={'net_start_hour'} 
      label2="Ending hour for network traffic" key2={'net_end_hour'} />
    <MakeRow label1="WiFi only?" key1={'network_wifi_only'} 
      label2="" key2={''} />

    <h3>Battery</h3>
    <MakeRow label1="Maximum Battery temperature" key1={'battery_max_temperature'} 
      label2="Minimum battery charge" key2={'battery_charge_min_pct'} />
    <MakeRow label1="Run on batteries?" key1={'run_on_batteries'} 
      label2="" key2={''} />

    <h3>Disk</h3>
    <MakeRow label1="Maximum disk space to use" key1={'disk_max_used_gb'} 
      label2="Maximum percentage diks space to use" key2={'disk_max_used_pct'} />
    <MakeRow label1="Make task checkpoint to disk every (seconds)" key1={'disk_interval'} 
      label2="Minimum disk space to leave free" key2={'disk_min_free_gb'} />

    <h3>Misc. Settings</h3>
    <MakeRow label1="daily_xfer_period_days" key1={'daily_xfer_period_days'} 
      label2="Don't verify images" key2={'dont_verify_images'} />
    <MakeRow label1="mod_time" key1={'mod_time'} 
      label2="Override file present" key2={'override_file_present'} />
    <MakeRow label1="Source Project" key1={'source_project'} 
      label2="suspend_if_no_recent_input" key2={'suspend_if_no_recent_input'} />
    <MakeRow label1="Amount of extra work to buffer" key1={'work_buf_additional_days'} 
      label2="Minimum work to buffer" key2={'work_buf_min_days'} />
    <MakeRow label1="vm_max_used_pct" key1={'vm_max_used_pct'} 
      label2="" key2={''} />


    </>
  );
};

export default GlobalPreferences;

