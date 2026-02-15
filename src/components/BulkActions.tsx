import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface BulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onGenerateAll: () => void;
  onExportAll: () => void;
  onMarkComplete: () => void;
}

export function BulkActions({ selectedCount, onClear, onGenerateAll, onExportAll, onMarkComplete }: BulkActionsProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          onGenerateAll();
          return 0;
        }
        return p + Math.random() * 20 + 5;
      });
    }, 400);
  };

  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="glass-card glow-border px-5 py-3 flex items-center gap-3 shadow-2xl">
            <span className="text-sm font-medium text-foreground">{selectedCount} selected</span>
            <div className="w-px h-6 bg-border" />
            {generating ? (
              <div className="flex items-center gap-3 min-w-[200px]">
                <Progress value={Math.min(progress, 100)} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={handleGenerate} className="text-primary hover:text-primary">
                  <Sparkles size={14} className="mr-1.5" /> Generate All
                </Button>
                <Button size="sm" variant="ghost" onClick={onExportAll}>
                  <Download size={14} className="mr-1.5" /> Export All
                </Button>
                <Button size="sm" variant="ghost" onClick={onMarkComplete}>
                  <CheckCircle size={14} className="mr-1.5" /> Mark Complete
                </Button>
              </>
            )}
            <Button size="icon" variant="ghost" onClick={onClear} className="h-7 w-7">
              <X size={14} />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
