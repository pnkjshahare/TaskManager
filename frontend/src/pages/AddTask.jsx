// src/pages/AddTask.jsx
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../contexts/TaskContext";

const AddTask = () => {
  const { addTask } = useTaskContext();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await addTask(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
        <p className="text-gray-600 mt-1">
          Create a new task with title and description
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TaskForm onSubmit={handleSubmit} />
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          Back to tasks
        </button>
      </div>
    </div>
  );
};

export default AddTask;
