import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertTriangle, BarChart3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import type { CalibrationResult } from "@/data/biasData";

interface CalibrationCheckProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  result: CalibrationResult;
}

export function CalibrationCheck({ open, onClose, onSubmit, result }: CalibrationCheckProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Review Calibration Check</DialogTitle>
          <DialogDescription>Quick quality check before finalizing this review.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Specificity Score */}
          <div className="flex items-start gap-3">
            <div className={`p-1.5 rounded-md mt-0.5 ${result.specificityScore >= 85 ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
              <BarChart3 size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Specificity Score</span>
                <span className={`text-sm font-bold ${result.specificityScore >= 85 ? "text-success" : "text-primary"}`}>{result.specificityScore}/100</span>
              </div>
              {result.issues.length > 0 && (
                <div className="mt-1.5 space-y-1">
                  {result.issues.map((iss, i) => (
                    <p key={i} className="text-xs text-muted-foreground">
                      <span className="text-primary">⚠</span> <span className="font-medium">{iss.section}</span> — {iss.suggestion}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Consistency */}
          <div className="flex items-start gap-3">
            <div className={`p-1.5 rounded-md mt-0.5 ${result.consistencyAligned ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
              <Check size={16} />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">Consistency Check</span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {result.consistencyAligned ? "✓ Aligned with your team's standards" : "⚠ Rating diverges from team average"}
              </p>
              <p className="text-xs text-muted-foreground">
                Your average: {result.avgRating}/5 (Team average: {result.teamAvgRating}/5)
              </p>
            </div>
          </div>

          {/* Bias Patterns */}
          {result.biasPatterns.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md mt-0.5 bg-primary/15 text-primary">
                <AlertTriangle size={16} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">Patterns Detected</span>
                <div className="mt-1.5 space-y-1">
                  {result.biasPatterns.map((bp, i) => (
                    <p key={i} className="text-xs text-muted-foreground">• {bp}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Analysis Toggle */}
          <AnimatePresence>
            {showDetail && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-3">
                  <h4 className="text-xs font-semibold text-foreground">Timeline Coverage</h4>
                  <div className="flex items-end gap-1 h-16">
                    {result.timelineCoverage.map((m) => (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t bg-primary/60"
                          style={{ height: `${(m.mentions / 8) * 100}%`, minHeight: "4px" }}
                        />
                        <span className="text-[9px] text-muted-foreground">{m.month}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Higher bars = more mentions. Ideally coverage should be even across the review period.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowDetail(!showDetail)} className="border-border gap-1.5">
            <ChevronDown size={14} className={`transition-transform ${showDetail ? "rotate-180" : ""}`} />
            {showDetail ? "Hide" : "View"} Detailed Analysis
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>Keep Editing</Button>
            <Button size="sm" onClick={onSubmit}>Looks Good, Submit</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
