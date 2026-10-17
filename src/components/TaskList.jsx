import { EditIcon, TrashIcon, InboxIcon, PlusIcon } from "./Icons";
import { STATUSES, formatDate, isOverdue } from "../utils/taskUtils";

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

export default function TaskList({ tasks, totalCount, onEdit, onDelete, onStatusChange, onCreate, onReset }) {
  if (tasks.length === 0) {
    const noTasksAtAll = totalCount === 0;
    return (
      <div className="empty">
        <InboxIcon />
        <h3>{noTasksAtAll ? "No tasks yet" : "No tasks match your filters"}</h3>
        <p>
          {noTasksAtAll
            ? "Create your first task to start tracking work."
            : "Try a different search term or clear the filters."}
        </p>
        {noTasksAtAll ? (
          <button className="btn btn-primary" onClick={onCreate}><PlusIcon /> New task</button>
        ) : (
          <button className="btn" onClick={onReset}>Clear filters</button>
        )}
      </div>
    );
  }

  return (
    <div className="tasks" role="list">
      <div className="row row-head" aria-hidden="true">
        <span>Task</span><span>Priority</span><span>Status</span><span>Due date</span><span>Assignee</span><span />
      </div>
      {tasks.map((t) => {
        const overdue = isOverdue(t);
        return (
          <div className={`row ${t.status === "Completed" ? "is-done" : ""}`} role="listitem" key={t.id}>
            <div className="cell cell-title">
              <p className="task-title">{t.title}</p>
              {t.description && <p className="task-desc">{t.description}</p>}
            </div>

            <div className="cell" data-label="Priority">
              <span className={`pill prio prio-${slug(t.priority)}`}>{t.priority}</span>
            </div>

            <div className="cell" data-label="Status">
              <select
                className={`status-select st-${slug(t.status)}`}
                value={t.status}
                onChange={(e) => onStatusChange(t, e.target.value)}
                aria-label={`Status for ${t.title}`}
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="cell" data-label="Due">
              <span className={overdue ? "due overdue" : "due"}>
                {formatDate(t.dueDate)}
                {overdue && <em>Overdue</em>}
              </span>
            </div>

            <div className="cell cell-assignee" data-label="Assignee">
              <span className="avatar">{initials(t.assignee)}</span>
              <span className="assignee-name">{t.assignee}</span>
            </div>

            <div className="cell cell-actions">
              <button className="icon-btn" onClick={() => onEdit(t)} aria-label={`Edit ${t.title}`}><EditIcon /></button>
              <button className="icon-btn danger" onClick={() => onDelete(t)} aria-label={`Delete ${t.title}`}><TrashIcon /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
