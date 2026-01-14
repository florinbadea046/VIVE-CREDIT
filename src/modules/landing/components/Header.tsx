import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ThemeToggle from "@/components/ThemeToggle";
import ProfileMenu from "@/modules/landing/components/ProfileMenu";
import type { RootState } from "@/store";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("landing");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const changeLanguage = (lng: "ro" | "en") => i18n.changeLanguage(lng);

  const linkBase =
    "transition font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400";

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border-b border-white/30 dark:border-slate-700/40 shadow-[0_2px_15px_rgba(0,0,0,0.06)]">
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
            {navLinks.map(({ to, label }) => (
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
            <div className="flex items-center gap-2 text-sm font-medium">
              {(["ro", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={
                    i18n.language === lng
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400"
                  }
                >
                  {lng.toUpperCase()}
                </button>
              ))}
              <span className="opacity-50">|</span>
            </div>

            <ThemeToggle />

            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                {t("nav.login")}
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated && <ProfileMenu />}

            <button
              onClick={() => setLangOpen(true)}
              className="text-slate-700 dark:text-slate-300"
            >
              <Globe size={22} />
            </button>

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
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-lg px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/40"
                    }`
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
                {t("nav.login")}
              </button>
            )}
          </div>
        )}
      </header>

      {langOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-end"
          onClick={() => setLangOpen(false)}
        >
          <div
            className="w-full bg-white dark:bg-slate-900 rounded-t-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold mb-4">
              {t("language", { ns: "common" })}
            </p>

            {(["ro", "en"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => {
                  changeLanguage(lng);
                  setLangOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  i18n.language === lng
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
