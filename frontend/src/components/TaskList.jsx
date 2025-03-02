// src/components/TaskList.jsx
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import { useTaskContext } from "../contexts/TaskContext";

const TaskList = () => {
  const {
    tasks,
    isLoading,
    error,
    removeTask,
    toggleTaskCompletion,
    handleTaskReorder,
  } = useTaskContext();
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  // Handle drag end event
  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // If the task was dropped in a different position
    if (result.source.index !== result.destination.index) {
      handleTaskReorder(result.source.index, result.destination.index);
    }
  };

  if (isLoading && tasks.length === 0) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No {filter !== "all" ? filter : ""} tasks found.
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div
                className="space-y-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredTasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${snapshot.isDragging ? "opacity-75" : ""}`}
                      >
                        <TaskItem
                          task={task}
                          onDelete={removeTask}
                          onToggleComplete={toggleTaskCompletion}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
