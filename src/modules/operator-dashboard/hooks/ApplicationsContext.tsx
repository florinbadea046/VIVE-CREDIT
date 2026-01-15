/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState, useEffect } from "react";
import type { Application, ApplicationStatus } from "../types/Application";
import { mockDB } from "../data/mockDB";

interface ApplicationsContextTypes {
  applications: Application[];
  updateApplicationFields: (id: string, changes: Partial<Application>) => void;
  updateStatus: (id: string, status: ApplicationStatus) => void;
  addNote: (id: string, text: string) => void;
  requestDocuments: (id: string, docs: string[], custom?: string) => void;
  resetToMockData: () => void;
}

const ApplicationsContext = createContext<ApplicationsContextTypes | undefined>(
  undefined
);

export const ApplicationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ✅ Încarcă din localStorage sau folosește mockDB
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('vive-credit-applications');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return mockDB;
  });

  // ✅ Salvează în localStorage la fiecare modificare
  useEffect(() => {
    try {
      localStorage.setItem('vive-credit-applications', JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [applications]);

  // Update multiple fields
  const updateApplicationFields = useCallback(
    (id: string, changes: Partial<Application>) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...changes } : app))
      );
    },
    []
  );

  // Update only status
  const updateStatus = useCallback((id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  }, []);

  // Add note
  const addNote = useCallback((id: string, text: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              notes: [
                ...(app.notes ?? []),
                { text, time: new Date().toISOString() },
              ],
            }
          : app
      )
    );
  }, []);

  // Request documents
  const requestDocuments = useCallback(
    (id: string, docs: string[], custom?: string) => {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                requestedDocuments: [
                  ...(app.requestedDocuments ?? []),
                  ...docs,
                  ...(custom ? [custom] : []),
                ],
                status: "documents_requested",
              }
            : app
        )
      );
    },
    []
  );

  // ✅ Resetează la datele originale din mockDB
  const resetToMockData = useCallback(() => {
    setApplications(mockDB);
    localStorage.removeItem('vive-credit-applications');
  }, []);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        updateApplicationFields,
        updateStatus,
        addNote,
        requestDocuments,
        resetToMockData,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

// custom hook
export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context)
    throw new Error("useApplications must be used within ApplicationsProvider");
  return context;
};