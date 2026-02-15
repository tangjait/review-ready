import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Target, MessageSquare, GitPullRequest } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { QuickActions } from "@/components/QuickActions";
import { getChecklistCompletion } from "@/components/ReviewChecklist";
import { Progress } from "@/components/ui/progress";
import type { Employee } from "@/data/mockData";

function StatusBadge({ status }: { status: Employee["reviewStatus"] }) {
  const config = {
    not_started: { label: "Not Started", className: "bg-muted text-muted-foreground" },
    in_progress: { label: "In Progress", className: "bg-primary/15 text-primary" },
    completed: { label: "Completed", className: "bg-success/15 text-success" },
  };
  const { label, className } = config[status];
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>{label}</span>;
}

function RiskIndicator({ level }: { level: Employee["riskLevel"] }) {
  const config = { low: "bg-success", medium: "bg-primary", high: "bg-destructive" };
  return <span className={`inline-block w-2 h-2 rounded-full ${config[level]}`} />;
}

interface EmployeeListProps {
  employees: Employee[];
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onMarkComplete: (id: string) => void;
}

export function EmployeeList({ employees, selected, onToggleSelect, onToggleAll, onMarkComplete }: EmployeeListProps) {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={employees.length > 0 && selected.size === employees.length}
            onCheckedChange={onToggleAll}
          />
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Team Members</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Click to view or generate review summary</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {employees.map((emp, i) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors group"
          >
            <div onClick={(e) => { e.stopPropagation(); onToggleSelect(emp.id); }}>
              <Checkbox checked={selected.has(emp.id)} />
            </div>
            <button onClick={() => navigate(`/review/${emp.id}`)} className="flex-1 flex items-center gap-4 text-left min-w-0">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display text-sm font-semibold text-secondary-foreground shrink-0">
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground truncate">{emp.name}</span>
                  <RiskIndicator level={emp.riskLevel} />
                </div>
                <span className="text-sm text-muted-foreground">{emp.role} · {emp.team}</span>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5" title="Goal Completion"><Target size={14} /><span>{emp.goalCompletion}%</span></div>
                <div className="flex items-center gap-1.5" title="1:1s"><MessageSquare size={14} /><span>{emp.oneOnOneCount}</span></div>
                <div className="flex items-center gap-1.5" title="Projects"><GitPullRequest size={14} /><span>{emp.projectsCompleted}</span></div>
              </div>
              <div className="hidden md:flex items-center gap-2" title="Checklist progress">
                <Progress value={getChecklistCompletion(emp.checklist)} className="h-1.5 w-12" />
                <span className="text-[10px] text-muted-foreground">{getChecklistCompletion(emp.checklist)}%</span>
              </div>
            </button>
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
              <QuickActions employee={emp} onMarkComplete={onMarkComplete} />
            </div>
            <StatusBadge status={emp.reviewStatus} />
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
