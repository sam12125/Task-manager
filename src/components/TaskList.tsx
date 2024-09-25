import React, { useState, useEffect } from 'react';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from '../components/localStorage';
import { Task } from '../types';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term

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

  const sortByDate = (option: string) => {
    let sortedTasks;
    if (option === 'latestFirst') {
      sortedTasks = [...tasks].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    } else if (option === 'latestEnd') {
      sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else {
      sortedTasks = getTasksFromLocalStorage(); // Reset to original order
    }
    setTasks(sortedTasks);
  };

  const sortByPriority = (option: string) => {
    let sortedTasks;
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };

    if (option === 'lowtohigh') {
      sortedTasks = [...tasks].sort((a, b) => (priorityOrder[a.priority] - priorityOrder[b.priority]));
    } else if (option === 'hightolow') {
      sortedTasks = [...tasks].sort((a, b) => (priorityOrder[b.priority] - priorityOrder[a.priority]));
    } else {
      sortedTasks = getTasksFromLocalStorage(); // Reset to original order
    }
    setTasks(sortedTasks);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    
    // Determine if the selected option is for date or priority
    if (selectedOption === 'latestFirst' || selectedOption === 'latestEnd') {
      sortByDate(selectedOption);
    } else if (selectedOption === 'lowtohigh' || selectedOption === 'hightolow') {
      sortByPriority(selectedOption);
    } else {
      setTasks(getTasksFromLocalStorage()); // Reset to original order if "all"
    }
  };

  // New filter function
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  // Filtered tasks based on search term
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list flex flex-col gap-5">
      <div className='flex gap-5 mt-4 justify-center'>
        <select value={sortOption} onChange={handleSortChange} className='p-2'>
          <option value="all">Sort by date</option>
          <option value="latestFirst">Latest First</option>
          <option value="latestEnd">Earliest First</option>
        </select>

        <select value={sortOption} onChange={handleSortChange} className='p-2'>
          <option value="all">Sort by priority</option>
          <option value="lowtohigh">Low to High</option>
          <option value="hightolow">High to Low</option>
        </select>
      </div>

      <div className='flex gap-5 mt-4 justify-center'>
        <input 
          type="text" 
          placeholder='Search by title' 
          onChange={handleFilter} 
          value={searchTerm}
          className='border-2 p-2 border-zinc-950 rounded-md'
          
        />
      </div>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No tasks found</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
};

export default TaskList;
