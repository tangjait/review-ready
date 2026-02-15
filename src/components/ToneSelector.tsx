import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ToneOption } from "@/data/mockData";

const toneLabels: Record<ToneOption, string> = {
  balanced: "Balanced",
  growth: "Growth-focused",
  improvement: "Performance Improvement",
  promotion: "Promotion-ready",
};

const toneDescriptions: Record<ToneOption, string> = {
  balanced: "Fair and balanced assessment",
  growth: "Emphasizes development opportunities",
  improvement: "Focuses on areas needing attention",
  promotion: "Highlights achievements and readiness",
};

interface ToneSelectorProps {
  value: ToneOption;
  onChange: (val: ToneOption) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="glass-card p-4">
      <label className="text-sm font-medium text-foreground block mb-2">Review Tone</label>
      <Select value={value} onValueChange={(v) => onChange(v as ToneOption)}>
        <SelectTrigger className="bg-secondary border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(toneLabels) as ToneOption[]).map((tone) => (
            <SelectItem key={tone} value={tone}>
              <div>
                <span className="font-medium">{toneLabels[tone]}</span>
                <span className="text-muted-foreground text-xs ml-2">— {toneDescriptions[tone]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { toneLabels };
