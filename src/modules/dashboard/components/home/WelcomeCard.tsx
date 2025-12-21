import CardWrapper from "../../components/CardWrapper";
import { Hand } from "lucide-react";

export default function WelcomeCard({ name }: { name: string }) {
  return (
    <CardWrapper title="Bun venit!" icon={<Hand size={22} />}>
      <div className="space-y-3">
        <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          Salut, {name}! 👋
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Ne bucurăm să te avem înapoi. Aici găsești un rezumat rapid al
          aplicațiilor și creditelor tale active.
        </p>
      </div>
    </CardWrapper>
  );
}
