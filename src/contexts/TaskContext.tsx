// This context is responsible for handling all the tasks in the web-app.
import { createContext, useState, ReactNode } from "react";

interface Task {
 id: string;
 title: string;
 description: string;
 assignee: string;
 priority: string;
 startDate: string;
 endDate: string;
 status: string;
 team: string;
}

interface TaskContextProps {
 tasks: Task[];
 setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
 updateTask: (id: string, updatedTask: Task) => void;
}

const defaultValue: TaskContextProps = {
 tasks: [],
 setTasks: () => {},
 updateTask: () => {},
};

export const TaskContext = createContext<TaskContextProps>(defaultValue);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [tasks, setTasks] = useState<Task[]>([]);

 const updateTask = (id: string, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
 };

 return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTask }}>
      {children}
    </TaskContext.Provider>
 );
};
