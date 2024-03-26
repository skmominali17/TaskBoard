import React, { useState, useContext, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { assignees } from "../data/AssigneeData";
import { ModalContext } from "../contexts/ModalContext";
import { TaskContext } from "../contexts/TaskContext";

const EditTask = () => {
  const { modalState, setModalState } = useContext(ModalContext);
  const { tasks, updateTask } = useContext(TaskContext);
  const TaskId = modalState.props;
  const task = tasks.find((task) => task.id === TaskId);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  // handles the side Effects
  useEffect(() => {
    if (task) {
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      // Update the task with the new priority and status
      updateTask(TaskId, { ...task, priority, status });
    }
    setModalState({
      type: "",
      isOpen: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-2">
      <div className="w-full bg-gradient-to-br from-red-200 to-indigo-200 h-1/2">
        <div className="h-16 bg-white flex justify-between items-center px-4">
          <div>
            <h2 className="uppercase text-lg tracking-wide">Edit Task</h2>
          </div>
          <div>
            <IoIosCloseCircleOutline
              className="text-2xl"
              onClick={() => {
                setModalState({
                  type: "",
                  isOpen: false,
                });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 py-8 px-4">
          <label htmlFor="title" className="block">
            Title:{" "}
          </label>
          <input
            type="text"
            value={task?.title}
            className="bg-gray-200 border-2 border-gray-400 rounded-md px-2 py-1 w-full"
            disabled
          />

          <label htmlFor="description" className="block">
            Description:{" "}
          </label>
          <textarea
            value={task?.description}
            className="bg-gray-200 border-2 border-gray-400 rounded-md px-2 py-1 w-full"
            disabled
          />

          <label htmlFor="assignee" className="block">
            Assignee:{" "}
          </label>
          <select
            name="assignee"
            className="bg-gray-200 border-2 border-gray-400 rounded-md px-4 py-1 w-full"
            disabled
            value={task?.assignee}
          >
            <option value="null">Assignee</option>
            {assignees.map((assignee, index) => (
              <option key={index} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>

          <label htmlFor="priority" className="block">
            Priority:{" "}
          </label>
          <select
            name="priority"
            className="bg-gray-200 border-2 border-gray-400 rounded-md px-4 py-1 w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="null">Priority</option>
            <option value="0">P0</option>
            <option value="1">P1</option>
            <option value="2">P2</option>
          </select>

          <label htmlFor="status" className="block">
            Status:{" "}
          </label>
          <select
            name="status"
            className="bg-gray-200 border-2 border-gray-400 rounded-md px-4 py-1 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="null">Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="deployed">Deployed</option>
            <option value="deffered">Deffered</option>
          </select>
        </div>
        <div className="h-16 bg-white flex justify-end px-4">
          <div className="flex items-center gap-5">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-700 rounded-md text-white"
            >
              Submit
            </button>
            <button
              type="reset"
              className="px-3 py-1 bg-blue-700 rounded-md text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditTask;
