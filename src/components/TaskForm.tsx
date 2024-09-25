import React, { useState } from 'react';
import { Input, Button, DatePicker, Select, Form } from 'antd';
import moment from 'moment'; // Import moment for date handling
import { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const { TextArea } = Input;
const { Option } = Select;

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  // Set initial task state with current date
  const [task, setTask] = useState<Task>({
    id: initialTask?.id || Date.now().toString(),
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    dueDate: initialTask?.dueDate || '',
    priority: initialTask?.priority || 'Medium',
    status: initialTask?.status || 'In progress', // Default status
  });

  // Get current date
  const getCurrentDateIST = () => {
    const currentDate = new Date();
    const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // IST is UTC + 5:30
    const istTime = new Date(currentDate.getTime() + istOffset);
    const year = istTime.getFullYear();
    const month = String(istTime.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(istTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    // Set the due date to the current date in IST
    const updatedTask = {
      ...task,
      dueDate: task.dueDate || getCurrentDateIST(), // Fallback to current date
    };

    if (!updatedTask.title) {
      alert('Title is required'); // Basic validation
      return;
    }
    onSubmit(updatedTask);
    window.location.reload();
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Title" required>
        <Input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Description">
        <TextArea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Due Date">
        <DatePicker
          value={task.dueDate ? moment(task.dueDate) : undefined} // Convert the string to a object
          onChange={(date, dateString) => {
            if (dateString) {
              setTask({ ...task, dueDate: String(dateString) });
            }
          }}
          placeholder={getCurrentDateIST()} // Show the current IST date as a placeholder
        />
      </Form.Item>

      <Form.Item label="Priority">
        <Select
          value={task.priority}
          onChange={(value) => setTask({ ...task, priority: value })}
        >
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Status">
        <Select
          value={task.status}
          onChange={(value) => setTask({ ...task, status: value })}
        >
          <Option value="In progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {initialTask ? 'Update Task' : 'Add Task'}
      </Button>
    </Form>
  );
};

export default TaskForm;
