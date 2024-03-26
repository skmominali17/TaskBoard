import { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ModalContext } from "../contexts/ModalContext";
import { TaskContext } from "../contexts/TaskContext";

const DeleteTask = () => {
 const { modalState, setModalState } = useContext(ModalContext);
 const { setTasks } = useContext(TaskContext);
 const TaskId = modalState.props;

 const handleDelete = () => {
    // Remove the task with the specified id
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== TaskId));
    // Close the modal
    setModalState({
      type: "",
      isOpen: false,
    });
 };

 return (
    <div className="px-2">
      <div className="w-96 bg-gradient-to-br from-red-200 to-indigo-200">
        <div className="h-16 bg-white flex justify-between items-center px-4">
          <div>
            <h2 className="uppercase text-lg tracking-wide">Delete Task</h2>
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
        <div className="grid grid-cols-1 py-6 px-4">
          <h2 className="capitalize tracking-wide">
            Do you wish to delete task
          </h2>
          <div className="flex items-center justify-between mt-4">
            <div className="font-semibold">Task {TaskId}</div>
            <div className="flex items-center justify-center gap-5">
              <button
                className="w-16 bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="w-16 bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded"
                onClick={() => setModalState({ type: "", isOpen: false })}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default DeleteTask;
