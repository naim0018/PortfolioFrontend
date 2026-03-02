import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/features/AuthSlice/authSlice";
import { RootState } from "@/store/store";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300">
      {/* Left Side: Search */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-muted-foreground" />
        </span>
        <input
          type="text"
          placeholder="Search for projects, settings..."
          className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Notifications */}
        <button className="p-2 text-muted-foreground hover:bg-muted rounded-full relative transition-all duration-300 border border-transparent hover:border-border">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="h-6 w-[1px] bg-border mx-1"></div>

        {/* User Profile Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-50 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {user?.email || "User"}
              </p>
              <p className="text-[10px] text-gray-500 uppercase mt-1 text-left">
                {user?.role || "Admin"}
              </p>
            </div>

            <div className="relative">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold border-2 border-gray-100 group-hover:border-gray-300 transition-all uppercase">
                {user?.email?.charAt(0) || "U"}
              </div>
              {/* Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Actual Dropdown Card */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Account
                </p>
              </div>

              <Link
                to="/admin/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline"
              >
                <UserIcon className="w-4 h-4 text-gray-500" />
                Profile Details
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                Account Settings
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/login");
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
