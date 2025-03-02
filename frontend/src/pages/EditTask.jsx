// src/pages/EditTask.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../contexts/TaskContext";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask } = useTaskContext();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t._id === id);

    if (foundTask) {
      setTask(foundTask);
    } else {
      setError("Task not found");
    }

    setIsLoading(false);
  }, [id, tasks]);

  const handleSubmit = async (formData) => {
    try {
      await editTask(id, formData);
      navigate("/");
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading task...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to tasks
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
        <p className="text-gray-600 mt-1">Update task details</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TaskForm task={task} onSubmit={handleSubmit} isEditing={true} />
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

export default EditTask;
