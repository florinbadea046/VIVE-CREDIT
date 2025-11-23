import CardWrapper from "./CardWrapper";
import { FileText, ShieldCheck, Info } from "lucide-react";

interface LoanContractCardProps {
  contractUrl: string;
}

export default function LoanContractCard({
  contractUrl,
}: LoanContractCardProps) {
  return (
    <CardWrapper
      title="Contract credit"
      icon={<FileText size={22} className="text-blue-600" />}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
          <ShieldCheck size={18} />
          <span>Contract semnat și activ</span>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Ai acces permanent la contractul de credit, împreună cu toate anexele
          aferente. Recomandăm descărcarea și păstrarea unei copii pentru
          evidență personală și pentru consultări ulterioare.
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Info size={16} />
          <span>
            Format disponibil: <b>PDF</b> — compatibil cu toate dispozitivele.
          </span>
        </div>

        <a
          href={contractUrl}
          download
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition-all text-sm shadow-md"
        >
          <FileText size={18} />
          Descarcă contractul (PDF)
        </a>
      </div>
    </CardWrapper>
  );
}
