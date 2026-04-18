import { useState } from "react";
import { Search, LogOut, User, Settings, Moon, Sun, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Api/Apicall";
import { toggleTheme } from "../store/theme";

export function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const themeMode = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.user.user);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm px-2 sm:px-4 transition-colors">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground hidden md:block">NotesApp</span>
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 bg-muted/50 border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm sm:text-base text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-1.5 sm:p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hidden sm:block"
              title="Toggle theme"
            >
              {themeMode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button className="p-1.5 sm:p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hidden sm:block">
              <Bell className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 hover:bg-muted rounded-full sm:rounded-xl transition-all border border-transparent hover:border-border"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full sm:rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {(user?.name || user?.username || "?").charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block text-left mr-1">
                  <p className="text-xs font-bold text-foreground leading-tight truncate max-w-[100px]">{user?.name || user?.username}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Pro Account</p>
                </div>
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-2xl shadow-2xl border border-border py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border mb-1">
                      <p className="text-sm font-bold text-foreground">{user?.name || user?.username}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => { toast.info("Profile feature coming soon"); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Your Profile
                    </button>
                    <button
                      onClick={() => { toast.info("Settings coming soon"); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
