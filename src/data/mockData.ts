export interface ReviewHistoryEntry {
  date: string;
  cycle: string;
  summary: string;
  goalCompletion: number;
  peerFeedbackScore: number;
  projectsCompleted: number;
  rating: string;
}

export interface PreviousReview {
  goalCompletion: number;
  peerFeedbackScore: number;
  projectsCompleted: number;
  oneOnOneCount: number;
}

export interface ChecklistState {
  oneOnOneNotes: boolean;
  projectContributions: boolean;
  peerFeedback: boolean;
  goalsUpdated: boolean;
  discussedHRBP: boolean;
}

export interface SmartPromptsData {
  notableProjects: string;
  specificFeedback: string;
  developmentGoals: string;
}

export type ToneOption = "balanced" | "growth" | "improvement" | "promotion";

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
  previousReview: PreviousReview;
  reviewHistory: ReviewHistoryEntry[];
  checklist: ChecklistState;
  tone: ToneOption;
  smartPrompts: SmartPromptsData;
  timeSavedMinutes: number;
}

export interface DashboardStats {
  totalEmployees: number;
  reviewsCompleted: number;
  avgTimeSaved: number;
  totalHoursSaved: number;
  completionRate: number;
  atRiskCount: number;
}

const defaultChecklist: ChecklistState = {
  oneOnOneNotes: false,
  projectContributions: false,
  peerFeedback: false,
  goalsUpdated: false,
  discussedHRBP: false,
};

