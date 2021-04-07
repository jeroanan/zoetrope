import React, { useEffect, useState } from 'react';

import { getDiskUsage } from '../api/Api';
import { LabelValueRow } from './primitives/row';

const DiskUsage = () => {

  const [diskUsage, setDiskUsage] = useState({});

  useEffect(() => {
    getDiskUsage(du => setDiskUsage(du));
  }, []);

  return (
    <>
    <h2>Disk Usage</h2>
    <LabelValueRow label="Total Disk Space" value={diskUsage.total_disk_space} />
    <LabelValueRow label="Free Disk Space" value={diskUsage.free_disk_space} />

    <h3>By Project</h3>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Project Url</th>
          <th>Disk Usage</th>
        </tr>
      </thead>
      <tbody>
        {diskUsage.project_disk_usages && diskUsage.project_disk_usages.map(x => {
          return (
            <tr key={x.master_url}>
              <td><a href={x.master_url}>{x.master_url}</a></td>
              <td>{x.disk_usage}MB</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  );
};

export default DiskUsage;

