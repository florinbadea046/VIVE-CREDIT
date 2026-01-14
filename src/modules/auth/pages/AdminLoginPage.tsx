import { useAppDispatch } from "@/hooks/reduxHooks";
import { login } from "@/store/authSlice";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAccountMock } from "../mock/adminAccount.mock";

const { email: adminEmail, password: adminPassword } = adminAccountMock;

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(email)) {
      setEmailError("Introdu un email valid.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Parola trebuie să aibă minim 8 caractere.");
      return;
    }

    if (email !== adminEmail || password !== adminPassword) {
      setLoginError("Adresa de email sau parola sunt incorecte.");
    } else {
      dispatch(login("admin"));
      navigate("/admin");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4'>
      <div className='relative bg-white dark:bg-slate-800 p-10 pt-16 rounded-2xl shadow-xl max-w-md w-full'>
        <button
          onClick={() => navigate("/")}
          className='absolute top-4 left-4 bg-white dark:bg-slate-700 shadow-md rounded-full p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600 transition'
        >
          <ArrowLeft className='w-5 h-5 text-slate-600 dark:text-slate-200' />
        </button>

        <h1 className='text-3xl font-bold text-center text-slate-900 dark:text-white mb-2'>
          Autentificare admin
        </h1>

        <div className='flex items-center justify-center gap-2 text-xs text-slate-400 mb-8'>
          <Lock size={14} />
          Conexiune securizată • Datele tale sunt protejate
        </div>
        {loginError && (
          <p className='text-sm text-red-500 mt-1 mb-2'>{loginError}</p>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`w-full rounded-lg border px-4 py-3
                  bg-white dark:bg-slate-900
                  text-slate-900 dark:text-white
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  focus:outline-none focus:ring-2 transition
                  ${
                    emailError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"
                  }`}
            />
            {emailError && (
              <p className='text-sm text-red-500 mt-1'>{emailError}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300'>
              Parolă
            </label>

            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`w-full rounded-lg border px-4 py-3 pr-12
                    bg-white dark:bg-slate-900
                    text-slate-900 dark:text-white
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:outline-none focus:ring-2 transition
                    ${
                      passwordError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"
                    }`}
              />

              <button
                type='button'
                onClick={() => setShowPassword((v) => !v)}
                className='absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 dark:hover:text-white transition'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {passwordError && (
              <p className='text-sm text-red-500 mt-1'>{passwordError}</p>
            )}
          </div>

          <div className='text-right'>
            <button
              type='button'
              onClick={() => navigate("/forgot-password")}
              className='text-sm text-blue-600 hover:underline'
            >
              Ai uitat parola?
            </button>
          </div>

          <button
            type='submit'
            disabled={!email || !password}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg transition'
          >
            Intră
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
