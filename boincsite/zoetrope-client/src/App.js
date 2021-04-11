import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import TaskList from './components/tasklist';
import Task from './components/task';
import ProjectList from './components/projectlist';
import Messages from './components/messages';
import DiskUsage from './components/diskusage';
import HostInfo from './components/hostinfo';
import DailyTransferHistory from './components/dailytransferhistory';
import GlobalPreferences from './components/globalpreferences';
import NavBar from './components/primitives/navbar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App-Inner">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <TaskList />
            </Route>
            <Route path={"/task/:taskId"}>
              <Task />
            </Route>
            <Route path="/projects">
              <ProjectList />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/diskusage">
              <DiskUsage />
            </Route>
            <Route path="/hostinfo">
              <HostInfo />
            </Route>
            <Route path="/dailytransferhistory">
              <DailyTransferHistory />
            </Route>
            <Route path="/globalpreferences">
              <GlobalPreferences />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
