export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'In progress' | 'Completed';
  }

export interface Task {
  id: string;          
  title: string;         
  dueDate: string;       
  priority: 'Low' | 'Medium' | 'High';
}

  
  