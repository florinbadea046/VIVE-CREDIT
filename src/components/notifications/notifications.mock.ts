import type { Notification } from "./notifications.types";

export const mockNotificationsData: Omit<Notification, "text">[] = [
  {
    id: 1,
    date: "2025-01-10",
    read: false,
    type: "system",
  },
  {
    id: 2,
    date: "2025-01-09",
    read: true,
    type: "document",
  },
];

export const getMockNotifications = (
  t: (key: string) => string
): Notification[] => {
  return [
    {
      id: 1,
      text: t("notifications.mock.applicationApproved"),
      date: "2025-01-10",
      read: false,
      type: "system",
    },
    {
      id: 2,
      text: t("notifications.mock.documentRequested"),
      date: "2025-01-09",
      read: true,
      type: "document",
    },
  ];
};

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
