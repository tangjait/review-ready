import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, BarChart3, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockManagerOwnPatterns } from "@/data/biasData";

export default function ReviewPatterns() {
  const navigate = useNavigate();
  const data = mockManagerOwnPatterns;
  const maxRating = Math.max(...data.ratingDistribution.map((r) => r.count));

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/15"><Sparkles size={18} className="text-primary" /></div>
            <h1 className="font-display text-lg font-bold text-foreground">ReviewPrep</h1>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Review Patterns</h1>
          <p className="text-muted-foreground text-sm mb-8">Improve your review quality with insights from your writing patterns — Q4 2025 cycle</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Most Used Phrases */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" /> Most Used Phrases
            </h3>
            <div className="space-y-3">
              {data.mostUsedPhrases.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">"{p.phrase}"</span>
                      <span className="text-xs text-muted-foreground">{p.count} reviews</span>
                    </div>
                    {p.flagged && p.suggestion && (
                      <p className="text-[11px] text-primary mt-0.5">⚠ {p.suggestion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rating Distribution */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" /> Your Rating Distribution
            </h3>
            <div className="flex items-end gap-3 h-28 mb-3">
              {data.ratingDistribution.map((r) => (
                <div key={r.rating} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-primary/60 transition-all" style={{ height: `${maxRating > 0 ? (r.count / maxRating) * 100 : 0}%`, minHeight: r.count > 0 ? "8px" : "2px" }} />
                  <span className="text-xs text-muted-foreground">{r.rating}★</span>
                </div>
              ))}
            </div>
            <div className="text-xs space-y-1">
              <p className="text-foreground">Your average: <span className="font-semibold">{data.ownAvgRating}/5</span> · Team average: {data.teamAvgRating}/5</p>
              <p className="text-muted-foreground">{data.ratingTrendNote}</p>
            </div>
          </motion.div>
        </div>

        {/* Review Depth */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-primary" /> Review Depth
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Avg words per review</span>
                <span className="font-medium text-foreground">{data.avgWordsPerReview}</span>
              </div>
              <Progress value={(data.avgWordsPerReview / data.teamAvgWords) * 100} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">Team avg: {data.teamAvgWords} words</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Avg specific examples</span>
                <span className="font-medium text-foreground">{data.avgSpecificExamples}</span>
              </div>
              <Progress value={(data.avgSpecificExamples / data.teamAvgExamples) * 100} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">Team avg: {data.teamAvgExamples} examples · Top reviews include 4+</p>
            </div>
          </div>
        </motion.div>

        {/* Calibration Score Over Time */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-success" /> Calibration Score Trend
          </h3>
          <div className="flex items-end gap-4 h-24">
            {data.cycleOverCycle.map((c) => (
              <div key={c.cycle} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-foreground">{c.calibrationScore}</span>
                <div className="w-full rounded-t bg-success/50" style={{ height: `${c.calibrationScore}%` }} />
                <span className="text-[10px] text-muted-foreground">{c.cycle}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-success mt-3">↑ Your calibration score has improved 20% over the last 3 cycles</p>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 glow-border text-center">
          <AlertTriangle size={20} className="text-primary mx-auto mb-2" />
          <h3 className="font-display font-semibold text-foreground mb-1">Improve Your Review Quality</h3>
          <p className="text-sm text-muted-foreground mb-4">Top-rated managers write reviews with 4+ specific examples and avoid generic phrases.</p>
          <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Review Your Team
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
