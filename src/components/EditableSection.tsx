import { useState } from "react";
import { Edit3, Check, X, Sparkles, RotateCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditableSectionProps {
  title: string;
  content: string;
  onSave: (val: string) => void;
  onRegenerate?: () => void;
}

export function EditableSection({ title, content, onSave, onRegenerate }: EditableSectionProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const [edited, setEdited] = useState(false);

  const handleSave = () => {
    onSave(value);
    setEdited(true);
    setEditing(false);
  };

  const handleCancel = () => {
    setValue(content);
    setEditing(false);
  };

  const handleRegenerate = () => {
    onRegenerate?.();
    setEdited(false);
    setValue(content);
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-foreground">{title}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
            edited ? "bg-primary/15 text-primary" : "bg-info/15 text-info"
          }`}>
            <Sparkles size={10} />
            {edited ? "AI-generated, manager-edited" : "AI-generated"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onRegenerate && !editing && (
            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={handleRegenerate} title="Regenerate this section">
              <RotateCcw size={14} />
            </Button>
          )}
          {editing ? (
            <>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-success" onClick={handleSave}><Check size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground" onClick={handleCancel}><X size={14} /></Button>
            </>
          ) : (
            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setEditing(true)}>
              <Edit3 size={14} />
            </Button>
          )}
        </div>
      </div>
      {editing ? (
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} className="min-h-[120px] bg-secondary border-border text-foreground text-sm" />
      ) : (
        <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
      )}
    </div>
  );
}
