import { LogOut, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/store/authSlice";
import { clearUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserBadge() {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const role = useAppSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-sm">
      <div className="flex items-center gap-3">
        <User className="w-9 h-9 text-blue-600 dark:text-blue-300" />
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {user.name || t("userBadge.defaultName")}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {role}
          </p>
        </div>
      </div>

      <button onClick={handleLogout}>
        <LogOut className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer" />
      </button>
    </div>
  );
}
