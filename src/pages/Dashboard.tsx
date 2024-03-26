import { useContext } from "react";
import AddTask from "../components/AddTask";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import FilterBy from "../components/FilterBy";
import Heading from "../components/Heading";
import SortBy from "../components/SortBy";
import { ModalContext } from "../contexts/ModalContext";
import TaskCard from "../components/TaskCard";
import { Carousel } from "flowbite-react";
import DeleteTask from "../components/DeleteTask";

const Dashboard = () => {
  const { modalState } = useContext(ModalContext);
  return (
    <div className="h-full w-full relative">
      <div className="w-full h-full px-2 ">
        <Heading />
        <div className="w-full border-4 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:p-4 sm:gap-20">
            <FilterBy />
            <div className="hidden lg:block">
              <AddTask />
            </div>
          </div>
          <SortBy />
          <div className="h-4/5 w-full p-4 grid grid-cols-1 md:p-8 lg:hidden">
            <Carousel indicators={false} slide={false} className="w-full">
              <TaskCard props={"pending"} />
              <TaskCard props={"in progress"} />
              <TaskCard props={"completed"} />
              <TaskCard props={"deployed"} />
              <TaskCard props={"deffered"} />
            </Carousel>
          </div>
          <div className="hidden lg:block">
            <div className="h-4/5 w-full p-4 md:p-8 flex gap-4">
              <TaskCard props={"pending"} />
              <TaskCard props={"in progress"} />
              <TaskCard props={"completed"} />
              <TaskCard props={"deployed"} />
              <TaskCard props={"deffered"} />
            </div>
          </div>
          <div className="w-full px-4 py-2 lg:hidden"><AddTask /></div>
        </div>
      </div>
      {modalState.isOpen === true && (
        <div className="h-full w-full flex justify-center items-center absolute inset-0 bg-gray-900 bg-opacity-50">
          {modalState.isOpen === true && modalState.type === "add" && (
            <CreateTask />
          )}
          {modalState.isOpen === true && modalState.type === "delete" && (
            <DeleteTask />
          )}
          {modalState.isOpen === true && modalState.type === "edit" && (
            <EditTask />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;