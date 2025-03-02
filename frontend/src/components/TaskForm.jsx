// src/components/TaskForm.jsx
import { useState } from "react";

const TaskForm = ({ task, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    isCompleted: task?.isCompleted || false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input-field ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      {isEditing && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="isCompleted"
            className="ml-2 block text-sm text-gray-700"
          >
            Mark as completed
          </label>
        </div>
      )}

      <div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
