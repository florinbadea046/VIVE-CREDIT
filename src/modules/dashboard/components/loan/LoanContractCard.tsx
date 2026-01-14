import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
import { FileText, ShieldCheck, Info } from "lucide-react";

interface LoanContractCardProps {
  contractUrl: string;
}

export default function LoanContractCard({
  contractUrl,
}: LoanContractCardProps) {
  const { t } = useTranslation("dashboard");

  return (
    <CardWrapper
      title={t("loanContract.title")}
      icon={<FileText size={22} className="text-blue-600 dark:text-blue-300" />}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-green-50 text-green-700 dark:bg-green-500/20 dark:text-green-300">
          <ShieldCheck size={18} className="dark:text-green-300" />
          <span>{t("loanContract.signedAndActive")}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {t("loanContract.description")}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Info size={16} className="dark:text-gray-400" />
          <span>
            {t("loanContract.formatAvailable")}: <b>PDF</b> —{" "}
            {t("loanContract.compatible")}
          </span>
        </div>

        <a
          href={contractUrl}
          download
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl text-sm shadow-md transition-all dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          <FileText size={18} />
          {t("loanContract.downloadButton")}
        </a>
      </div>
    </CardWrapper>
  );
}
