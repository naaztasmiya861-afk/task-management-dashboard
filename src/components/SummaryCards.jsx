import { ListIcon, CheckIcon, ClockIcon, AlertIcon } from "./Icons";

export default function SummaryCards({ stats }) {
  const cards = [
    { key: "total", label: "Total Tasks", value: stats.total, icon: ListIcon, tone: "blue" },
    { key: "done", label: "Completed Tasks", value: stats.completed, icon: CheckIcon, tone: "green" },
    { key: "pending", label: "Pending Tasks", value: stats.pending, icon: ClockIcon, tone: "amber" },
    { key: "overdue", label: "Overdue Tasks", value: stats.overdue, icon: AlertIcon, tone: "red" },
  ];
  return (
    <section className="cards" aria-label="Task summary">
      {cards.map(({ key, label, value, icon: Icon, tone }) => (
        <div key={key} className={`card card-${tone}`}>
          <span className="card-icon"><Icon /></span>
          <div>
            <p className="card-value">{value}</p>
            <p className="card-label">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
