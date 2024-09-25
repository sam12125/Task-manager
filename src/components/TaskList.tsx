import React, { useState, useEffect } from 'react';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from '../components/localStorage';
import { Task } from '../types';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasksFromLocalStorage());
  }, []);

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="task-list flex flex-col gap-5">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No tasks</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
};

export default TaskList;
