import axios from 'axios';

const getData = (cb,ep) => {
    axios.get(`http://192.168.0.88:8081/${ep}`).then(x => {
      cb(x.data);
    });
};

const getTasks = cb => getData(cb, 'tasks_json');
const getProjects = cb => getData(cb, 'projects_json');
const getMessages = cb => getData(cb, 'messages_json');
const getDiskUsage = cb => getData(cb, 'disk_usage_json');
const getHostInfo = cb => getData(cb, 'host_info_json');
const getDailyTransferHistory = cb => getData(cb, 'daily_transfer_history_json');
const getGlobalPreferences = cb => getData(cb, 'get_global_preferences_json');

export { 
  getTasks,
  getProjects,
  getMessages,
  getDiskUsage,
  getHostInfo,
  getDailyTransferHistory,
  getGlobalPreferences,
};