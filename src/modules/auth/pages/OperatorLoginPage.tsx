import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { login } from "@/store/authSlice";

const OperatorLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem("operatorAccount");

    if (!stored) {
      setError("Nu există cont operator.");
      return;
    }

    const { email: savedEmail, password: savedPassword } = JSON.parse(stored);

    if (email !== savedEmail || password !== savedPassword) {
      setError("Email sau parolă incorecte.");
      return;
    }

    dispatch(login("operator"));
    navigate("/operator");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="relative bg-white dark:bg-slate-800 p-10 pt-16 rounded-2xl shadow-xl max-w-md w-full">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 left-4 bg-white dark:bg-slate-700 shadow-md rounded-full p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-200" />
        </button>

        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-6">
          Autentificare operator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Intră
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperatorLoginPage;
