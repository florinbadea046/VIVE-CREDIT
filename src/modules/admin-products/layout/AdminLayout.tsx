import { Outlet, NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Vive Credit — Admin</h2>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/operator"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-sm ${
                    isActive ? "bg-sky-100 font-medium" : "hover:bg-slate-100"
                  }`
                }
              >
                Operator Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/operator/products-settings"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-sm ${
                    isActive ? "bg-sky-100 font-medium" : "hover:bg-slate-100"
                  }`
                }
              >
                Configurări produse
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/operator/risk"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-sm ${
                    isActive ? "bg-sky-100 font-medium" : "hover:bg-slate-100"
                  }`
                }
              >
                Configurări risc
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/audit"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-sm ${
                    isActive ? "bg-sky-100 font-medium" : "hover:bg-slate-100"
                  }`
                }
              >
                Audit Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children ?? <Outlet />}</main>
    </div>
  );
}
