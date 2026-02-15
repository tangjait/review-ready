import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { Employee } from "@/data/mockData";

function Delta({ current, previous, suffix = "", flip = false }: { current: number; previous: number; suffix?: string; flip?: boolean }) {
  const diff = current - previous;
  const improved = flip ? diff < 0 : diff > 0;
  const declined = flip ? diff > 0 : diff < 0;

  return (
    <div className="flex items-center gap-1.5">
      {improved ? (
        <ArrowUp size={14} className="text-success" />
      ) : declined ? (
        <ArrowDown size={14} className="text-destructive" />
      ) : (
        <Minus size={14} className="text-muted-foreground" />
      )}
      <span className={`text-xs font-medium ${improved ? "text-success" : declined ? "text-destructive" : "text-muted-foreground"}`}>
        {diff > 0 ? "+" : ""}{diff}{suffix}
      </span>
    </div>
  );
}

function MetricRow({ label, current, previous, suffix = "" }: { label: string; current: number; previous: number; suffix?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{previous}{suffix}</span>
        <span className="text-sm font-medium text-foreground">{current}{suffix}</span>
        <Delta current={current} previous={previous} suffix={suffix} />
      </div>
    </div>
  );
}

export function ComparisonView({ employee }: { employee: Employee }) {
  const prev = employee.previousReview;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Comparison to Last Review</h3>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Previous</span>
          <span className="text-foreground font-medium">Current</span>
          <span>Change</span>
        </div>
      </div>
      <MetricRow label="Goal Completion" current={employee.goalCompletion} previous={prev.goalCompletion} suffix="%" />
      <MetricRow label="Peer Feedback" current={employee.peerFeedbackScore} previous={prev.peerFeedbackScore} suffix="/5" />
      <MetricRow label="Projects Completed" current={employee.projectsCompleted} previous={prev.projectsCompleted} />
      <MetricRow label="1:1 Sessions" current={employee.oneOnOneCount} previous={prev.oneOnOneCount} />
    </div>
  );
}
