// src/pages/Home.jsx
import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <Link
          to="/add-task"
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus size={14} />
          <span>Add Task</span>
        </Link>
      </div>

      <TaskList />
    </div>
  );
};

export default Home;
