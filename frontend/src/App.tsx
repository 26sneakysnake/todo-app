import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/tasks/TaskList';
import TaskCreate from './components/tasks/TaskCreate';
import TaskUpdate from './components/tasks/TaskUpdate';
import TasksChart from './components/charts/TasksChart';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Todo App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Task List</Link>
            </li>
            <li>
              <Link to="/create">Create Task</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskCreate />} />
          <Route path="/update/:id" element={<TaskUpdate />} />
        </Routes>
        <TasksChart />
      </div>
    </Router>
  );
};

export default App;