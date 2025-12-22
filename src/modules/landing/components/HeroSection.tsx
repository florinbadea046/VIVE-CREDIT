import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white dark:bg-slate-900 transition">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Soluții inteligente de creditare{" "}
            <span className="text-blue-600 dark:text-blue-400">
              rapide și sigure
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Proces 100% digital, verificări automate și aprobare rapidă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/onboarding")}
              className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Aplică acum
            </button>

            <button
              onClick={() => navigate("/login?role=operator")}
              className="px-7 py-3 rounded-xl bg-white dark:bg-slate-800 
                         border border-slate-300 dark:border-slate-600
                         text-slate-700 dark:text-slate-300 
                         hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              Autentificare
            </button>
          </div>

          <div className="flex gap-6 pt-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Siguranță garantată
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Proces digital
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              O experiență modernă
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">
              Verificări inteligente, documente electronice și aprobare rapidă.
            </p>

            <div className="mt-8 bg-blue-50 dark:bg-slate-700 rounded-xl p-5 flex items-center gap-4">
              <CreditCard className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-slate-800 dark:text-white font-semibold">
                  Plăți integrate
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Tot într-un singur loc.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-16 left-10 w-60 h-60 bg-blue-200 dark:bg-blue-900 blur-3xl opacity-40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
