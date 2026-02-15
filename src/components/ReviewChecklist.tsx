import { useState } from "react";
import { ChevronDown, ChevronUp, ClipboardCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { ChecklistState } from "@/data/mockData";

const checklistItems: { key: keyof ChecklistState; label: string }[] = [
  { key: "oneOnOneNotes", label: "1:1 notes reviewed" },
  { key: "projectContributions", label: "Project contributions documented" },
  { key: "peerFeedback", label: "Peer feedback collected" },
  { key: "goalsUpdated", label: "Goals updated for next cycle" },
  { key: "discussedHRBP", label: "Discussed with HRBP (if needed)" },
];

interface ReviewChecklistProps {
  checklist: ChecklistState;
  onChange: (checklist: ChecklistState) => void;
}

export function ReviewChecklist({ checklist, onChange }: ReviewChecklistProps) {
  const [open, setOpen] = useState(false);
  const completed = Object.values(checklist).filter(Boolean).length;
  const total = checklistItems.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Review Readiness</span>
          <span className="text-xs text-muted-foreground">{completed}/{total} complete</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16"><Progress value={pct} className="h-1.5" /></div>
          {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          {checklistItems.map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={checklist[item.key]}
                onCheckedChange={(checked) => onChange({ ...checklist, [item.key]: !!checked })}
              />
              <span className={`text-sm transition-colors ${checklist[item.key] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function getChecklistCompletion(checklist: ChecklistState): number {
  const completed = Object.values(checklist).filter(Boolean).length;
  return Math.round((completed / checklistItems.length) * 100);
}
