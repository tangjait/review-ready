import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { SmartPromptsData } from "@/data/mockData";

interface SmartPromptsProps {
  data: SmartPromptsData;
  onChange: (data: SmartPromptsData) => void;
}

export function SmartPrompts({ data, onChange }: SmartPromptsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Add Context</span>
          <span className="text-xs text-muted-foreground">(optional — improves accuracy)</span>
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Notable projects this cycle</label>
            <Textarea value={data.notableProjects} onChange={(e) => onChange({ ...data, notableProjects: e.target.value })} placeholder="e.g., Led the API migration, shipped checkout v2..." className="bg-secondary border-border min-h-[60px] text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Specific feedback to address</label>
            <Textarea value={data.specificFeedback} onChange={(e) => onChange({ ...data, specificFeedback: e.target.value })} placeholder="e.g., Peer mentioned communication gaps during incidents..." className="bg-secondary border-border min-h-[60px] text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Development goals achieved</label>
            <Textarea value={data.developmentGoals} onChange={(e) => onChange({ ...data, developmentGoals: e.target.value })} placeholder="e.g., Completed system design course, presented at team all-hands..." className="bg-secondary border-border min-h-[60px] text-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
