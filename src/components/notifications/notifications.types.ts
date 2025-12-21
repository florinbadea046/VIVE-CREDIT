export type NotificationType = "payment" | "document" | "system";

export type Notification = {
  id: number;
  text: string;
  date: string;
  read: boolean;
  type: NotificationType;
};
