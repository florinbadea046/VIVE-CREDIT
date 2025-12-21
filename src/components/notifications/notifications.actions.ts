import type { Notification } from "./notifications.types";

const STORAGE_KEY = "client_notifications";
const UPDATE_EVENT = "notifications-updated";
const SYNC_EVENT = "notifications-sync";

export function addNotification(notification: Omit<Notification, "id">) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const existing: Notification[] = stored ? JSON.parse(stored) : [];

  const newNotification: Notification = {
    id: Date.now(),
    ...notification,
  };

  const updated = [newNotification, ...existing];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  window.dispatchEvent(
    new CustomEvent(UPDATE_EVENT, { detail: newNotification })
  );

  window.dispatchEvent(new Event(SYNC_EVENT));
}
