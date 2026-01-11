import { type ScoringResult } from "../types/decision.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

interface Props {
  data: ScoringResult;
}

export const ClientDecisionCard = ({ data }: Props) => {
  const config = {
    APPROVED: {
      icon: (
        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
      ),
      title: "Felicitări! Ești aprobat!",
      color:
        "bg-green-50 border-green-500 dark:bg-green-950/20 dark:border-green-600",
      message: "Poți continua cu aplicația de credit.",
      buttonText: "Aplică pentru credit",
      btnVariant: "default" as const,
    },
    REJECTED: {
      icon: <XCircle className="w-12 h-12 text-red-600 dark:text-red-500" />,
      title: "Ne pare rău",
      color: "bg-red-50 border-red-500 dark:bg-red-950/20 dark:border-red-600",
      message: "Scorul tău nu îndeplinește criteriile minime.",
      buttonText: "Vezi sugestii de îmbunătățire",
      btnVariant: "destructive" as const,
    },
    MANUAL_REVIEW: {
      icon: (
        <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
      ),
      title: "În verificare",
      color:
        "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20 dark:border-yellow-600",
      message: "Aplicația ta necesită verificare manuală.",
      buttonText: "Contactează suport",
      btnVariant: "outline" as const,
    },
  };

  const status = data.decision as keyof typeof config;
  const { icon, title, color, message, buttonText, btnVariant } =
    config[status] || config.MANUAL_REVIEW;

  return (
    <Card
      className={`w-full max-w-md border-2 shadow-xl transition-colors ${color}`}
    >
      <CardHeader className="flex flex-col items-center text-center pb-4">
        <div className="mb-4 animate-in zoom-in duration-500">{icon}</div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="p-4 bg-background/60 dark:bg-slate-900/40 rounded-lg border border-border">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Scorul tău obținut
          </p>
          <div className="flex justify-center items-baseline gap-1 mt-1">
            <span className="text-5xl font-black text-foreground">
              {data.score}
            </span>
            <span className="text-xl font-bold text-muted-foreground">
              / 100
            </span>
          </div>
        </div>

        <p className="text-foreground/90 font-medium">{message}</p>

        {data.summary && (
          <p className="text-sm text-muted-foreground italic bg-background/40 dark:bg-slate-900/20 p-3 rounded-md border border-border/50">
            "{data.summary}"
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full py-6 text-lg font-bold group shadow-md"
          variant={btnVariant}
        >
          {buttonText}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
