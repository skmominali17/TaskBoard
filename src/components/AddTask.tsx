import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const AddTask = () => {
  const { setModalState } = useContext(ModalContext);
  return (
    <div
      className="w-full lg:w-72 px-6 py-2 bg-blue-600 text-center text-white rounded-md cursor-pointer"
      onClick={() => {
        setModalState({
          type: "add",
          isOpen: true,
        });
      }}
    >
      <button>Add A Task</button>
    </div>
  );
};

export default AddTask;
