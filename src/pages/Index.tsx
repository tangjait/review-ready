import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StatsGrid } from "@/components/StatsGrid";
import { EmployeeList } from "@/components/EmployeeList";
import { mockEmployees, mockDashboardStats } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-1.5 rounded-lg bg-primary/15">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">ReviewPrep</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-[38px]">
            AI-powered performance review preparation · Q4 2025 Cycle
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-6">
          <StatsGrid stats={mockDashboardStats} />
        </div>

        {/* Employee List */}
        <EmployeeList employees={mockEmployees} />
      </div>
    </div>
  );
};

export default Index;
