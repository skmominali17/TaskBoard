import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { TaskContext } from "../contexts/TaskContext";
import { FilterContext } from "../contexts/FilterContext";

interface TaskCardProps {
  props: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: string;
  startDate: string;
  endDate: string | null;
  status: string;
  team: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ props }) => {
  const { filterState } = useContext(FilterContext);
  const { tasks } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const getStyle = () => {
    switch (props) {
      case "pending":
        return "bg-gray-400";
      case "in progress":
        return "bg-orange-400";
      case "completed":
        return "bg-blue-400";
      case "deployed":
        return "bg-blue-900";
      case "deffered":
        return "bg-red-400";
    }
  };

  useEffect(() => {
    // This effect runs whenever 'tasks' changes
    const filteredTasksByStatus = tasks.filter((task) => task.status === props);

    const filteredTasksByContext = filteredTasksByStatus.filter((task) => {
      const { assignee, priority, date } = filterState;
      const matchesAssignee = assignee === "" || task.assignee === assignee;
      const matchesPriority = priority === "" || task.priority === priority;
      const matchesDate = date === "" || task.startDate === date;

      return matchesAssignee && matchesPriority && matchesDate;
    });

    setFilteredTasks(filteredTasksByContext); 
  }, [tasks, props, filterState]);

  return (
    <div className="w-full h-[60vh] bg-white rounded-lg overflow-y-scroll overflow-x-auto">
      <div
        className={`w-full py-2 text-center text-lg text-white font-semibold capitalize ${getStyle()}`}
      >
        {props}
      </div>
      <div className="w-full px-2 py-3 md:py-4 flex flex-col items-center gap-2 md:gap-4">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} props={props} />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
