import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from './components/localStorage';

const App: React.FC = () => {
  const addTask = (task: Task) => {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList />
    </div>
  );
};

export default App;
