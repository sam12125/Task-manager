import React, { useState } from 'react';
import { Button, Tag, Modal } from 'antd';
import TaskForm from './TaskForm';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Define color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'orange'; 
      case 'High':
        return 'red'; 
      default:
        return 'blue'; 
    }
  };

  return (
    <div className="task-item shadow-md p-4 mb-4 rounded-lg bg-white mx-auto leading-relaxed sm:w-1/3 w-64"
      >
      <h3 className="text-2xl">{task.title}</h3>
      <p>{task.description}</p>


      <Tag color={task.status === 'Completed' ? 'green' : 'blue'}>{task.status}</Tag>

      {/* Priority Tag with color based on priority */}
      <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>

      <p>Due Date: {task.dueDate}</p>

      <div className="flex gap-2">
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </div>

      {/* Modal for editing task */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <TaskForm initialTask={task} onSubmit={(updatedTask) => {
          onUpdate(updatedTask);
          setIsEditing(false);
        }} />
      </Modal>
    </div>
  );
};

export default TaskItem;
