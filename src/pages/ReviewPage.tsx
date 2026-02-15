import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Clock, Target, MessageSquare, GitPullRequest, Star, GitCompare } from "lucide-react";
import { mockEmployees } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { EditableSection } from "@/components/EditableSection";
import { ToneSelector, toneLabels } from "@/components/ToneSelector";
import { SmartPrompts } from "@/components/SmartPrompts";
import { ReviewChecklist } from "@/components/ReviewChecklist";
import { ComparisonView } from "@/components/ComparisonView";
import { ExportButtons } from "@/components/ExportButtons";
import { ReviewHistory } from "@/components/ReviewHistory";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Employee, ToneOption, SmartPromptsData, ChecklistState } from "@/data/mockData";

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="flex justify-center mb-2 text-muted-foreground">{icon}</div>
      <div className="font-display text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

export default function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = mockEmployees.find((e) => e.id === id);

  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [managerNotes, setManagerNotes] = usePersistedState(`reviewprep-notes-${id}`, employee?.managerNotes || "");
  const [tone, setTone] = useState<ToneOption>(employee?.tone || "balanced");
  const [smartPrompts, setSmartPrompts] = useState<SmartPromptsData>(employee?.smartPrompts || { notableProjects: "", specificFeedback: "", developmentGoals: "" });
  const [checklist, setChecklist] = usePersistedState<ChecklistState>(`reviewprep-checklist-${id}`, employee?.checklist || { oneOnOneNotes: false, projectContributions: false, peerFeedback: false, goalsUpdated: false, discussedHRBP: false });
  const [showComparison, setShowComparison] = useState(false);
  const [usedTone, setUsedTone] = useState<ToneOption | null>(null);

  if (!employee) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Employee not found.</p></div>;
  }

  const handleGenerate = () => {
    setGenerating(true);
    setUsedTone(tone);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500);
  };

  const riskColors = { low: "text-success", medium: "text-primary", high: "text-destructive" };

  return (
    <div className="min-h-screen bg-background print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex items-center justify-between mb-6 print:hidden">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            {generated && <ExportButtons employee={employee} managerNotes={managerNotes} />}
          </div>

          {/* Print header */}
          <div className="hidden print:block mb-6 border-b-2 border-black pb-4">
            <p className="text-xs text-gray-500 mb-1">[Company Logo]</p>
            <h1 className="text-2xl font-bold">Performance Review — {employee.name}</h1>
            <p className="text-sm text-gray-600">{employee.role} · {employee.team} · Q4 2025</p>
          </div>

          <div className="flex items-start gap-4 print:hidden">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center font-display text-lg font-bold text-secondary-foreground">
              {employee.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-foreground">{employee.name}</h1>
              <p className="text-muted-foreground">{employee.role} · {employee.team}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-medium ${riskColors[employee.riskLevel]}`}>
                  {employee.riskLevel.charAt(0).toUpperCase() + employee.riskLevel.slice(1)} Risk
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <MetricCard icon={<Target size={18} />} label="Goal Completion" value={`${employee.goalCompletion}%`} />
          <MetricCard icon={<GitPullRequest size={18} />} label="Projects" value={`${employee.projectsCompleted}`} />
          <MetricCard icon={<MessageSquare size={18} />} label="1:1 Sessions" value={`${employee.oneOnOneCount}`} />
          <MetricCard icon={<Star size={18} />} label="Peer Score" value={`${employee.peerFeedbackScore}/5`} />
        </motion.div>

        {/* Pre-generation: Tone, Smart Prompts, Checklist */}
        {!generated && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-3 mb-6 print:hidden">
            <ToneSelector value={tone} onChange={setTone} />
            <SmartPrompts data={smartPrompts} onChange={setSmartPrompts} />
            <ReviewChecklist checklist={checklist} onChange={setChecklist} />
          </motion.div>
        )}

        {/* Generate Button */}
        {!generated && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 print:hidden">
            <Button onClick={handleGenerate} disabled={generating} className="w-full h-14 text-base font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-border animate-pulse-glow">
              {generating ? (
                <span className="flex items-center gap-2"><Clock size={18} className="animate-spin" /> Analyzing performance data...</span>
              ) : (
                <span className="flex items-center gap-2"><Sparkles size={18} /> Generate AI Review Summary</span>
              )}
            </Button>
            {generating && (
              <div className="mt-3 glass-card p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
                  </div>
                  Pulling data from 1:1 notes, project tracker, goals, and peer feedback...
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Generated Content */}
        {generated && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-primary mb-2 print:hidden">
              <Sparkles size={14} />
              <span className="font-medium">AI-generated summary</span>
              {usedTone && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15">{toneLabels[usedTone]}</span>}
              <span className="text-muted-foreground">· Generated in 12s (saved ~{employee.timeSavedMinutes} min)</span>
            </div>

            {/* Checklist (post-generation) */}
            <div className="print:hidden">
              <ReviewChecklist checklist={checklist} onChange={setChecklist} />
            </div>

            {/* Comparison toggle */}
            <div className="print:hidden">
              <Button variant="outline" size="sm" onClick={() => setShowComparison(!showComparison)} className="border-border">
                <GitCompare size={14} className="mr-1.5" />
                {showComparison ? "Hide" : "Compare to Last Review"}
              </Button>
            </div>

            {showComparison && <ComparisonView employee={employee} />}

            <EditableSection title="Performance Summary" content={employee.aiSummary} onSave={() => {}} onRegenerate={() => {}} />

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Key Accomplishments</h3>
              <ul className="space-y-2">
                {employee.keyAccomplishments.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-success mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {employee.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-primary mb-3">Areas for Growth</h3>
                <ul className="space-y-2">
                  {employee.areasForGrowth.map((item, i) => (
                    <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <EditableSection title="Manager Notes" content={managerNotes || "Add your notes here..."} onSave={(val) => setManagerNotes(val)} onRegenerate={() => {}} />

            {/* Review History */}
            <ReviewHistory history={employee.reviewHistory} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
