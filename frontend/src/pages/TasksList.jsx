import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasksApi, deleteTaskApi } from "../api/taskApi";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";

export default function TasksList() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  // State for managing filters, tasks, and pagination metadata
  const [query, setQuery] = useState({
    page: 1,
    limit: 9,
    status: "",
    priority: "",
    userId: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState(null); // To store pagination metadata (total pages, etc.)
  const [error, setError] = useState(""); // For any errors

  // Function to load tasks with filters and pagination
  const load = async () => {
    setError(""); // Reset error state
    try {
      const params = {
        page: query.page,
        limit: query.limit,
        status: query.status || undefined,
        priority: query.priority || undefined,
        sortBy: query.sortBy,
        order: query.order,
        ...(isAdmin && query.userId ? { userId: query.userId } : {}),
      };

      // Fetch tasks from the API
      const res = await fetchTasksApi(params);
      setTasks(res.data || []);
      setMeta(res.meta || null); // Store pagination info (meta)
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load tasks",
      );
    }
  };

  // Load tasks whenever page changes (pagination)
  useEffect(() => {
    load();
  }, [query.page]);

  // Apply filters and reset to first page
  const applyFilters = () => {
    setQuery((p) => ({ ...p, page: 1 })); // Reset to page 1 on filter change
    load(); // Explicitly call load to fetch data after filter change
  };

  // Reset filters to default values
  const resetFilters = () => {
    const next = {
      page: 1,
      limit: 9,
      status: "",
      priority: "",
      userId: "",
      sortBy: "createdAt",
      order: "desc",
    };
    setQuery(next);
    setTimeout(() => load(), 0); // Reset filters and immediately load tasks
  };

  // Handle task deletion
  const onDelete = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await deleteTaskApi(id); // Call API to delete task
      load(); // Reload tasks after deletion
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="mb-0">Tasks</h3>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/tasks/create")}
        >
          {isAdmin ? "Create / Assign Task" : "Create Task"}
        </button>
      </div>

      {/* Task filters */}
      <TaskFilters
        isAdmin={isAdmin}
        value={query}
        onChange={setQuery}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Render tasks as cards */}
      <div className="row g-3">
        {tasks.map((t) => (
          <div className="col-12 col-md-6 col-lg-4" key={t._id}>
            <TaskCard
              task={t}
              onView={() =>
                navigate(`/tasks/${t._id}`, { state: { from: "taskList" } })
              }
              onEdit={() =>
                navigate(`/tasks/${t._id}/edit`, {
                  state: { from: "taskList" },
                })
              }
              onDelete={() => onDelete(t._id)} // Delete task on click
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        meta={meta}
        onPageChange={(newPage) => setQuery((p) => ({ ...p, page: newPage }))}
      />
    </div>
  );
}
