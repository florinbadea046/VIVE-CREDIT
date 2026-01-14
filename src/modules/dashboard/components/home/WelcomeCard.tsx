import CardWrapper from "../../components/CardWrapper";
import { Hand } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WelcomeCard({ name }: { name: string }) {
  const { t } = useTranslation("dashboard");

  return (
    <CardWrapper title={t("welcome.title")} icon={<Hand size={22} />}>
      <div className="space-y-3">
        <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          {t("welcome.greeting", { name })} 👋
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          {t("welcome.description")}
        </p>
      </div>
    </CardWrapper>
  );
}
