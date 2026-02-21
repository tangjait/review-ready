import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FairnessScoreProps {
  score: number;
}

export function FairnessScore({ score }: FairnessScoreProps) {
  const color = score >= 90 ? "text-success" : score >= 70 ? "text-primary" : "text-destructive";
  const bgColor = score >= 90 ? "stroke-success" : score >= 70 ? "stroke-primary" : "stroke-destructive";
  const label = score >= 90 ? "Specific, actionable language" : score >= 70 ? "Consider adding concrete examples" : "May benefit from more specific feedback";
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 cursor-help"
        >
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" className="w-10 h-10 -rotate-90">
              <circle cx="20" cy="20" r="18" fill="none" strokeWidth="3" className="stroke-secondary" />
              <circle
                cx="20" cy="20" r="18" fill="none" strokeWidth="3"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round"
                className={bgColor}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${color}`}>
              {score}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground hidden sm:block">Fairness</span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="text-xs font-medium">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
