import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { login } from "@/store/authSlice";
import { useTranslation } from "react-i18next";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ClientRegisterPage = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return {
        label: t("clientRegister.passwordStrength.weak"),
        color: "bg-red-500",
        width: "w-1/4",
      };
    if (score === 2)
      return {
        label: t("clientRegister.passwordStrength.medium"),
        color: "bg-yellow-500",
        width: "w-2/4",
      };
    return {
      label: t("clientRegister.passwordStrength.strong"),
      color: "bg-green-500",
      width: "w-full",
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError(t("clientRegister.errors.invalidEmail"));
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError(t("clientRegister.errors.passwordLength"));
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!passwordsMatch) {
      valid = false;
    }

    if (!valid) return;

    const existingAccountRaw = localStorage.getItem("clientAccount");

    if (existingAccountRaw) {
      try {
        const existing = JSON.parse(existingAccountRaw) as { email?: string };
        if (existing?.email?.toLowerCase() === email.toLowerCase()) {
          setEmailError(t("clientRegister.errors.accountExists"));
          return;
        }
      } catch {
        return;
      }
    }

    localStorage.setItem("clientAccount", JSON.stringify({ email, password }));

    dispatch(login("client"));
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="relative bg-white dark:bg-slate-800 p-10 pt-16 rounded-2xl shadow-xl max-w-md w-full">
        <button
          onClick={() => navigate("/login/client")}
          className="absolute top-4 left-4 bg-white dark:bg-slate-700 shadow-md rounded-full p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-200" />
        </button>

        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
          {t("clientRegister.title")}
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-300 mb-2">
          {t("clientRegister.subtitle")}
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
          <Lock size={14} />
          {t("clientRegister.securityNote")}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              {t("clientRegister.form.emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border px-4 py-3
                bg-white dark:bg-slate-900
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 transition
                ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"
                }`}
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              {t("clientRegister.form.passwordLabel")}
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-3 pr-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {password && (
              <div className="mt-2">
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} ${strength.width} transition-all`}
                  />
                </div>
                <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                  {t("clientRegister.passwordStrengthLabel")}:{" "}
                  <span className="font-medium">{strength.label}</span>
                </p>
              </div>
            )}

            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              {t("clientRegister.form.confirmPasswordLabel")}
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-3 pr-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {passwordsMatch && (
              <p className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <CheckCircle size={16} /> {t("clientRegister.passwordMatch")}
              </p>
            )}

            {passwordsMismatch && (
              <p className="flex items-center gap-1 text-sm text-red-500 mt-1">
                <XCircle size={16} /> {t("clientRegister.passwordMismatch")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              !email || !password || !confirmPassword || !passwordsMatch
            }
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg transition"
          >
            {t("clientRegister.form.submitButton")}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500 dark:text-slate-300">
          {t("clientRegister.haveAccount")}{" "}
          <button
            onClick={() => navigate("/login/client")}
            className="text-blue-600 hover:underline"
          >
            {t("clientRegister.loginLink")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ClientRegisterPage;
