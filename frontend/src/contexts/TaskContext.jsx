// src/contexts/TaskContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../services/taskService";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTasks();
      // Sort tasks by position if it exists, otherwise use the default order
      const sortedTasks = response.data.sort((a, b) =>
        a.position !== undefined && b.position !== undefined
          ? a.position - b.position
          : 0
      );
      setTasks(sortedTasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setIsLoading(true);
    try {
      // Set position to be at the end of the list
      const newTaskData = {
        ...taskData,
        position: tasks.length,
      };
      const response = await createTask(newTaskData);
      setTasks([...tasks, response.data]);
      return response.data;
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (id, taskData) => {
    setIsLoading(true);
    try {
      const response = await updateTask(id, taskData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      return response.data;
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (id) => {
    setIsLoading(true);
    try {
      await deleteTask(id);
      // Get the tasks that remain after deletion
      const remainingTasks = tasks.filter((task) => task._id !== id);
      // Update the positions of the remaining tasks
      const updatedTasks = remainingTasks.map((task, index) => ({
        ...task,
        position: index,
      }));
      setTasks(updatedTasks);

      // Optional: Update positions in the backend
      const reorderData = updatedTasks.map((task) => ({
        id: task._id,
        position: task.position,
      }));
      await reorderTasks(reorderData);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskCompletion = async (id, isCompleted) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      if (taskToUpdate) {
        await editTask(id, { ...taskToUpdate, isCompleted: !isCompleted });
      }
    } catch (err) {
      setError("Failed to update task status");
      console.error(err);
    }
  };

  // New function to handle task reordering
  const handleTaskReorder = async (sourceIndex, destinationIndex) => {
    setIsLoading(true);
    try {
      // Create a copy of the tasks array
      const reorderedTasks = [...tasks];

      // Remove the task from the source position and insert at destination
      const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, movedTask);

      // Update the position property for each task
      const updatedTasks = reorderedTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      // Update state
      setTasks(updatedTasks);

      // Prepare data for backend update
      const reorderData = updatedTasks.map((task) => ({
        id: task._id,
        position: task.position,
      }));

      // Send the reordered tasks to the backend
      await reorderTasks(reorderData);
    } catch (err) {
      setError("Failed to reorder tasks");
      console.error(err);

      // Revert to original state on error
      fetchTasks();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    toggleTaskCompletion,
    handleTaskReorder,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
