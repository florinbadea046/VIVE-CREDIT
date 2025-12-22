import { FileText, HelpCircle, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../components/CardWrapper";

export default function QuickActions() {
  const navigate = useNavigate();

  const baseBtn =
    "flex items-center justify-center gap-2 p-3 rounded-lg transition font-medium";

  return (
    <CardWrapper title='Acțiuni rapide' icon={<Rocket size={22} />}>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <button
          onClick={() => navigate("/dashboard/loan-form")}
          className={`${baseBtn} bg-blue-600 hover:bg-blue-700 text-white`}
        >
          <Rocket size={18} />
          Aplică pentru credit
        </button>

        <button
          onClick={() => navigate("/dashboard/documents")}
          className={`${baseBtn} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
        >
          <FileText size={18} />
          Documentele mele
        </button>

        <button
          onClick={() => navigate("/dashboard/help")}
          className={`${baseBtn} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
        >
          <HelpCircle size={18} />
          Ajutor
        </button>
      </div>
    </CardWrapper>
  );
}
