import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StatsGrid } from "@/components/StatsGrid";
import { EmployeeList } from "@/components/EmployeeList";
import { SearchFilter } from "@/components/SearchFilter";
import { BulkActions } from "@/components/BulkActions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockEmployees, mockDashboardStats } from "@/data/mockData";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Employee } from "@/data/mockData";
import { toast } from "sonner";

const Index = () => {
  const [employees, setEmployees] = usePersistedState<Employee[]>("reviewprep-employees", mockEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch = !search || [e.name, e.role, e.team].some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === "all" || e.reviewStatus === statusFilter;
      const matchRisk = riskFilter === "all" || e.riskLevel === riskFilter;
      return matchSearch && matchStatus && matchRisk;
    });
  }, [employees, search, statusFilter, riskFilter]);

  const stats = useMemo(() => {
    const completed = employees.filter((e) => e.reviewStatus === "completed").length;
    return {
      ...mockDashboardStats,
      totalEmployees: employees.length,
      reviewsCompleted: completed,
      completionRate: Math.round((completed / employees.length) * 100),
      atRiskCount: employees.filter((e) => e.riskLevel === "high").length,
    };
  }, [employees]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((e) => e.id)));
    }
  };

  const handleMarkComplete = (id: string) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, reviewStatus: "completed" as const } : e)));
  };

  const handleBulkMarkComplete = () => {
    setEmployees((prev) => prev.map((e) => (selected.has(e.id) ? { ...e, reviewStatus: "completed" as const } : e)));
    setSelected(new Set());
    toast.success("Selected reviews marked as completed");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav Bar */}
      <nav className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/15">
              <Sparkles size={18} className="text-primary" />
            </div>
            <h1 className="font-display text-lg font-bold text-foreground">ReviewPrep</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">· Q4 2025 Cycle</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Time Tracking */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="glass-card p-5 glow-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Total time saved this cycle</p>
                <p className="font-display text-3xl font-bold text-foreground">20.4 hours</p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Manual: 2h/review × 8 = 16h</span>
                  <span>With AI: 18min × 8 = 2.4h</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden flex">
                  <div className="bg-primary/30 h-full" style={{ width: "85%" }} />
                  <div className="bg-primary h-full" style={{ width: "15%" }} />
                </div>
                <p className="text-xs text-primary mt-1 text-right font-medium">85% time reduction</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-6">
          <StatsGrid stats={stats} employees={employees} />
        </div>

        {/* Search & Filter */}
        <SearchFilter
          search={search} onSearchChange={setSearch}
          statusFilter={statusFilter} onStatusChange={setStatusFilter}
          riskFilter={riskFilter} onRiskChange={setRiskFilter}
          resultCount={filtered.length} totalCount={employees.length}
        />

        {/* Employee List */}
        <EmployeeList
          employees={filtered}
          selected={selected}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          onMarkComplete={handleMarkComplete}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selected.size}
          onClear={() => setSelected(new Set())}
          onGenerateAll={() => { toast.success("All summaries generated"); setSelected(new Set()); }}
          onExportAll={() => { toast.success("Export started"); setSelected(new Set()); }}
          onMarkComplete={handleBulkMarkComplete}
        />
      </div>
    </div>
  );
};

export default Index;
