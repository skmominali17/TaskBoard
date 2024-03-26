import { FaUser } from "react-icons/fa";

const Heading = () => {
  return (
    <div className="h-20 w-full  flex items-center justify-between p-2 text-2xl font-medium">
      <div>
        <h1>Task Board</h1>
      </div>
      <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center">
        <FaUser />
      </div>
    </div>
  );
};

export default Heading;
