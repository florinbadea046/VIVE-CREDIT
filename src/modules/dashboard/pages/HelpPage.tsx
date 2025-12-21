import DashboardLayout from "../layout/DashboardLayout";
import { Phone, Mail, FileText, Shield } from "lucide-react";

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Ajutor & Suport
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Suntem aici pentru tine — alege metoda de contact potrivită.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-blue-50/40 dark:bg-[#2A3B55]/30 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Phone size={22} className="text-blue-700 dark:text-blue-300" />
              <h2 className="font-semibold text-blue-900 dark:text-white">
                Suport telefonic
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Program:</span> Luni – Vineri, 09:00
              – 18:00
            </p>

            <p className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
              0312 345 678
            </p>
          </div>

          <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-blue-50/40 dark:bg-[#2A3B55]/30 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail size={22} className="text-blue-700 dark:text-blue-300" />
              <h2 className="font-semibold text-blue-900 dark:text-white">
                Suport prin email
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Pentru întrebări generale sau situații non-urgente:
            </p>

            <p className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
              suport@vivecredit.ro
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
            Informații utile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-white dark:bg-[#1C2A3A]/50 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FileText
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
                <h4 className="font-semibold text-blue-900 dark:text-white">
                  Documente necesare
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                • Act de identitate
                <br />• Adeverință de venit / extras bancar
                <br />• Alte documente pot fi solicitate în funcție de analiză
              </p>
            </div>

            <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-white dark:bg-[#1C2A3A]/50 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Shield
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
                <h4 className="font-semibold text-blue-900 dark:text-white">
                  Securitatea datelor
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Datele tale sunt criptate și protejate conform legislației
                privind protecția datelor cu caracter personal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
