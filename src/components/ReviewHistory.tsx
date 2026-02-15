import { useState } from "react";
import { ChevronDown, ChevronUp, History, Star } from "lucide-react";
import type { ReviewHistoryEntry } from "@/data/mockData";

interface ReviewHistoryProps {
  history: ReviewHistoryEntry[];
}

export function ReviewHistory({ history }: ReviewHistoryProps) {
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  if (history.length === 0) return null;

  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          <History size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Past Reviews</span>
          <span className="text-xs text-muted-foreground">{history.length} previous</span>
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border pt-3">
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4">
              {history.map((entry, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="w-full text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground">{entry.cycle}</span>
                      <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{entry.rating}</span>
                    </div>
                  </button>
                  {expandedIdx === i && (
                    <div className="mt-2 p-3 bg-secondary/50 rounded-lg text-sm space-y-2">
                      <p className="text-secondary-foreground">{entry.summary}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Goals: {entry.goalCompletion}%</span>
                        <span className="flex items-center gap-1"><Star size={10} /> {entry.peerFeedbackScore}/5</span>
                        <span>Projects: {entry.projectsCompleted}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
