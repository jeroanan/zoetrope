import logo from './logo.svg';
import './App.css';

import TaskList from './components/tasklist.js';
import ProjectList from './components/projectlist.js';

function App() {
  return (
    <div className="App">
      <TaskList />
      <ProjectList />
    </div>
  );
}

export default App;
