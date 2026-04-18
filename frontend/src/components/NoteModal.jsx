import { X, Plus, Tag as TagIcon } from "lucide-react";
import { useState, useEffect } from "react";

export function NoteModal({ isOpen, onClose, onSave, note }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
    setTagInput("");
  }, [note, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave({
        _id: note?._id,
        title: title || "Untitled",
        content: content || "",
        tags: tags,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {note ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="title" className="block text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full px-4 py-2.5 sm:py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base sm:text-lg font-medium text-foreground"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-muted text-blue-600 dark:text-muted-foreground rounded-full text-xs font-medium border border-blue-100 dark:border-border">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-foreground"
                />
                <button
                  onClick={handleAddTag}
                  className="p-2 bg-muted hover:bg-border text-muted-foreground hover:text-foreground rounded-xl transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts..."
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[150px] sm:min-h-[200px] text-sm sm:text-base leading-relaxed text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end bg-muted/30">
          <button
            onClick={onClose}
            className="order-2 sm:order-1 px-6 py-2.5 border border-border text-muted-foreground rounded-xl font-medium hover:bg-card transition-all text-sm sm:text-base active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
            className="order-1 sm:order-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95"
          >
            {note ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
