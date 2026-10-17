import { useCallback, useMemo, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { filterAndSort, getStats } from "./utils/taskUtils";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Toasts from "./components/Toasts";
import { MenuIcon, PlusIcon } from "./components/Icons";

const VIEWS = {
  dashboard: { title: "Dashboard", sub: "Your team’s work at a glance.", status: null },
  all: { title: "All Tasks", sub: "Every task, in one place.", status: null },
  progress: { title: "In Progress", sub: "Tasks being worked on right now.", status: "In Progress" },
  completed: { title: "Completed", sub: "Finished work.", status: "Completed" },
};

export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [view, setView] = useState("dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("due-asc");
  const [modal, setModal] = useState(null); // { task } | null
  const [toDelete, setToDelete] = useState(null);
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const lockedStatus = VIEWS[view].status;
  const activeStatus = lockedStatus ?? statusFilter;

  const stats = useMemo(() => getStats(tasks), [tasks]);
  const counts = useMemo(
    () => ({
      total: tasks.length,
      progress: tasks.filter((t) => t.status === "In Progress").length,
      completed: stats.completed,
    }),
    [tasks, stats.completed]
  );
  const visible = useMemo(
    () => filterAndSort(tasks, { search, status: activeStatus, priority, sort }),
    [tasks, search, activeStatus, priority, sort]
  );

  const hasFilters = search.trim() !== "" || priority !== "All" || (!lockedStatus && statusFilter !== "All");
  const resetFilters = () => {
    setSearch("");
    setPriority("All");
    setStatusFilter("All");
  };

  const navigate = (id) => {
    setView(id);
    setNavOpen(false);
  };

  const handleSave = (data) => {
    if (modal.task) {
      updateTask(modal.task.id, data);
      toast("Task updated");
    } else {
      addTask(data);
      toast("Task created");
    }
    setModal(null);
  };

  const handleStatusChange = (task, status) => {
    updateTask(task.id, { status });
    toast(`Marked “${task.title}” as ${status}`);
  };

  const confirmDelete = () => {
    deleteTask(toDelete.id);
    setToDelete(null);
    toast("Task deleted");
  };

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <div className="app">
      <Sidebar view={view} onNavigate={navigate} counts={counts} open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
          <div className="page-title">
            <h1>{VIEWS[view].title}</h1>
            <p>{VIEWS[view].sub}</p>
          </div>
          <button className="btn btn-primary" onClick={() => setModal({ task: null })}>
            <PlusIcon /> <span>New task</span>
          </button>
        </header>

        <main className="content">
          <SummaryCards stats={stats} />

          <section className="panel">
            <Toolbar
              search={search} onSearch={setSearch}
              status={activeStatus} onStatus={setStatusFilter} statusLocked={Boolean(lockedStatus)}
              priority={priority} onPriority={setPriority}
              sort={sort} onSort={setSort}
              onReset={resetFilters} hasFilters={hasFilters}
            />
            <p className="result-count">
              Showing {visible.length} of {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </p>
            <TaskList
              tasks={visible}
              totalCount={tasks.length}
              onEdit={(task) => setModal({ task })}
              onDelete={setToDelete}
              onStatusChange={handleStatusChange}
              onCreate={() => setModal({ task: null })}
              onReset={resetFilters}
            />
          </section>
        </main>
      </div>

      {modal && <TaskModal task={modal.task} onSave={handleSave} onClose={closeModal} />}
      {toDelete && <ConfirmDialog task={toDelete} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
      <Toasts toasts={toasts} />
    </div>
  );
}
