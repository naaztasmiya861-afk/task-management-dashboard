import { useCallback, useEffect, useState } from "react";
import { loadTasks, saveTasks, makeId } from "../utils/storage";

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((data) => {
    setTasks((prev) => [{ ...data, id: makeId() }, ...prev]);
  }, []);

  const updateTask = useCallback((id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateTask, deleteTask };
}
