import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, Check, Trash2 } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { mockNotifications } from "./notifications.mock";
import type { Notification } from "./notifications.types";

const STORAGE_KEY = "client_notifications";
const UPDATE_EVENT = "notifications-updated";
const SYNC_EVENT = "notifications-sync";

const isToday = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

const isYesterday = (date: string) => {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockNotifications;
  });

  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.filter((n) => n.read).length;

  const syncFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setNotifications(stored ? JSON.parse(stored) : []);
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotifications(updated);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  const markOneRead = (id: number) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotifications(updated);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  const deleteRead = () => {
    const updated = notifications.filter((n) => !n.read);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotifications(updated);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  const deleteOne = (id: number) => {
    const updated = notifications.filter((n) => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotifications(updated);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  useEffect(() => {
    const handleSync = () => syncFromStorage();
    window.addEventListener(UPDATE_EVENT, handleSync);
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => {
      window.removeEventListener(UPDATE_EVENT, handleSync);
      window.removeEventListener(SYNC_EVENT, handleSync);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sorted = [...notifications].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const today = sorted.filter((n) => isToday(n.date));
  const yesterday = sorted.filter((n) => isYesterday(n.date));
  const older = sorted.filter((n) => !isToday(n.date) && !isYesterday(n.date));

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: Notification[];
  }) =>
    items.length > 0 ? (
      <>
        <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          {title}
        </div>

        {items.map((n) => (
          <div key={n.id} className="group relative">
            <NotificationItem
              text={n.text}
              date={n.date}
              read={n.read}
              type={n.type}
              onClick={() => markOneRead(n.id)}
            />

            <button
              onClick={() => deleteOne(n.id)}
              className="
                absolute top-3 right-3
                opacity-0 group-hover:opacity-100
                transition
                text-gray-400 hover:text-red-500
              "
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </>
    ) : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative p-3 rounded-full
          bg-gray-100 dark:bg-gray-700
          hover:bg-gray-200 dark:hover:bg-gray-600
          shadow-sm transition
        "
      >
        <Bell size={20} className="text-gray-700 dark:text-gray-200" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed md:absolute top-16 md:top-auto left-4 right-4 md:left-full md:ml-3 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <Bell size={16} />
              Notificări
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Check size={14} />
                  Marchează citite
                </button>
              )}

              {readCount > 0 && (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="
                    p-1 rounded-md
                    text-gray-400
                    hover:text-red-500
                    hover:bg-red-50 dark:hover:bg-red-900/30
                    transition
                  "
                  title="Șterge notificările citite"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {sorted.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Nu ai notificări.
              </div>
            ) : (
              <>
                <Section title="Astăzi" items={today} />
                <Section title="Ieri" items={yesterday} />
                <Section title="Mai vechi" items={older} />
              </>
            )}
          </div>
        </div>
      )}

      {confirmDelete &&
        createPortal(
          <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-5">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Ștergi notificările citite?
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                Această acțiune nu poate fi anulată.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Renunță
                </button>

                <button
                  onClick={() => {
                    deleteRead();
                    setConfirmDelete(false);
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Șterge
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
