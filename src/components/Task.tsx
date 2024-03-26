import React, { useState, useEffect, useRef, useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { ModalContext } from "../contexts/ModalContext";

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: string;
  };
  props: string;
}

const Task: React.FC<TaskProps> = ({ task, props }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const { setModalState } = useContext(ModalContext);
  const ref = useRef<HTMLDivElement>(null); // Reference to the popup div

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsPopUpOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDivClick = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div
      key={task.id}
      className="h-56 w-full bg-gray-200 p-2 rounded-md relative"
    >
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div className="capitalize w-36 overflow-hidden">{task.title}</div>
          <div className="px-2 py-1 bg-blue-900 text-white">
            P{task.priority}
          </div>
        </div>
        <hr />
        <div className="h-20 mt-2 overflow-hidden">
          <p>{task.description}</p>
        </div>
        <div className="mt-2 flex items-start justify-between">
          <p>@{task.assignee}</p>
          <div className="relative cursor-pointer">
            {!isPopUpOpen ? (
              <div
                className="p-2 bg-blue-900 text-white"
                onClick={() => setIsPopUpOpen(true)}
              >
                <HiDotsVertical />
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-2 h-20 w-32 bg-gray-300 absolute z-50 top-0 right-0 rounded-md shadow-md text-black border-2 border-gray-500"
                ref={ref}
                onClick={handleDivClick}
              >
                <div
                  className="text-center w-full border-b border-gray-400"
                  onClick={() =>
                    setModalState({
                      type: "edit",
                      isOpen: true,
                      props: task.id,
                    })
                  }
                >
                  Edit
                </div>
                <div
                  className="text-center w-full"
                  onClick={() =>
                    setModalState({
                      type: "delete",
                      isOpen: true,
                      props: task.id,
                    })
                  }
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-24 text-center py-1 rounded-sm bg-blue-900 text-white text-sm mt-1">
          {props === "pending" ? "Assign" : `${props}`}
        </div>
      </div>
    </div>
  );
};
export default Task;
