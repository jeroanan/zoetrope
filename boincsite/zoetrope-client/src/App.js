import logo from './logo.svg';
import './App.css';

import TaskList from './components/tasklist.js';
import ProjectList from './components/projectlist.js';
import Messages from './components/messages.js';
import DiskUsage from './components/diskusage.js';
import HostInfo from './components/hostinfo.js';

function App() {
  return (
    <div className="App">
      <HostInfo />
    </div>
  );
}

export default App;
