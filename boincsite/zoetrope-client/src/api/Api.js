import axios from 'axios';

const getData = (cb,ep) => {
    axios.get(`http://192.168.0.88:8081/${ep}`).then(x => {
      cb(x.data);
    });
};

const getTasks = cb => getData(cb, 'tasks_json');
const getProjects = cb => getData(cb, 'projects_json');
const getMessages = cb => getData(cb, 'messages_json');

export { 
  getTasks,
  getProjects,
  getMessages,
};
