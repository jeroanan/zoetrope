import logo from './logo.svg';
import './App.css';

import TaskList from './components/tasklist.js';
import ProjectList from './components/projectlist.js';
import Messages from './components/messages.js';

function App() {
  return (
    <div className="App">
      <TaskList />
      <ProjectList />
      <Messages />
    </div>
  );
}

export default App;
