import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WritingSuggestion } from "@/data/biasData";

const typeLabels: Record<string, string> = {
  vague: "Vague Praise",
  gendered: "Language Pattern",
  recency: "Recency Bias",
  comparison: "Peer Comparison",
  overuse: "Overused Phrase",
};

const typeColors: Record<string, string> = {
  vague: "bg-primary/15 text-primary",
  gendered: "bg-destructive/15 text-destructive",
  recency: "bg-primary/15 text-primary",
  comparison: "bg-info/15 text-info",
  overuse: "bg-primary/15 text-primary",
};

interface BiasAssistantProps {
  suggestions: WritingSuggestion[];
  onDismiss: (id: string) => void;
  open: boolean;
  onToggle: () => void;
}

export function BiasAssistant({ suggestions, onDismiss, open, onToggle }: BiasAssistantProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const active = suggestions.filter((s) => !s.dismissed);

  return (
    <>
      {/* Toggle button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="border-border gap-1.5"
      >
        {open ? <EyeOff size={14} /> : <Eye size={14} />}
        Review Assistant
        {active.length > 0 && (
          <span className="ml-1 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
            {active.length}
          </span>
        )}
      </Button>

      {/* Side panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-4 mt-3"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">Writing Suggestions</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onToggle}>
                <X size={14} />
              </Button>
            </div>

            {active.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-success py-4">
                <Check size={16} />
                <span>No issues detected — review looks great!</span>
              </div>
            ) : (
              <div className="space-y-2">
                {active.map((s) => (
                  <div key={s.id} className="rounded-lg border border-border bg-secondary/30 overflow-hidden">
                    <button
                      onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                      className="w-full flex items-center gap-2 p-3 text-left"
                    >
                      <AlertCircle size={14} className="text-primary shrink-0" />
                      <span className="text-xs text-foreground flex-1">{s.text}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${typeColors[s.type] || "bg-muted text-muted-foreground"}`}>
                        {typeLabels[s.type] || s.type}
                      </span>
                      <ChevronRight size={12} className={`text-muted-foreground transition-transform ${expanded === s.id ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {expanded === s.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 space-y-2">
                            <p className="text-[11px] text-muted-foreground">{s.reason}</p>
                            <div className="space-y-1">
                              <p className="text-[10px] font-medium text-foreground">Suggested alternatives:</p>
                              {s.alternatives.map((alt, i) => (
                                <p key={i} className="text-[11px] text-success flex items-start gap-1.5">
                                  <Check size={10} className="mt-0.5 shrink-0" /> {alt}
                                </p>
                              ))}
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground" onClick={() => onDismiss(s.id)}>
                              Dismiss
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
