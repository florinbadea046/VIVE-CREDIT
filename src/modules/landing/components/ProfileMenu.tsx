import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";

import { logout } from "@/store/authSlice";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          px-2 py-1 rounded-full
          bg-blue-600 text-white
          hover:bg-blue-700 transition
          shadow-sm
        "
        aria-label="Account menu"
      >
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
          <User size={18} />
        </div>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-3 w-64
            rounded-2xl overflow-hidden
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-xl z-50
          "
        >
          <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                A
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Client autentificat
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cont activ
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                navigate("/dashboard/home");
                setOpen(false);
              }}
              className="
                w-full flex items-center gap-3
                px-4 py-3 text-sm
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-700
                transition
              "
            >
              <LayoutDashboard size={16} />
              Client Portal
            </button>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="
                w-full flex items-center gap-3
                px-4 py-3 text-sm
                text-red-600
                hover:bg-red-50 dark:hover:bg-red-900/20
                transition
              "
            >
              <LogOut size={16} />
              Deconectare
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
