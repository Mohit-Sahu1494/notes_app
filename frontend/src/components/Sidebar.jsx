import { FileText, Pin, Trash2, Tag } from "lucide-react";
import { useSelector } from "react-redux";

export function Sidebar({ activeView, onViewChange }) {
  const notes = useSelector((state) => state.notes.notes) || [];
  const trashNotes = useSelector((state) => state.notes.trashNotes) || [];
  
  const pinnedCount = notes.filter(n => n.isPinned).length;

  const menuItems = [
    { id: "all", label: "All Notes", icon: FileText, count: notes.length },
    { id: "pinned", label: "Pinned", icon: Pin, count: pinnedCount },
    { id: "trash", label: "Trash", icon: Trash2, count: trashNotes.length },
  ];

  return (
    <aside className="w-full lg:w-64 bg-card border-r border-border h-full overflow-y-auto transition-colors">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-primary dark:to-primary text-blue-700 dark:text-primary-foreground shadow-sm"
                  : "text-gray-700 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-muted hover:text-blue-700 dark:hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-blue-600 dark:text-primary-foreground" : "text-gray-500 dark:text-muted-foreground"}`} />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </div>
              <span
                className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                  isActive
                    ? "bg-blue-100 dark:bg-primary-foreground/20 text-blue-700 dark:text-primary-foreground"
                    : "bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground"
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-border mt-4">
        <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Quick Access
        </h3>
        <div className="flex flex-wrap gap-2 px-2">
          {["Work", "Personal", "Ideas"].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-muted/50 hover:bg-gray-200 dark:hover:bg-muted text-gray-700 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground rounded-full transition-colors border border-transparent dark:border-border"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 lg:hidden">
        <p className="text-[10px] text-center text-gray-400">Notes App v1.0</p>
      </div>
    </aside>
  );
}
