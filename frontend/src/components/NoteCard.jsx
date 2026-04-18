import { Pin, MoreVertical, Edit2, Trash2, Tag as TagIcon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pinNote, deleteNote, restoreNote, permanentDeleteNote } from "../Api/Apicall";
import { toast } from "sonner";

export function NoteCard({ note, onEdit, isTrashView }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePin = async (e) => {
    e.stopPropagation();
    try {
      await dispatch(pinNote({ id: note._id })).unwrap();
    } catch (error) {
      toast.error(error.message || "Error pinning note");
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      if (isTrashView) {
        await dispatch(permanentDeleteNote({ id: note._id })).unwrap();
        toast.success("Note deleted permanently");
      } else {
        await dispatch(deleteNote({ id: note._id })).unwrap();
        toast.success("Note moved to trash");
      }
    } catch (error) {
      toast.error(error.message || "Error deleting note");
    }
  };

  const handleRestore = async (e) => {
    e.stopPropagation();
    try {
      await dispatch(restoreNote({ id: note._id })).unwrap();
      toast.success("Note restored successfully");
    } catch (error) {
      toast.error(error.message || "Error restoring note");
    }
  };

  return (
    <div className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer relative flex flex-col h-full min-h-[180px]">

      {/* Top Actions */}
      <div className="absolute top-4 right-4 flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">

        {!isTrashView && (
          <button
            onClick={handlePin}
            className={`p-2 rounded-lg transition-all ${
              note.isPinned
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500"
                : "hover:bg-muted text-muted-foreground"
            }`}
            title={note.isPinned ? "Unpin" : "Pin"}
          >
            <Pin className="h-4 w-4" fill={note.isPinned ? "currentColor" : "none"} />
          </button>
        )}

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-2 hover:bg-muted rounded-lg text-muted-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-40 bg-card rounded-xl shadow-xl border border-border py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                {isTrashView ? (
                  <>
                    <button
                      onClick={handleRestore}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-foreground transition-colors"
                    >
                      <RotateCcw className="h-4 w-4 text-primary" />
                      Restore
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Permanently
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-foreground transition-colors"
                    >
                      <Edit2 className="h-4 w-4 text-primary" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Move to Trash
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div 
        className="flex-1"
        onClick={() => !isTrashView && onEdit(note)}
      >
        <h3 className="font-bold text-foreground mb-2 pr-16 line-clamp-2 text-base sm:text-lg">
          {note.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-4 leading-relaxed whitespace-pre-wrap">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-muted text-blue-600 dark:text-muted-foreground rounded-full text-[10px] font-medium border border-blue-100 dark:border-border"
              >
                <TagIcon className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
          {formatDate(note.createdAt)}
        </p>

        {note.isPinned && !isTrashView && (
          <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            Pinned
          </span>
        )}
      </div>
    </div>
  );
  }