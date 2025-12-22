import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Introdu un email valid.");
      return;
    }

    // simulăm trimiterea linkului
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
          <Mail className="mx-auto mb-4 text-blue-600" size={40} />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Email trimis!
          </h2>

          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Verifică inbox-ul pentru linkul de resetare a parolei.
          </p>

          <Link
            to="/login"
            className="inline-block text-blue-600 hover:underline font-medium"
          >
            Înapoi la Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="relative bg-white dark:bg-slate-800 p-10 pt-16 rounded-2xl shadow-xl max-w-md w-full">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 left-4 bg-white dark:bg-slate-700 shadow-md rounded-full p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-200" />
        </button>

        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Ai uitat parola?
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-300 mb-8">
          Introdu adresa de email și îți vom trimite un link de resetare.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full rounded-lg border px-4 py-3
                bg-white dark:bg-slate-900
                text-slate-900 dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:outline-none focus:ring-2 transition
                ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"
                }`}
              required
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={!email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg transition"
          >
            Trimite link
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500 dark:text-slate-300">
          Ți-ai amintit parola?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
