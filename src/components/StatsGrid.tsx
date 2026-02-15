import { motion } from "framer-motion";
import { Clock, Users, TrendingUp, AlertTriangle, ClipboardCheck } from "lucide-react";
import { getChecklistCompletion } from "@/components/ReviewChecklist";
import type { DashboardStats, Employee } from "@/data/mockData";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: "default" | "accent" | "warning";
  delay?: number;
}

function StatCard({ icon, label, value, sublabel, variant = "default", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass-card p-6 ${variant === "accent" ? "glow-border" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${
          variant === "accent" ? "bg-primary/15 text-primary" :
          variant === "warning" ? "bg-destructive/15 text-destructive" :
          "bg-secondary text-muted-foreground"
        }`}>
          {icon}
        </div>
      </div>
      <div className="stat-value text-foreground">{value}</div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground/70 mt-0.5">{sublabel}</p>}
    </motion.div>
  );
}

export function StatsGrid({ stats, employees }: { stats: DashboardStats; employees?: Employee[] }) {
  const avgChecklist = employees
    ? Math.round(employees.reduce((sum, e) => sum + getChecklistCompletion(e.checklist), 0) / employees.length)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard icon={<Users size={20} />} label="Reviews Completed" value={`${stats.reviewsCompleted}/${stats.totalEmployees}`} sublabel={`${stats.completionRate}% completion rate`} delay={0} />
      <StatCard icon={<Clock size={20} />} label="Hours Saved" value={`${stats.totalHoursSaved}h`} sublabel={`~${stats.avgTimeSaved} min per review`} variant="accent" delay={0.1} />
      <StatCard icon={<TrendingUp size={20} />} label="Avg Time Saved" value="87%" sublabel="vs manual review prep" delay={0.2} />
      <StatCard icon={<AlertTriangle size={20} />} label="At-Risk Employees" value={stats.atRiskCount} sublabel="Needs attention" variant={stats.atRiskCount > 0 ? "warning" : "default"} delay={0.3} />
      <StatCard icon={<ClipboardCheck size={20} />} label="Checklist Avg" value={`${avgChecklist}%`} sublabel="Review readiness" delay={0.4} />
    </div>
  );
}
