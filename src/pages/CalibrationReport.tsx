import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Target, TrendingUp, TrendingDown, Minus, Download, Search, Check, AlertTriangle, BarChart3, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockOrgCalibration } from "@/data/biasData";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  low: "bg-info/15 text-info",
  medium: "bg-primary/15 text-primary",
  high: "bg-destructive/15 text-destructive",
};

const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp size={12} />,
  down: <TrendingDown size={12} />,
  flat: <Minus size={12} />,
};

export default function CalibrationReport() {
  const navigate = useNavigate();
  const data = mockOrgCalibration;
  const [managerSearch, setManagerSearch] = useState("");
  const [expandedManager, setExpandedManager] = useState<string | null>(null);
  const [anonymized, setAnonymized] = useState(true);

  const filteredManagers = data.managers.filter((m) =>
    m.name.toLowerCase().includes(managerSearch.toLowerCase())
  );

  const maxRatingCount = Math.max(...data.ratingDistribution.map((r) => Math.max(r.count, r.expected)));

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/15"><Sparkles size={18} className="text-primary" /></div>
            <h1 className="font-display text-lg font-bold text-foreground">ReviewPrep</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">· HR Calibration</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded")} className="border-border gap-1.5">
            <Download size={14} /> Export PDF
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Organization Calibration Report</h1>
          <p className="text-muted-foreground text-sm mb-8">Q4 2025 Review Cycle · {data.totalReviews} reviews analyzed</p>
        </motion.div>

        {/* Executive Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 glow-border text-center">
            <Target size={20} className="text-primary mx-auto mb-2" />
            <div className="font-display text-3xl font-bold text-foreground">{data.calibrationScore}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Calibration Score</p>
            <p className="text-xs text-success mt-1">↑ from {data.prevCalibrationScore} last cycle</p>
          </div>
          <div className="glass-card p-5 text-center">
            <BarChart3 size={20} className="text-info mx-auto mb-2" />
            <div className="font-display text-3xl font-bold text-foreground">{data.totalReviews}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Reviews Analyzed</p>
          </div>
          <div className="glass-card p-5 text-center">
            <AlertTriangle size={20} className="text-primary mx-auto mb-2" />
            <div className="font-display text-3xl font-bold text-foreground">{data.biasPatterns.reduce((s, b) => s + b.occurrences, 0)}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Patterns Flagged</p>
          </div>
        </motion.div>

        {/* Bias Pattern Detection */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card overflow-hidden mb-6">
          <div className="p-5 border-b border-border">
            <h2 className="font-display font-semibold text-foreground">Pattern Detection</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left p-3 font-medium">Pattern Type</th>
                  <th className="text-left p-3 font-medium">Occurrences</th>
                  <th className="text-left p-3 font-medium">Managers</th>
                  <th className="text-left p-3 font-medium">Severity</th>
                  <th className="text-left p-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.biasPatterns.map((bp) => (
                  <tr key={bp.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3">
                      <div>
                        <span className="font-medium text-foreground">{bp.label}</span>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{bp.description}</p>
                      </div>
                    </td>
                    <td className="p-3 text-foreground">{bp.occurrences} reviews</td>
                    <td className="p-3 text-foreground">{bp.managers} managers</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColors[bp.severity]}`}>
                        {bp.severity === "high" ? "⚠⚠ High" : bp.severity === "medium" ? "⚠ Medium" : "ℹ Low"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`flex items-center gap-1 text-xs ${bp.trend === "down" ? "text-success" : bp.trend === "up" ? "text-destructive" : "text-muted-foreground"}`}>
                        {trendIcons[bp.trend]}
                        {bp.trend === "flat" ? "Flat" : `${bp.trend === "down" ? "↓" : "↑"} ${bp.trendPct}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Manager-Level Analysis */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card overflow-hidden mb-6">
          <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-display font-semibold text-foreground">Manager-Level Analysis</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setAnonymized(!anonymized)} className="text-xs border-border">
                {anonymized ? "Show Names" : "Anonymize"}
              </Button>
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search managers..."
                  value={managerSearch}
                  onChange={(e) => setManagerSearch(e.target.value)}
                  className="pl-8 h-8 w-40 text-xs bg-secondary border-border"
                />
              </div>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {filteredManagers.map((mgr, i) => (
              <div key={mgr.managerId}>
                <button
                  onClick={() => setExpandedManager(expandedManager === mgr.managerId ? null : mgr.managerId)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-display text-xs font-semibold text-secondary-foreground">
                    {anonymized ? `M${i + 1}` : mgr.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm text-foreground">{anonymized ? `Manager ${i + 1}` : mgr.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{mgr.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`text-sm font-bold ${mgr.calibrationScore >= 80 ? "text-success" : mgr.calibrationScore >= 70 ? "text-primary" : "text-destructive"}`}>
                        {mgr.calibrationScore}/100
                      </span>
                    </div>
                    {mgr.riskAreas.length === 0 ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary">{mgr.riskAreas[0]}</span>
                    )}
                  </div>
                </button>

                {expandedManager === mgr.managerId && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4 overflow-hidden">
                    <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2">Top Phrases</h4>
                        <div className="space-y-1.5">
                          {mgr.topPhrases.map((p, j) => (
                            <div key={j} className="flex items-center justify-between text-xs">
                              <span className="text-foreground">"{p.phrase}"</span>
                              <span className={p.flagged ? "text-primary" : "text-muted-foreground"}>
                                {p.count}× {p.flagged && "⚠"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2">Rating Distribution</h4>
                        <div className="flex items-end gap-2 h-12">
                          {mgr.ratingDistribution.map((r) => (
                            <div key={r.rating} className="flex-1 flex flex-col items-center gap-0.5">
                              <div className="w-full rounded-t bg-primary/50" style={{ height: `${r.count > 0 ? (r.count / Math.max(...mgr.ratingDistribution.map((x) => x.count), 1)) * 100 : 0}%`, minHeight: r.count > 0 ? "4px" : "2px" }} />
                              <span className="text-[9px] text-muted-foreground">{r.rating}★</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">Avg: {mgr.avgRating}/5</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-7 border-border" onClick={() => toast.success("Coaching resources sent")}>
                          Send Resources
                        </Button>
                        {mgr.riskAreas.length > 0 && (
                          <Button size="sm" variant="outline" className="text-xs h-7 border-primary/30 text-primary" onClick={() => toast.success("Flagged for coaching")}>
                            Flag for Coaching
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gendered Language */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden mb-6">
          <div className="p-5 border-b border-border">
            <h2 className="font-display font-semibold text-foreground">Language Patterns</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left p-3 font-medium">Pattern</th>
                <th className="text-left p-3 font-medium">Count</th>
                <th className="text-left p-3 font-medium">Context</th>
              </tr>
            </thead>
            <tbody>
              {data.genderedLanguage.map((gl, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="p-3 font-medium text-foreground">"{gl.pattern}"</td>
                  <td className="p-3 text-foreground">{gl.count} uses</td>
                  <td className="p-3 text-muted-foreground text-xs">{gl.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 mb-6">
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-primary" /> Org Rating Distribution
          </h2>
          <div className="flex items-end gap-4 h-32 mb-2">
            {data.ratingDistribution.map((r) => (
              <div key={r.rating} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end" style={{ height: "100%" }}>
                  <div className="flex-1 rounded-t bg-primary/60" style={{ height: `${(r.count / maxRatingCount) * 100}%`, minHeight: "4px" }} />
                  <div className="flex-1 rounded-t bg-muted-foreground/20 border border-dashed border-muted-foreground/30" style={{ height: `${(r.expected / maxRatingCount) * 100}%`, minHeight: "4px" }} />
                </div>
                <span className="text-xs text-muted-foreground">{r.rating}★</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-primary/60" /> Actual</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded border border-dashed border-muted-foreground/30 bg-muted-foreground/20" /> Expected</span>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4 mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <BookOpen size={18} className="text-primary" /> Actionable Recommendations
          </h2>
          {data.recommendations.map((rec) => (
            <div key={rec.priority} className="glass-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {rec.priority}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rec.managersAffected} managers affected</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {rec.actions.map((action, i) => (
                      <Button key={i} variant="outline" size="sm" className="text-xs h-7 border-border" onClick={() => toast.success(`${action} — done`)}>
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
