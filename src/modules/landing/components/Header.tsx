import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

import ThemeToggle from "@/components/ThemeToggle";
import ProfileMenu from "@/modules/landing/components/ProfileMenu";
import type { RootState } from "@/store";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const linkBase =
    "transition font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400";

  return (
    <header
      className="
        w-full sticky top-0 z-50
        backdrop-blur-xl bg-white/70 dark:bg-slate-900/60
        border-b border-white/30 dark:border-slate-700/40
        shadow-[0_2px_15px_rgba(0,0,0,0.06)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow">
            V
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
            VIVE{" "}
            <span className="text-blue-600 dark:text-blue-400">CREDIT</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { to: "/", label: "Acasă" },
            { to: "/products", label: "Produse" },
            { to: "/about", label: "Despre noi" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1"
                    : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Conectare
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated && <ProfileMenu />}

          <button
            onClick={() => setOpen(!open)}
            className="text-slate-700 dark:text-slate-300"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-t border-white/30 dark:border-slate-700/40 px-6 py-6 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {[
              { to: "/", label: "Acasă" },
              { to: "/products", label: "Produse" },
              { to: "/about", label: "Despre noi" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  text-lg px-4 py-3 rounded-lg font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/40"
                  }
                `
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {!isAuthenticated && (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="w-full mt-6 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Conectare
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
