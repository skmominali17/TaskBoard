import React, { useContext, useId, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { teams } from "../data/TeamData";
import { assignees } from "../data/AssigneeData";
import { ModalContext } from "../contexts/ModalContext";
import { TaskContext } from "../contexts/TaskContext";

const CreateTask = () => {
 const { setModalState } = useContext(ModalContext);
 const { setTasks } = useContext(TaskContext);
 const [formState, setFormState] = useState({
    title: "",
    description: "",
    team: "",
    assignee: "",
    priority: "",
    endDate: "",
 });
 const id = useId()
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: id,
        ...formState,
        status: "pending",
        startDate: new Date().toJSON().slice(0, 10),
      },
    ]);
    setModalState({ type: "", isOpen: false }); // Close the modal after submitting
 };

 return (
    <div className="px-2">
      <div className="w-full bg-gradient-to-br from-red-200 to-indigo-200 h-1/2">
        <div className="h-16 bg-white flex justify-between items-center px-4">
          <div>
            <h2 className="uppercase text-lg tracking-wide">Create A Task</h2>
          </div>
          <div>
            <IoIosCloseCircleOutline
              className="text-2xl cursor-pointer md:text-3xl"
              onClick={() => setModalState({ type: "", isOpen: false })}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 py-8 px-4">
          <div className="flex items-start mb-6">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              className="bg-gray-200 border-2 border-gray-400 rounded-md ml-20 px-2 py-1 w-56"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormState({ ...formState, title: e.target.value });
              }}
            />
          </div>
          <div className="flex items-start">
            <label htmlFor="description">Description: </label>
            <textarea
              className="bg-gray-200 border-2 border-gray-400 rounded-md ml-8 mb-4 px-2 py-1 w-56"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormState({ ...formState, description: e.target.value });
              }}
            />
          </div>
          <div className="flex items-start mb-6">
            <label htmlFor="team">Team: </label>
            <select
              name="team"
              className="bg-gray-200 border-2 border-gray-400 rounded-md ml-20 px-4 py-1 w-56"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormState({ ...formState, team: e.target.value });
              }}
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                 {team}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start mb-6">
            <label htmlFor="assignee">Assignee: </label>
            <select
              name="assignee"
              className="bg-gray-200 border-2 border-gray-400 rounded-md ml-14 px-4 py-1 w-56"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormState({ ...formState, assignee: e.target.value });
              }}
            >
              <option value="">Select Assignee</option>
              {assignees.map((assignee, index) => (
                <option key={index} value={assignee}>
                 {assignee}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start mb-4">
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              className="bg-gray-200 border-2 border-gray-400 rounded-md ml-16 px-4 py-1 w-24"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormState({ ...formState, priority: e.target.value });
              }}
            >
              <option value="">Select Priority</option>
              <option value="0">P0</option>
              <option value="1">P1</option>
              <option value="2">P2</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="date">End Date:</label>
            <input type="date" name="endDate" className="ml-14 rounded-md bg-gray-200" onChange={(e) => setFormState({
              ...formState, 
              endDate: e.target.value
            })}/>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
 );
};

export default CreateTask;
