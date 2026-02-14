import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Clock, Target, MessageSquare, GitPullRequest, Star, Edit3, Check } from "lucide-react";
import { mockEmployees } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="flex justify-center mb-2 text-muted-foreground">{icon}</div>
      <div className="font-display text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function EditableSection({ title, content, onSave }: { title: string; content: string; onSave: (val: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        <button
          onClick={() => {
            if (editing) onSave(value);
            setEditing(!editing);
          }}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {editing ? <Check size={16} /> : <Edit3 size={16} />}
        </button>
      </div>
      {editing ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[120px] bg-secondary border-border text-foreground"
        />
      ) : (
        <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
      )}
    </div>
  );
}

export default function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = mockEmployees.find((e) => e.id === id);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [managerNotes, setManagerNotes] = useState(employee?.managerNotes || "");

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Employee not found.</p>
      </div>
    );
  }

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const riskColors = {
    low: "text-success",
    medium: "text-primary",
    high: "text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <div className="flex items-start gap-4">
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

        {/* Generate Button */}
        {!generated && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-14 text-base font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-border animate-pulse-glow"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <Clock size={18} className="animate-spin" /> Analyzing performance data...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles size={18} /> Generate AI Review Summary
                </span>
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
            <div className="flex items-center gap-2 text-sm text-primary mb-2">
              <Sparkles size={14} />
              <span className="font-medium">AI-generated summary</span>
              <span className="text-muted-foreground">· Generated in 12 seconds (saved ~105 min)</span>
            </div>

            <EditableSection title="Performance Summary" content={employee.aiSummary} onSave={() => {}} />

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
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-primary mb-3">Areas for Growth</h3>
                <ul className="space-y-2">
                  {employee.areasForGrowth.map((item, i) => (
                    <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <EditableSection
              title="Manager Notes"
              content={managerNotes || "Add your notes here..."}
              onSave={(val) => setManagerNotes(val)}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
