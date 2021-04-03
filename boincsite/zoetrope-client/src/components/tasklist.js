import React from 'react';
import axios from 'axios';

const TaskList = () => {
  const d = axios.get('http://192.168.0.88:8081');
  return (
    <div>
    <h2>Task List</h2>
    </div>
  );
};

export default TaskList;
