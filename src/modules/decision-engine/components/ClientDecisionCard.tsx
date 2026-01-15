import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ScoringResult } from "../types/decision.types";
import { useNavigate } from "react-router-dom";

interface Props {
  data: ScoringResult;
}

export const ClientDecisionCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const config = {
    approved: {
      icon: (
        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
      ),
      title: "Felicitări! Ești aprobat!",
      color:
        "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
      message: "Poți continua cu aplicația de credit.",
      buttonText: "Aplică pentru credit",
      btnVariant: "default" as const,
    },
    rejected: {
      icon: <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />,
      title: "Ne pare rău",
      color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
      message: "Scorul tău nu îndeplinește criteriile minime.",
      buttonText: "Vezi sugestii de îmbunătățire",
      btnVariant: "destructive" as const,
    },
    pending: {
      icon: (
        <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
      ),
      title: "În așteptare",
      color:
        "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
      message: "Aplicația ta necesită verificare manuală.",
      buttonText: "Contactează suport",
      btnVariant: "outline" as const,
    },
  };

  const { icon, title, color, message, buttonText, btnVariant } =
    config[data.decision];

  return (
    <Card
      className={`w-full max-w-md border-2 shadow-xl transition-colors ${color}`}
    >
      <CardHeader className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-2xl font-bold dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="p-4 bg-white/50 dark:bg-slate-800/40 rounded-lg border border-white dark:border-slate-700">
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 uppercase">
            Scorul tău
          </p>
          <div className="text-5xl font-black dark:text-white">
            {data.score}/100
          </div>
        </div>

        <p className="text-gray-700 dark:text-slate-200 font-medium">
          {message}
        </p>
        <p className="text-sm italic text-gray-500 dark:text-slate-400">
          {data.summary}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full py-6 text-lg font-bold" variant={btnVariant}>
          {buttonText} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          className="w-full text-slate-500 hover:text-slate-800 dark:hover:text-white"
          onClick={() => navigate("/dashboard")}
        >
          Înapoi la Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};
