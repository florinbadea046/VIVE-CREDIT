import { useEffect, useState, type ReactNode } from "react";
import {
  Home,
  FileText,
  CreditCard,
  Clock,
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import UserBadge from "@/components/UserBadge";
import NotificationBell from "@/components/notifications/NotificationBell";
import Toast from "@/components/notifications/Toast";
import type { Notification } from "@/components/notifications/notifications.types";

const EVENT_NAME = "notifications-updated";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);
  const { theme, toggleTheme } = useTheme();

  const linkClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium";

  useEffect(() => {
    const handleNewNotification = (e: Event) => {
      const customEvent = e as CustomEvent<Notification>;
      setToast(customEvent.detail);
    };

    window.addEventListener(EVENT_NAME, handleNewNotification);
    return () => window.removeEventListener(EVENT_NAME, handleNewNotification);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {toast && (
        <Toast
          message={toast.text}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-sm z-30 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          VIVE CREDIT
        </h2>

        <div className="flex items-center gap-3">
          <NotificationBell />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          >
            {theme === "light" ? (
              <Sun size={22} className="text-blue-600" />
            ) : (
              <Moon size={22} className="text-blue-300" />
            )}
          </button>

          <button onClick={() => setOpen(true)}>
            <Menu size={28} className="text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 top-0 left-0 w-64 h-screen
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          p-6 flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-6 flex items-center gap-2"
        >
          <X size={26} className="text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">Închide</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 hidden md:block">
            VIVE CREDIT
          </h2>

          <div className="flex items-center gap-2">
            <NotificationBell />

            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition shadow-sm"
            >
              {theme === "light" ? (
                <Sun size={20} className="text-blue-500" />
              ) : (
                <Moon size={20} className="text-blue-300" />
              )}
            </button>
          </div>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto pb-20">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <Home size={20} /> Acasă
          </NavLink>

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/loan"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <CreditCard size={20} /> Împrumutul meu
          </NavLink>

          <NavLink
            to="/dashboard/payments"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <Clock size={20} /> Istoric plăți
          </NavLink>

          <NavLink
            to="/dashboard/documents"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <FileText size={20} /> Documente
          </NavLink>

          <NavLink
            to="/dashboard/help"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <HelpCircle size={20} /> Ajutor
          </NavLink>
        </nav>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700">
          <UserBadge />
        </div>
      </aside>

      <main className="flex-1 p-8 pt-24 md:pt-8 dark:bg-gray-900 dark:text-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
