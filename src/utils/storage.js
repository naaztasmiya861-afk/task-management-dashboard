import { STATUSES, PRIORITIES, todayStr } from "./taskUtils";

const KEY = "taskboard.tasks.v1";

function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedTasks() {
  return [
    { id: makeId(), title: "Design landing page hero", description: "Finalize copy and layout for the new hero section.", priority: "High", status: "In Progress", dueDate: offsetDate(2), assignee: "Aisha Khan" },
    { id: makeId(), title: "Fix login redirect bug", description: "Users land on a blank page after signing in.", priority: "High", status: "Todo", dueDate: offsetDate(-2), assignee: "Rahul Verma" },
    { id: makeId(), title: "Write API documentation", description: "", priority: "Medium", status: "Todo", dueDate: offsetDate(7), assignee: "Meera Nair" },
    { id: makeId(), title: "Set up CI pipeline", description: "Run lint and tests on every pull request.", priority: "Medium", status: "Completed", dueDate: offsetDate(-5), assignee: "Rahul Verma" },
    { id: makeId(), title: "Update onboarding emails", description: "Refresh templates with the new brand voice.", priority: "Low", status: "In Progress", dueDate: offsetDate(4), assignee: "Aisha Khan" },
  ];
}

// Returns a clean task, or null if the stored item is unusable
function sanitize(raw) {
  if (!raw || typeof raw !== "object") return null;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) return null;
  const validDate = typeof raw.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate);
  return {
    id: typeof raw.id === "string" && raw.id ? raw.id : makeId(),
    title,
    description: typeof raw.description === "string" ? raw.description : "",
    priority: PRIORITIES.includes(raw.priority) ? raw.priority : "Medium",
    status: STATUSES.includes(raw.status) ? raw.status : "Todo",
    dueDate: validDate ? raw.dueDate : todayStr(),
    assignee: typeof raw.assignee === "string" && raw.assignee.trim() ? raw.assignee.trim() : "Unassigned",
  };
}

export function loadTasks() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === null) return seedTasks(); // first visit
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return seedTasks(); // corrupted shape
    return parsed.map(sanitize).filter(Boolean);
  } catch {
    return seedTasks(); // invalid JSON or storage unavailable
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {
    /* storage full or blocked: app keeps working in memory */
  }
}
