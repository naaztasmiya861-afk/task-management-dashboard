import { SearchIcon } from "./Icons";
import { STATUSES, PRIORITIES, SORT_OPTIONS } from "../utils/taskUtils";

export default function Toolbar({
  search, onSearch, status, onStatus, statusLocked,
  priority, onPriority, sort, onSort, onReset, hasFilters,
}) {
  return (
    <div className="toolbar">
      <label className="search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search by title"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search tasks by title"
        />
      </label>

      {!statusLocked && (
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filter by status">
          <option value="All">All statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      )}

      <select value={priority} onChange={(e) => onPriority(e.target.value)} aria-label="Filter by priority">
        <option value="All">All priorities</option>
        {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
      </select>

      <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort tasks">
        {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {hasFilters && (
        <button className="btn btn-ghost" onClick={onReset}>Clear filters</button>
      )}
    </div>
  );
}
