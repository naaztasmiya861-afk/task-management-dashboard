export const STATUSES = ["Todo", "In Progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];
const PRIORITY_RANK = { Low: 1, Medium: 2, High: 3 };

export const SORT_OPTIONS = [
  { value: "due-asc", label: "Due date: earliest first" },
  { value: "due-desc", label: "Due date: latest first" },
  { value: "priority-desc", label: "Priority: high to low" },
  { value: "priority-asc", label: "Priority: low to high" },
];

// Local date as YYYY-MM-DD (avoids timezone shifts from toISOString)
export function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function isOverdue(task) {
  return task.status !== "Completed" && task.dueDate < todayStr();
}

export function formatDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status !== "Completed").length,
    overdue: tasks.filter(isOverdue).length,
  };
}

export function filterAndSort(tasks, { search, status, priority, sort }) {
  const q = search.trim().toLowerCase();
  const list = tasks.filter(
    (t) =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (status === "All" || t.status === status) &&
      (priority === "All" || t.priority === priority)
  );

  const byDue = (a, b) => a.dueDate.localeCompare(b.dueDate);
  const byPriority = (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];

  return [...list].sort((a, b) => {
    switch (sort) {
      case "due-desc":
        return byDue(b, a) || byPriority(b, a);
      case "priority-desc":
        return byPriority(b, a) || byDue(a, b);
      case "priority-asc":
        return byPriority(a, b) || byDue(a, b);
      default:
        return byDue(a, b) || byPriority(b, a);
    }
  });
}
