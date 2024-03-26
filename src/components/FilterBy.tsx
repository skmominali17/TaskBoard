import { useContext } from "react";
import { assignees } from "../data/AssigneeData";
import { FilterContext } from "../contexts/FilterContext";

const FilterBy = () => {
  const { filterState, setFilterState } = useContext(FilterContext);

  return (
    <div className="h-32 w-full py-4 px-2 flex flex-col sm:flex-row sm:gap-6 sm:h-16">
      <h2 className="text-lg mb-4">Filter By:</h2>
      <div className="grid grid-cols-3 gap-4 sm:w-3/5">
        <div>
          <select
            name="assignee"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) =>
              setFilterState({ ...filterState, assignee: e.target.value })
            }
          >
            <option value="null">
              Assignee Name
            </option>
            {assignees.map((assignee, index) => (
              <option key={index} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="priority"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) =>
              setFilterState({ ...filterState, priority: e.target.value })
            }
          >
            <option value="null">Priority</option>
            <option value="0">P0</option>
            <option value="1">P1</option>
            <option value="2">P2</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            className="w-full text-xs p-2 border bg-gray-100 border-gray-300 rounded-md"
            onChange={(e) =>
              setFilterState({ ...filterState, date: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBy;
