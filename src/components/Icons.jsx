const base = {
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round",
  strokeLinejoin: "round", "aria-hidden": true,
};

export const GridIcon = () => (<svg {...base}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>);
export const ListIcon = () => (<svg {...base}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>);
export const ClockIcon = () => (<svg {...base}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
export const CheckIcon = () => (<svg {...base}><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>);
export const PlusIcon = () => (<svg {...base}><path d="M12 5v14M5 12h14"/></svg>);
export const SearchIcon = () => (<svg {...base}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>);
export const EditIcon = () => (<svg {...base}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>);
export const TrashIcon = () => (<svg {...base}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>);
export const MenuIcon = () => (<svg {...base}><path d="M4 6h16M4 12h16M4 18h16"/></svg>);
export const CloseIcon = () => (<svg {...base}><path d="M18 6 6 18M6 6l12 12"/></svg>);
export const AlertIcon = () => (<svg {...base}><path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17h.01"/></svg>);
export const InboxIcon = () => (<svg {...base} width="40" height="40" strokeWidth="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z"/></svg>);
