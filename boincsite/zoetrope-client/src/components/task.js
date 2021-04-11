import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask, getProjects } from '../api/Api';
import { LabelValueRow } from './primitives/row';

const Task = () => {

  const { taskId } = useParams();

  const [task, setTask] = useState({});
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    getTask(taskId, x => setTask(x));
    getProjects(x => setProjects(x));
  }, [taskId]);

  const getProject = () => 
    projects.filter(x => x.master_url===task.project_url)[0]?.project_name;

  return (
    <div>
      <h2>Task Summary: {taskId}</h2>
      <LabelValueRow label="Workunit name" value={task.name} />
      <LabelValueRow label="Project name" value={getProject()} />
      <LabelValueRow label="Percent done" value={task.fraction_done} />
      <LabelValueRow label="Time elapsed" value={task.final_cpu_time} />
      <LabelValueRow label="Time remaining" value={task.estimated_cpu_time_remaining} />
      <LabelValueRow label="Report deadline" value={task.report_deadline} />
      <LabelValueRow label="Ready to report?" value={task.ready_to_report?.toString()} />
      <LabelValueRow label="State" value={task.state} />
      <LabelValueRow label="Suspended via GUI?" value={task.suspended_via_gui?.toString()} />
      <LabelValueRow label="Active task state" value={task.active_task_state} />
      
    </div>
  );
};

export default Task;

