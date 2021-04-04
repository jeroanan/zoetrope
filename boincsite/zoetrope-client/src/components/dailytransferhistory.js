import React, { useEffect, useState } from 'react';

import { getDailyTransferHistory } from '../api/Api';
import { LabelValueRow } from './primitives/row';

const DailyTransferHistory = () => {

  const initialTotalTransfer = {
    up: 0,
    down: 0,
  };

  const [transferHistory, setTransferHistory] = useState({});
  const [totalTransfer, setTotalTransfer] = useState(initialTotalTransfer);

  useEffect(() => {
    getDailyTransferHistory(x => setTransferHistory(x));
  }, []);

  useEffect(() => {
    if (transferHistory.length) {
      setTotalTransfer({
        up: transferHistory.reduce((x,y) => x + y.up, 0).toFixed(2),
        down: transferHistory.reduce((x,y) => x + y.down, 0).toFixed(2),
      });
    }
  }, [transferHistory]);

  return (
    <>
    <h2>Daily Transfer History</h2>
    <LabelValueRow label="Total uploaded" value={`${totalTransfer.up}MB`} />
    <LabelValueRow label="Total downloaded" value={`${totalTransfer.down}MB`} />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Uploaded</th>
          <th>Downloaded</th>
        </tr>
      </thead>
      <tbody>
        {transferHistory.map(x => (
          <tr key={x.when}>
            <td>{x.when}</td>
            <td>{x.up}MB</td>
            <td>{x.down}MB</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default DailyTransferHistory;

