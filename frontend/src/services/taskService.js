// src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all tasks
export const getAllTasks = () => {
  return apiClient.get("/");
};

// Get a single task by ID
export const getTaskById = (id) => {
  return apiClient.get(`/${id}`);
};

// Create a new task
export const createTask = (taskData) => {
  return apiClient.post("/", taskData);
};

// Update a task
export const updateTask = (id, taskData) => {
  return apiClient.put(`/${id}`, taskData);
};

// Delete a task
export const deleteTask = (id) => {
  return apiClient.delete(`/${id}`);
};

// Reorder tasks
export const reorderTasks = (reorderData) => {
  return apiClient.post("/reorder", reorderData);
};
