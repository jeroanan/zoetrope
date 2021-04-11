import React, { useEffect, useState } from 'react';

import { getTasks, getProjects } from '../api/Api';

const TaskList = () => {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks((tasks) => setTasks(tasks));
    getProjects((projects) => setProjects(projects));
  }, []);

  useEffect(() => {
    setLoading(tasks.length===0 && projects.length===0);
    console.debug({ tasks });
  }, [tasks, projects]);

  const getProjectByUrl = u => {
    const ps = projects.filter(x => x.master_url === u);
    return ps.length > 0 ? ps[0] : null;
  };

  return (
    <div>
    <h2>Task List</h2>
    {!loading &&
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Project</th>
            <th>Progress</th>
            <th>State</th>
            <th>Time Elapsed</th>
            <th>Time Remaining</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(x => (
            <tr key={x.name}>
              <td><a href={`/task/${x.name}`}>{x.name}</a></td>
              <td>{getProjectByUrl(x.project_url)?.project_name}</td>
              <td>{x.fraction_done}</td>
              <td>{x.state}</td>
              <td>{x.current_cpu_time}</td>
              <td>{x.estimated_cpu_time_remaining}</td>
              <td>{x.report_deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    }
    </div>
  );
};

export default TaskList;
