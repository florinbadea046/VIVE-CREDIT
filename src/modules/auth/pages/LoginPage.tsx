import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const goToClientLogin = () => {
    navigate("/login/client");
  };

  const goToOperatorLogin = () => {
    navigate("/login/operator");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="relative bg-white dark:bg-slate-800 p-10 pt-16 rounded-2xl shadow-xl max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 
            bg-white dark:bg-slate-700 
            shadow-md rounded-full p-2.5 
            hover:bg-slate-100 dark:hover:bg-slate-600 
            transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-200" />
        </button>

        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-3">
          Autentificare
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-300 mb-8">
          Alege tipul contului
        </p>

        <button
          onClick={goToClientLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 
            text-white font-semibold py-3 rounded-lg transition"
        >
          Client
        </button>

        <button
          onClick={goToOperatorLogin}
          className="w-full mt-4 border border-slate-300 dark:border-slate-700 
            text-slate-700 dark:text-slate-200 
            hover:bg-slate-100 dark:hover:bg-slate-700 
            font-semibold py-3 rounded-lg transition"
        >
          Operator
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
