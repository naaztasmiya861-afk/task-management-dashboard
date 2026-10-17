import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "./Icons";
import { STATUSES, PRIORITIES, todayStr } from "../utils/taskUtils";

const EMPTY = { title: "", description: "", priority: "Medium", status: "Todo", dueDate: "", assignee: "" };

function validate(f) {
  const e = {};
  if (!f.title.trim()) e.title = "Enter a task title.";
  else if (f.title.trim().length > 100) e.title = "Keep the title under 100 characters.";
  if (!f.dueDate) e.dueDate = "Pick a due date.";
  if (!f.assignee.trim()) e.assignee = "Enter who is responsible.";
  return e;
}

export default function TaskModal({ task, onSave, onClose }) {
  const isEdit = Boolean(task);
  const [form, setForm] = useState(task ? { ...EMPTY, ...task } : { ...EMPTY, dueDate: todayStr() });
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
      assignee: form.assignee.trim(),
    });
  };

  return (
    <div className="modal-wrap" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} noValidate role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-head">
          <h2 id="modal-title">{isEdit ? "Edit task" : "New task"}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>

        <div className="modal-body">
          <div className="field">
            <label htmlFor="f-title">Title <span className="req">*</span></label>
            <input id="f-title" ref={titleRef} value={form.title} onChange={set("title")}
              aria-invalid={Boolean(errors.title)} placeholder="e.g. Prepare sprint review" />
            {errors.title && <p className="error" role="alert">{errors.title}</p>}
          </div>

          <div className="field">
            <label htmlFor="f-desc">Description <span className="opt">(optional)</span></label>
            <textarea id="f-desc" rows="3" value={form.description} onChange={set("description")}
              placeholder="Add a few details" />
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="f-prio">Priority</label>
              <select id="f-prio" value={form.priority} onChange={set("priority")}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-status">Status</label>
              <select id="f-status" value={form.status} onChange={set("status")}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-due">Due date <span className="req">*</span></label>
              <input id="f-due" type="date" value={form.dueDate} onChange={set("dueDate")}
                aria-invalid={Boolean(errors.dueDate)} />
              {errors.dueDate && <p className="error" role="alert">{errors.dueDate}</p>}
            </div>
            <div className="field">
              <label htmlFor="f-assignee">Assignee <span className="req">*</span></label>
              <input id="f-assignee" value={form.assignee} onChange={set("assignee")}
                aria-invalid={Boolean(errors.assignee)} placeholder="Full name" />
              {errors.assignee && <p className="error" role="alert">{errors.assignee}</p>}
            </div>
          </div>
        </div>

        <footer className="modal-foot">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{isEdit ? "Save changes" : "Create task"}</button>
        </footer>
      </form>
    </div>
  );
}
