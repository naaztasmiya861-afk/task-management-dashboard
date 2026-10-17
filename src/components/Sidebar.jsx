import { GridIcon, ListIcon, ClockIcon, CheckIcon, CloseIcon } from "./Icons";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: GridIcon },
  { id: "all", label: "All Tasks", icon: ListIcon, count: "total" },
  { id: "progress", label: "In Progress", icon: ClockIcon, count: "progress" },
  { id: "completed", label: "Completed", icon: CheckIcon, count: "completed" },
];

export default function Sidebar({ view, onNavigate, counts, open, onClose }) {
  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Main navigation">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span className="brand-name">Taskboard</span>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav>
          <ul>
            {NAV.map(({ id, label, icon: Icon, count }) => (
              <li key={id}>
                <button
                  className={`nav-item ${view === id ? "active" : ""}`}
                  aria-current={view === id ? "page" : undefined}
                  onClick={() => onNavigate(id)}
                >
                  <Icon />
                  <span>{label}</span>
                  {count && <span className="nav-count">{counts[count]}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="sidebar-foot">Tasks are saved in this browser.</p>
      </aside>
    </>
  );
}
