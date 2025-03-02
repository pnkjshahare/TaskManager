// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
