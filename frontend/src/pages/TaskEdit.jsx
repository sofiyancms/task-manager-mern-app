import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchTaskByIdApi, updateTaskApi } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation(); // Get the location object
  const isAdmin = user?.role === "admin";

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const res = await fetchTaskByIdApi(id);
      const t = res.data;
      const normalizedUserId =
        t.userId && typeof t.userId === "object" ? t.userId._id : t.userId;
      setTask({ ...t, userId: normalizedUserId || "" });
    } catch (err) {
      navigate("/not-found", { replace: true });
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const submit = async (payload) => {
    setError("");
    try {
      await updateTaskApi(id, payload);

      // Redirect to either task list or task details based on the origin
      if (location.state?.from === "taskList") {
        navigate("/tasks", { replace: true }); // Go back to task list
      } else {
        navigate(`/tasks/${id}`, { replace: true }); // Stay on task details
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Update failed");
    }
  };

  if (!task) return null;

  return (
    <div>
      <h3 className="mb-3">Edit Task</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <TaskForm
        initialValues={task}
        isAdmin={isAdmin}
        onSubmit={submit}
        onBack={() =>
          navigate(
            location.state?.from === "taskList" ? "/tasks" : `/tasks/${id}`,
          )
        }
        submitLabel="Save"
      />
    </div>
  );
}
