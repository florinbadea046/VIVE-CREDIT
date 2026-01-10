import type { Application } from "../types/Application";

export const isInCollections = (app: Application): boolean => {
  return (
    app.status === "approved" &&
    ["overdue", "defaulted"].includes(app.collectionsStatus ?? "")
  );
};
