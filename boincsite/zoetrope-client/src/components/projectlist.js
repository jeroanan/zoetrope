import React, { useEffect, useState } from 'react';
import { getProjects } from '../api/Api';

const ProjectList = () => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects((projects) => setProjects(projects));
  }, []);

  return (
    <>
    <h2>Projects</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Credit</th>
          <th>Recent Average Credit</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(x => (
          <tr key={x.master_url}>
            <td>{x.project_name}</td>
            <td>{x.user_total_credit}</td>
            <td>{x.user_expavg_credit}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );


};

export default ProjectList;