const defaultSmartPrompts: SmartPromptsData = {
  notableProjects: "",
  specificFeedback: "",
  developmentGoals: "",
};

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
    highlights: ["Led migration to microservices architecture", "Mentored 3 junior engineers", "Reduced API latency by 40%"],
    areasForGrowth: ["Cross-team communication could be more proactive", "Documentation for new systems needs improvement"],
    aiSummary: "Alex has consistently exceeded expectations this cycle. Their technical leadership on the microservices migration was pivotal to the platform team's success. Peer feedback highlights their mentorship skills and collaborative approach. Goal completion at 92% reflects strong execution across all OKRs. Recommend for promotion consideration.",
    keyAccomplishments: ["Architected and led the microservices migration (Q3-Q4)", "Reduced P95 API latency from 450ms to 270ms", "Established engineering mentorship program with 3 mentees", "Published internal RFC on observability best practices"],
    managerNotes: "",
    previousReview: { goalCompletion: 85, peerFeedbackScore: 4.3, projectsCompleted: 6, oneOnOneCount: 20 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Strong performer with growing leadership skills. Led API optimization project.", goalCompletion: 85, peerFeedbackScore: 4.3, projectsCompleted: 6, rating: "Exceeds Expectations" },
      { date: "2024-08-15", cycle: "H2 2024", summary: "Solid technical contributions. Began mentoring junior engineers.", goalCompletion: 78, peerFeedbackScore: 4.1, projectsCompleted: 5, rating: "Meets Expectations" },
    ],
    checklist: { ...defaultChecklist, oneOnOneNotes: true, projectContributions: true },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 105,
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
    highlights: ["Designed zero-downtime deployment pipeline", "Led incident response for 3 critical outages", "Championed SRE best practices org-wide"],
    areasForGrowth: ["Could delegate more to grow team capability", "Needs to set clearer boundaries on scope"],
    aiSummary: "Priya continues to be a technical cornerstone of the infrastructure team. Her leadership during critical incidents was exemplary, and the zero-downtime deployment pipeline she designed has significantly improved release confidence. High peer feedback scores reflect her collaborative nature. Consider discussing scope management to prevent burnout.",
    keyAccomplishments: ["Designed and implemented zero-downtime deployment pipeline", "Led incident response for 3 Sev-1 outages with <30min MTTR", "Drove adoption of SRE practices across 4 engineering teams", "Reduced infrastructure costs by 25% through optimization"],
    managerNotes: "",
    previousReview: { goalCompletion: 90, peerFeedbackScore: 4.7, projectsCompleted: 7, oneOnOneCount: 20 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Exceptional technical leadership. Key contributor to platform stability.", goalCompletion: 90, peerFeedbackScore: 4.7, projectsCompleted: 7, rating: "Exceeds Expectations" },
      { date: "2024-08-15", cycle: "H2 2024", summary: "Promoted to Staff Engineer. Drove major infrastructure overhaul.", goalCompletion: 88, peerFeedbackScore: 4.5, projectsCompleted: 6, rating: "Exceeds Expectations" },
    ],
    checklist: { ...defaultChecklist, oneOnOneNotes: true },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 95,
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
    highlights: ["Successfully shipped checkout redesign", "Improved test coverage from 60% to 82%"],
    areasForGrowth: ["Missed 2 project deadlines due to scope estimation issues", "Needs to improve technical design skills", "Should seek more peer feedback proactively"],
    aiSummary: "Jordan has shown growth in code quality and testing practices this cycle. However, goal completion at 65% indicates challenges with scope estimation and project planning. The checkout redesign was well-executed, but two missed deadlines impacted team velocity. Recommend focused coaching on estimation and technical design skills.",
    keyAccomplishments: ["Shipped checkout redesign ahead of holiday season", "Improved frontend test coverage from 60% to 82%", "Contributed to 3 cross-team feature launches", "Completed advanced React patterns course"],
    managerNotes: "",
    previousReview: { goalCompletion: 72, peerFeedbackScore: 3.5, projectsCompleted: 3, oneOnOneCount: 12 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Showing improvement but still needs coaching on planning and estimation.", goalCompletion: 72, peerFeedbackScore: 3.5, projectsCompleted: 3, rating: "Meets Expectations" },
    ],
    checklist: { ...defaultChecklist },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 110,
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
    highlights: ["Grew mobile team from 4 to 8 engineers", "Launched iOS and Android feature parity initiative", "Improved team sprint velocity by 30%"],
    areasForGrowth: ["Should develop more senior ICs on the team", "Cross-functional stakeholder management could improve"],
    aiSummary: "Maria has done exceptional work scaling the mobile team while maintaining high delivery standards. Her hiring and onboarding of 4 new engineers was seamless. The feature parity initiative demonstrates strong strategic thinking. Focus next cycle on developing senior ICs and strengthening cross-functional partnerships.",
    keyAccomplishments: ["Scaled mobile team from 4 to 8 with zero regretted attrition", "Launched iOS/Android feature parity initiative (80% complete)", "Improved team sprint velocity by 30% through process refinement", "Established mobile engineering blog with 5 published posts"],
    managerNotes: "",
    previousReview: { goalCompletion: 80, peerFeedbackScore: 4.2, projectsCompleted: 4, oneOnOneCount: 22 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Strong people manager. Successfully scaled team during rapid growth.", goalCompletion: 80, peerFeedbackScore: 4.2, projectsCompleted: 4, rating: "Exceeds Expectations" },
      { date: "2024-08-15", cycle: "H2 2024", summary: "Transitioned to management role. Good first review cycle as EM.", goalCompletion: 75, peerFeedbackScore: 4.0, projectsCompleted: 3, rating: "Meets Expectations" },
    ],
    checklist: { ...defaultChecklist },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 100,
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
    highlights: ["Quick learner on data pipeline technologies", "Positive attitude and eagerness to contribute"],
    areasForGrowth: ["Significantly behind on goal completion (45%)", "Needs more structured onboarding support", "Code review feedback suggests gaps in fundamentals", "Should pair program more frequently"],
    aiSummary: "David is in his first year and showing enthusiasm but struggling with execution. Goal completion at 45% is concerning and suggests onboarding gaps rather than performance issues. Peer feedback indicates need for more foundational support. Recommend creating a structured development plan with weekly check-ins and pair programming sessions.",
    keyAccomplishments: ["Completed data pipeline onboarding ahead of schedule", "Contributed to ETL pipeline optimization project", "Completed 3 internal training courses", "Active participant in team retrospectives"],
    managerNotes: "",
    previousReview: { goalCompletion: 40, peerFeedbackScore: 3.0, projectsCompleted: 1, oneOnOneCount: 8 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "First review cycle. Needs structured support and closer mentorship.", goalCompletion: 40, peerFeedbackScore: 3.0, projectsCompleted: 1, rating: "Needs Improvement" },
    ],
    checklist: { ...defaultChecklist },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 115,
  },
  {
    id: "6",
    name: "Sarah Mitchell",
    role: "Senior Software Engineer",
    team: "Product",
    avatar: "SM",
    reviewStatus: "completed",
    riskLevel: "low",
    goalCompletion: 95,
    projectsCompleted: 7,
    oneOnOneCount: 20,
    peerFeedbackScore: 4.7,
    lastReviewDate: "2025-08-15",
    highlights: ["Led the design system overhaul", "Drove accessibility improvements across all products", "Mentored 2 mid-level engineers"],
    areasForGrowth: ["Could take on more cross-team leadership opportunities", "Should present at more company-wide forums"],
    aiSummary: "Sarah has been an outstanding contributor this cycle. Her design system overhaul improved developer productivity across all product teams. Her focus on accessibility demonstrates strong product thinking beyond pure engineering. Peer feedback is consistently excellent. Strong candidate for Staff Engineer promotion.",
    keyAccomplishments: ["Led design system v2.0 overhaul used by 6 product teams", "Improved WCAG compliance from AA to AAA across main product", "Mentored 2 engineers, both received positive review feedback", "Reduced component library bundle size by 35%"],
    managerNotes: "",
    previousReview: { goalCompletion: 88, peerFeedbackScore: 4.5, projectsCompleted: 6, oneOnOneCount: 18 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Consistently high performer. Ready for Staff Engineer discussion.", goalCompletion: 88, peerFeedbackScore: 4.5, projectsCompleted: 6, rating: "Exceeds Expectations" },
      { date: "2024-08-15", cycle: "H2 2024", summary: "Strong execution on frontend architecture improvements.", goalCompletion: 82, peerFeedbackScore: 4.3, projectsCompleted: 5, rating: "Exceeds Expectations" },
    ],
    checklist: { ...defaultChecklist, oneOnOneNotes: true, projectContributions: true, peerFeedback: true },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 90,
  },
  {
    id: "7",
    name: "Tom Nakamura",
    role: "Software Engineer II",
    team: "Infrastructure",
    avatar: "TN",
    reviewStatus: "in_progress",
    riskLevel: "medium",
    goalCompletion: 70,
    projectsCompleted: 5,
    oneOnOneCount: 16,
    peerFeedbackScore: 3.9,
    lastReviewDate: "2025-08-15",
    highlights: ["Improved CI/CD pipeline reliability", "Contributed to Kubernetes migration"],
    areasForGrowth: ["Needs to improve communication during incidents", "Should take more ownership of end-to-end delivery", "Could benefit from deeper system design knowledge"],
    aiSummary: "Tom has made solid contributions to infrastructure reliability this cycle. His work on CI/CD improvements reduced build failures significantly. However, goal completion at 70% suggests room for improvement in prioritization. Incident communication has been flagged by peers. Recommend coaching on ownership and communication skills.",
    keyAccomplishments: ["Reduced CI/CD build failure rate from 15% to 3%", "Contributed to Kubernetes migration for 2 services", "Implemented automated rollback mechanism", "Created runbooks for 5 critical services"],
    managerNotes: "",
    previousReview: { goalCompletion: 65, peerFeedbackScore: 3.7, projectsCompleted: 4, oneOnOneCount: 14 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Improving steadily. Focus areas: communication and ownership.", goalCompletion: 65, peerFeedbackScore: 3.7, projectsCompleted: 4, rating: "Meets Expectations" },
    ],
    checklist: { ...defaultChecklist, oneOnOneNotes: true },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 108,
  },
  {
    id: "8",
    name: "Lisa Park",
    role: "Tech Lead",
    team: "Platform",
    avatar: "LP",
    reviewStatus: "completed",
    riskLevel: "low",
    goalCompletion: 90,
    projectsCompleted: 6,
    oneOnOneCount: 19,
    peerFeedbackScore: 4.4,
    lastReviewDate: "2025-08-15",
    highlights: ["Led platform API redesign", "Introduced event-driven architecture", "Improved team code review culture"],
    areasForGrowth: ["Could improve estimation accuracy for large projects", "Should invest more in external visibility (conferences, blogs)"],
    aiSummary: "Lisa has been a driving force behind the platform team's technical evolution this cycle. The API redesign she led improved developer experience for all consuming teams. Her introduction of event-driven architecture patterns has positioned the platform for future scale. Strong technical leadership with room to grow external influence.",
    keyAccomplishments: ["Led platform API v3 redesign serving 12 internal teams", "Introduced event-driven architecture reducing coupling by 60%", "Improved team code review turnaround from 48h to 12h average", "Designed capacity planning framework for platform services"],
    managerNotes: "",
    previousReview: { goalCompletion: 85, peerFeedbackScore: 4.2, projectsCompleted: 5, oneOnOneCount: 17 },
    reviewHistory: [
      { date: "2025-02-15", cycle: "H1 2025", summary: "Excellent tech lead. Growing influence across the organization.", goalCompletion: 85, peerFeedbackScore: 4.2, projectsCompleted: 5, rating: "Exceeds Expectations" },
      { date: "2024-08-15", cycle: "H2 2024", summary: "Promoted to Tech Lead. Strong first cycle in new role.", goalCompletion: 80, peerFeedbackScore: 4.0, projectsCompleted: 4, rating: "Meets Expectations" },
    ],
    checklist: { ...defaultChecklist, oneOnOneNotes: true, projectContributions: true, peerFeedback: true, goalsUpdated: true },
    tone: "balanced",
    smartPrompts: { ...defaultSmartPrompts },
    timeSavedMinutes: 98,
  },
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 8,
  reviewsCompleted: 3,
  avgTimeSaved: 103,
  totalHoursSaved: 13.4,
  completionRate: 38,
  atRiskCount: 1,
};
