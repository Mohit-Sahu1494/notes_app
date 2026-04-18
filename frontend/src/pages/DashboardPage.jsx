import { useState, useEffect } from "react";
import { Plus, FileText, Menu, X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { NoteModal } from "../components/NoteModal";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { createNote, updateNote, fetchNotes, fetchTrashNotes } from "../Api/Apicall";

export function DashboardPage() {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const notes = useSelector((state) => state.notes.notes) || [];
  const trashNotes = useSelector((state) => state.notes.trashNotes) || [];

  useEffect(() => {
    if (activeView === "trash") {
      dispatch(fetchTrashNotes());
    } else {
      dispatch(fetchNotes());
    }
  }, [activeView, dispatch]);

  const handleSaveNote = async (noteData) => {
    try {
      if (noteData._id) {
        const res = await dispatch(updateNote({ id: noteData._id, ...noteData })).unwrap();
        if (res.sucess) toast.success("Note updated successfully");
      } else {
        const res = await dispatch(createNote(noteData)).unwrap();
        if (res.sucess) toast.success("Note created successfully");
      }
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      toast.error(error.message || "Failed to save note");
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const displayNotes = activeView === "trash" ? trashNotes : notes;

  const filteredNotes = displayNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeView === "pinned") {
      return matchesSearch && note.isPinned;
    }

    return matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.isPinned);

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden transition-colors">
      <Navbar onSearch={setSearchQuery} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed top-16 inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed top-16 bottom-0 left-0 z-40 w-64 bg-card transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-y-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <Sidebar 
            activeView={activeView} 
            onViewChange={(view) => {
              setActiveView(view);
              setIsSidebarOpen(false);
            }} 
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {searchQuery ? "No notes found" : activeView === "trash" ? "Trash is empty" : "No notes yet"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base">
                {searchQuery
                  ? "Try adjusting your search terms or create a new note"
                  : activeView === "trash" 
                    ? "Deleted notes will appear here"
                    : "Start organizing your thoughts by creating your first note"}
              </p>
              {!searchQuery && activeView !== "trash" && (
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setIsModalOpen(true);
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First Note
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {activeView !== "trash" && pinnedNotes.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                    Pinned Notes ({pinnedNotes.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {pinnedNotes.map((note) => (
                      <NoteCard
                        key={note._id}
                        note={note}
                        onEdit={handleEditNote}
                      />
                    ))}
                  </div>
                </div>
              )}

              {(activeView === "trash" ? filteredNotes : unpinnedNotes).length > 0 && (
                <div>
                  {activeView !== "trash" && pinnedNotes.length > 0 && (
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                      Other Notes ({unpinnedNotes.length})
                    </h2>
                  )}
                  {activeView === "trash" && (
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                      Trash ({filteredNotes.length})
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {(activeView === "trash" ? filteredNotes : unpinnedNotes).map((note) => (
                      <NoteCard
                        key={note._id}
                        note={note}
                        onEdit={handleEditNote}
                        isTrashView={activeView === "trash"}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {activeView !== "trash" && (
        <button
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center group z-30"
          title="Add new note"
        >
          <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
        </button>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
}
