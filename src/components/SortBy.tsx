import { useContext } from "react";
import { SortContext } from "../contexts/SortContext";
import { TaskContext } from "../contexts/TaskContext";

const SortBy = () => {
  const { sortState, setSortState } = useContext(SortContext);
  console.log(sortState);
  const { tasks, setTasks } = useContext(TaskContext);
  console.log(tasks);

  const handleChange = (e: any) => {
    setSortState(e.target.value);
    const sortTasks = (tasks: any) => {
      if (sortState === "null") {
        return tasks;
      }

      return [...tasks].sort((a: any, b: any) => {
        if (sortState === "priority") {
          return a.priority - b.priority;
        } else if (sortState === "startDate") {
          // Get current date in YYYY-MM-DD format
          const currentDate = new Date().toISOString().slice(0, 10);

          // Check if startDate is the current date
          const isStartDateCurrentA = a.startDate === currentDate;
          const isStartDateCurrentB = b.startDate === currentDate;

          // If both startDates are the current date, keep their original order
          if (isStartDateCurrentA && isStartDateCurrentB) return 0;

          // If only one startDate is the current date, place it first
          if (isStartDateCurrentA) return -1;
          if (isStartDateCurrentB) return 1;

          // Otherwise, sort by startDate
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        } else if (sortState === "endDate") {
          // Calculate the number of days between the current date and the endDate for each task
          const currentDate = new Date();
          // Convert to date objects
          const endDateA = new Date(a.endDate);
          const endDateB = new Date(b.endDate);
          // Calculate differences in milliseconds
          const differenceA = Math.abs(
            endDateA.getTime() - currentDate.getTime()
          );
          const differenceB = Math.abs(
            endDateB.getTime() - currentDate.getTime()
          );
          // Sort by the differences
          return differenceA - differenceB;
        }
        return 0;
      });
    };
    setTasks(sortTasks(tasks));
  };

  return (
    <div className="hidden md:block w-full px-6">
      <span className="text-lg font-normal">Sort By:</span>
      <select
        className="ml-8 p-2 rounded-md"
        name="sortby"
        onChange={(e) => handleChange(e)}
      >
        <option value="null">Sort By</option>
        <option value="priority">Priority</option>
        <option value="startDate">Start Date</option>
        <option value="endDate">End Date</option>
      </select>
    </div>
  );
};

export default SortBy;
