import type { Notification } from "./notifications.types";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    text: "Aplicația ta a fost aprobată!",
    date: "2025-01-10",
    read: false,
    type: "system",
  },
  {
    id: 2,
    text: "Document nou solicitat",
    date: "2025-01-09",
    read: true,
    type: "document",
  },
];
