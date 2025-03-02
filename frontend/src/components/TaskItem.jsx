// src/components/TaskItem.jsx
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaRegCircle,
  FaGripVertical,
} from "react-icons/fa";

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const { _id, title, description, isCompleted } = task;

  return (
    <div
      className={`border p-4 rounded-lg shadow-sm ${
        isCompleted ? "bg-green-50" : "bg-white"
      } transition-colors duration-200`}
    >
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="text-gray-400 mr-3 cursor-move">
            <FaGripVertical size={20} />
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-1 text-gray-600 ${
                isCompleted ? "text-gray-400" : ""
              }`}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 items-start">
          <button
            onClick={() => onToggleComplete(_id, isCompleted)}
            className={`p-2 rounded-full ${
              isCompleted ? "text-green-600" : "text-gray-400"
            } hover:bg-gray-100`}
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isCompleted ? (
              <FaCheckCircle size={18} />
            ) : (
              <FaRegCircle size={18} />
            )}
          </button>

          <Link
            to={`/edit-task/${_id}`}
            className="p-2 text-blue-600 hover:bg-gray-100 rounded-full"
            aria-label="Edit task"
          >
            <FaEdit size={18} />
          </Link>

          <button
            onClick={() => onDelete(_id)}
            className="p-2 text-red-600 hover:bg-gray-100 rounded-full"
            aria-label="Delete task"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
