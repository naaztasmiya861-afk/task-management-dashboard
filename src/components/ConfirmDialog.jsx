import { useEffect } from "react";

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="modal-wrap" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal-sm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="modal-body">
          <h2 id="confirm-title">Delete this task?</h2>
          <p className="confirm-text">
            “{task.title}” will be removed permanently. This can’t be undone.
          </p>
        </div>
        <footer className="modal-foot">
          <button className="btn" onClick={onCancel} autoFocus>Keep task</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete task</button>
        </footer>
      </div>
    </div>
  );
}
