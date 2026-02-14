export interface Employee {
  id: string;
  name: string;
  role: string;
  team: string;
  avatar: string;
  reviewStatus: "not_started" | "in_progress" | "completed";
  riskLevel: "low" | "medium" | "high";
  goalCompletion: number;
  projectsCompleted: number;
  oneOnOneCount: number;
  peerFeedbackScore: number;
  lastReviewDate: string;
  highlights: string[];
  areasForGrowth: string[];
  aiSummary: string;
  keyAccomplishments: string[];
  managerNotes: string;
}

export interface DashboardStats {
  totalEmployees: number;
  reviewsCompleted: number;
  avgTimeSaved: number;
  totalHoursSaved: number;
  completionRate: number;
  atRiskCount: number;
}

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Senior Software Engineer",
    team: "Platform",
    avatar: "AC",
    reviewStatus: "completed",
    riskLevel: "low",
    goalCompletion: 92,
    projectsCompleted: 8,
    oneOnOneCount: 22,
    peerFeedbackScore: 4.6,
    lastReviewDate: "2025-08-15",
    highlights: [
      "Led migration to microservices architecture",
      "Mentored 3 junior engineers",
      "Reduced API latency by 40%",
    ],
    areasForGrowth: [
      "Cross-team communication could be more proactive",
      "Documentation for new systems needs improvement",
    ],
    aiSummary:
      "Alex has consistently exceeded expectations this cycle. Their technical leadership on the microservices migration was pivotal to the platform team's success. Peer feedback highlights their mentorship skills and collaborative approach. Goal completion at 92% reflects strong execution across all OKRs. Recommend for promotion consideration.",
    keyAccomplishments: [
      "Architected and led the microservices migration (Q3-Q4)",
      "Reduced P95 API latency from 450ms to 270ms",
      "Established engineering mentorship program with 3 mentees",
      "Published internal RFC on observability best practices",
    ],
    managerNotes: "",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Staff Engineer",
    team: "Infrastructure",
    avatar: "PS",
    reviewStatus: "in_progress",
    riskLevel: "low",
    goalCompletion: 88,
    projectsCompleted: 6,
    oneOnOneCount: 18,
    peerFeedbackScore: 4.8,
    lastReviewDate: "2025-08-15",
    highlights: [
      "Designed zero-downtime deployment pipeline",
      "Led incident response for 3 critical outages",
      "Championed SRE best practices org-wide",
    ],
    areasForGrowth: [
      "Could delegate more to grow team capability",
      "Needs to set clearer boundaries on scope",
    ],
    aiSummary:
      "Priya continues to be a technical cornerstone of the infrastructure team. Her leadership during critical incidents was exemplary, and the zero-downtime deployment pipeline she designed has significantly improved release confidence. High peer feedback scores reflect her collaborative nature. Consider discussing scope management to prevent burnout.",
    keyAccomplishments: [
      "Designed and implemented zero-downtime deployment pipeline",
      "Led incident response for 3 Sev-1 outages with <30min MTTR",
      "Drove adoption of SRE practices across 4 engineering teams",
      "Reduced infrastructure costs by 25% through optimization",
    ],
    managerNotes: "",
  },
  {
    id: "3",
    name: "Jordan Williams",
    role: "Software Engineer II",
    team: "Product",
    avatar: "JW",
    reviewStatus: "not_started",
    riskLevel: "medium",
    goalCompletion: 65,
    projectsCompleted: 4,
    oneOnOneCount: 14,
    peerFeedbackScore: 3.8,
    lastReviewDate: "2025-08-15",
    highlights: [
      "Successfully shipped checkout redesign",
      "Improved test coverage from 60% to 82%",
    ],
    areasForGrowth: [
      "Missed 2 project deadlines due to scope estimation issues",
      "Needs to improve technical design skills",
      "Should seek more peer feedback proactively",
    ],
    aiSummary:
      "Jordan has shown growth in code quality and testing practices this cycle. However, goal completion at 65% indicates challenges with scope estimation and project planning. The checkout redesign was well-executed, but two missed deadlines impacted team velocity. Recommend focused coaching on estimation and technical design skills.",
    keyAccomplishments: [
      "Shipped checkout redesign ahead of holiday season",
      "Improved frontend test coverage from 60% to 82%",
      "Contributed to 3 cross-team feature launches",
      "Completed advanced React patterns course",
    ],
    managerNotes: "",
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    role: "Engineering Manager",
    team: "Mobile",
    avatar: "MR",
    reviewStatus: "not_started",
    riskLevel: "low",
    goalCompletion: 85,
    projectsCompleted: 5,
    oneOnOneCount: 24,
    peerFeedbackScore: 4.5,
    lastReviewDate: "2025-08-15",
    highlights: [
      "Grew mobile team from 4 to 8 engineers",
      "Launched iOS and Android feature parity initiative",
      "Improved team sprint velocity by 30%",
    ],
    areasForGrowth: [
      "Should develop more senior ICs on the team",
      "Cross-functional stakeholder management could improve",
    ],
    aiSummary:
      "Maria has done exceptional work scaling the mobile team while maintaining high delivery standards. Her hiring and onboarding of 4 new engineers was seamless. The feature parity initiative demonstrates strong strategic thinking. Focus next cycle on developing senior ICs and strengthening cross-functional partnerships.",
    keyAccomplishments: [
      "Scaled mobile team from 4 to 8 with zero regretted attrition",
      "Launched iOS/Android feature parity initiative (80% complete)",
      "Improved team sprint velocity by 30% through process refinement",
      "Established mobile engineering blog with 5 published posts",
    ],
    managerNotes: "",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Junior Software Engineer",
    team: "Data",
    avatar: "DK",
    reviewStatus: "not_started",
    riskLevel: "high",
    goalCompletion: 45,
    projectsCompleted: 2,
    oneOnOneCount: 10,
    peerFeedbackScore: 3.2,
    lastReviewDate: "2025-08-15",
    highlights: [
      "Quick learner on data pipeline technologies",
      "Positive attitude and eagerness to contribute",
    ],
    areasForGrowth: [
      "Significantly behind on goal completion (45%)",
      "Needs more structured onboarding support",
      "Code review feedback suggests gaps in fundamentals",
      "Should pair program more frequently",
    ],
    aiSummary:
      "David is in his first year and showing enthusiasm but struggling with execution. Goal completion at 45% is concerning and suggests onboarding gaps rather than performance issues. Peer feedback indicates need for more foundational support. Recommend creating a structured development plan with weekly check-ins and pair programming sessions.",
    keyAccomplishments: [
      "Completed data pipeline onboarding ahead of schedule",
      "Contributed to ETL pipeline optimization project",
      "Completed 3 internal training courses",
      "Active participant in team retrospectives",
    ],
    managerNotes: "",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 12,
  reviewsCompleted: 3,
  avgTimeSaved: 105,
  totalHoursSaved: 5.25,
  completionRate: 25,
  atRiskCount: 1,
};
