import React, { useEffect, useState } from 'react';

import { getMessages } from '../api/Api';

const Messages = () => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages((messages) => setMessages(messages));
  }, []);

  return (
    <>
    <h2>Messages</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Project</th>
          <th>Message Text</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(x => {
          return (
            <tr key={x.seqno}>
              <td>{x.seqno}</td>
              <td>{x.time}</td>
              <td>{x.body}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default Messages;
