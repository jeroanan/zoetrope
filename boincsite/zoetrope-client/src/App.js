import logo from './logo.svg';
import './App.css';

import TaskList from './components/tasklist';
import ProjectList from './components/projectlist';
import Messages from './components/messages';
import DiskUsage from './components/diskusage';
import HostInfo from './components/hostinfo';
import DailyTransferHistory from './components/dailytransferhistory';
import GlobalPreferences from './components/globalpreferences';

function App() {
  return (
    <div className="App">
      <GlobalPreferences />
    </div>
  );
}

export default App;
