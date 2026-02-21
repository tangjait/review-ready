// Bias Detection & Calibration Mock Data

export interface BiasPattern {
  id: string;
  type: "recency" | "inflation" | "gendered" | "vague" | "overuse" | "comparison";
  label: string;
  description: string;
  whyItMatters: string;
  severity: "low" | "medium" | "high";
  occurrences: number;
  managers: number;
  trend: "up" | "down" | "flat";
  trendPct: number;
}

export interface WritingSuggestion {
  id: string;
  type: BiasPattern["type"];
  text: string;
  reason: string;
  alternatives: string[];
  dismissed?: boolean;
}

export interface CalibrationResult {
  specificityScore: number;
  consistencyAligned: boolean;
  avgRating: number;
  teamAvgRating: number;
  issues: { section: string; suggestion: string }[];
  biasPatterns: string[];
  timelineCoverage: { month: string; mentions: number }[];
}

export interface ManagerCalibration {
  managerId: string;
  name: string;
  reviewCount: number;
  calibrationScore: number;
  riskAreas: string[];
  avgRating: number;
  topPhrases: { phrase: string; count: number; flagged: boolean }[];
  ratingDistribution: { rating: number; count: number }[];
}

export interface OrgCalibrationData {
  totalReviews: number;
  calibrationScore: number;
  prevCalibrationScore: number;
  biasPatterns: BiasPattern[];
  managers: ManagerCalibration[];
  genderedLanguage: { pattern: string; count: number; context: string }[];
  recommendations: OrgRecommendation[];
  ratingDistribution: { rating: number; count: number; expected: number }[];
}

export interface OrgRecommendation {
  priority: number;
  title: string;
  description: string;
  managersAffected: number;
  actions: string[];
}

// --- Detection Rules ---

const vagueWords = [
  "team player", "hard worker", "positive attitude", "great communicator",
  "strong performer", "goes above and beyond", "detail-oriented", "proactive",
  "self-starter", "results-driven"
];

const genderedPairs: [string, string][] = [
  ["aggressive", "assertive"],
  ["bossy", "decisive"],
  ["emotional", "passionate"],
  ["abrasive", "direct"],
  ["pushy", "ambitious"],
];

export function detectWritingSuggestions(text: string, employeeName: string): WritingSuggestion[] {
  const suggestions: WritingSuggestion[] = [];
  const lower = text.toLowerCase();

  // Vague praise
  vagueWords.forEach((word) => {
    if (lower.includes(word)) {
      suggestions.push({
        id: `vague-${word}`,
        type: "vague",
        text: `"${word}" is vague without examples`,
        reason: `Generic phrases lose meaning. Consider replacing with a specific accomplishment.`,
        alternatives: [
          `Replace with a concrete example, e.g., "${employeeName} improved test coverage from 60% to 82%"`,
          `Add context: what did they do, when, and what was the impact?`,
        ],
      });
    }
  });

  // Gendered language
  genderedPairs.forEach(([flagged, alternative]) => {
    if (lower.includes(flagged)) {
      suggestions.push({
        id: `gendered-${flagged}`,
        type: "gendered",
        text: `"${flagged}" can carry gendered connotations`,
        reason: `Research shows "${flagged}" is disproportionately used for certain demographics. Consider "${alternative}" for the same meaning.`,
        alternatives: [`Use "${alternative}" instead`, `Describe the specific behavior objectively`],
      });
    }
  });

  // Recency bias
  const recentWords = ["recently", "lately", "last month", "last week", "just"];
  const recentCount = recentWords.filter((w) => lower.includes(w)).length;
  if (recentCount >= 2) {
    suggestions.push({
      id: "recency-1",
      type: "recency",
      text: "Review language focuses heavily on recent events",
      reason: "Multiple time references suggest recency bias. Consider examples from the full review period (Jul–Dec).",
      alternatives: [
        "Add an accomplishment from Q3 (Jul–Sep)",
        "Reference goals set at the beginning of the cycle",
      ],
    });
  }

  // Comparison language
  const comparisonWords = ["better than", "worse than", "compared to", "unlike"];
  comparisonWords.forEach((word) => {
    if (lower.includes(word)) {
      suggestions.push({
        id: `comparison-${word.replace(/ /g, "-")}`,
        type: "comparison",
        text: `"${word}" compares to peers instead of objective criteria`,
        reason: "Reviews should measure against role expectations, not other employees.",
        alternatives: [
          "Evaluate against the role's competency framework",
          "Reference specific goals or OKRs",
        ],
      });
    }
  });

  return suggestions;
}

export function computeFairnessScore(text: string): number {
  let score = 100;
  const lower = text.toLowerCase();

  // Penalize vague praise
  vagueWords.forEach((w) => { if (lower.includes(w)) score -= 5; });

  // Penalize gendered language
  genderedPairs.forEach(([flagged]) => { if (lower.includes(flagged)) score -= 8; });

  // Penalize comparison
  if (lower.includes("better than") || lower.includes("worse than")) score -= 6;

  // Bonus for specificity (numbers, percentages, project names)
  const numbers = (text.match(/\d+%?/g) || []).length;
  score += Math.min(numbers * 3, 15);

  // Bonus for length (more detailed = better)
  if (text.length > 300) score += 5;
  if (text.length > 500) score += 5;

  return Math.max(0, Math.min(100, score));
}

// --- Calibration Check ---

export function getCalibrationResult(employeeId: string): CalibrationResult {
  // Mock data per employee
  const defaults: CalibrationResult = {
    specificityScore: 78,
    consistencyAligned: true,
    avgRating: 3.8,
    teamAvgRating: 3.6,
    issues: [
      { section: "Key Accomplishments", suggestion: "Add metrics or project names" },
      { section: "Areas for Growth", suggestion: "Link to specific behaviors" },
      { section: "Performance Summary", suggestion: "Include timeline references" },
    ],
    biasPatterns: [
      "Language matches patterns from high-performer reviews but rating is \"Meets Expectations\" — verify rating accuracy",
      "Review focuses on recent projects (Oct–Dec) — consider full review period (Jul–Dec)",
    ],
    timelineCoverage: [
      { month: "Jul", mentions: 1 },
      { month: "Aug", mentions: 1 },
      { month: "Sep", mentions: 2 },
      { month: "Oct", mentions: 5 },
      { month: "Nov", mentions: 8 },
      { month: "Dec", mentions: 7 },
    ],
  };

  if (employeeId === "1" || employeeId === "6") {
    return { ...defaults, specificityScore: 92, issues: [defaults.issues[2]], biasPatterns: [] };
  }
  return defaults;
}

// --- Manager review patterns (mock) ---

export const mockManagerCalibrations: ManagerCalibration[] = [
  {
    managerId: "mgr-1",
    name: "Sarah Chen",
    reviewCount: 12,
    calibrationScore: 88,
    riskAreas: [],
    avgRating: 3.7,
    topPhrases: [
      { phrase: "strong communicator", count: 4, flagged: true },
      { phrase: "exceeded expectations", count: 6, flagged: false },
      { phrase: "needs improvement in", count: 3, flagged: false },
    ],
    ratingDistribution: [
      { rating: 1, count: 0 }, { rating: 2, count: 1 }, { rating: 3, count: 4 },
      { rating: 4, count: 5 }, { rating: 5, count: 2 },
    ],
  },
  {
    managerId: "mgr-2",
    name: "Marcus Liu",
    reviewCount: 8,
    calibrationScore: 65,
    riskAreas: ["Grade inflation"],
    avgRating: 4.4,
    topPhrases: [
      { phrase: "detail-oriented", count: 8, flagged: true },
      { phrase: "great team player", count: 6, flagged: true },
      { phrase: "excellent work", count: 7, flagged: true },
    ],
    ratingDistribution: [
      { rating: 1, count: 0 }, { rating: 2, count: 0 }, { rating: 3, count: 1 },
      { rating: 4, count: 3 }, { rating: 5, count: 4 },
    ],
  },
  {
    managerId: "mgr-3",
    name: "Jordan Kim",
    reviewCount: 15,
    calibrationScore: 71,
    riskAreas: ["Recency bias", "Overused adjectives"],
    avgRating: 3.5,
    topPhrases: [
      { phrase: "team player", count: 9, flagged: true },
      { phrase: "recently showed", count: 7, flagged: true },
      { phrase: "hard worker", count: 5, flagged: true },
    ],
    ratingDistribution: [
      { rating: 1, count: 1 }, { rating: 2, count: 3 }, { rating: 3, count: 5 },
      { rating: 4, count: 4 }, { rating: 5, count: 2 },
    ],
  },
];

export const mockOrgCalibration: OrgCalibrationData = {
  totalReviews: 156,
  calibrationScore: 72,
  prevCalibrationScore: 68,
  biasPatterns: [
    { id: "bp-1", type: "recency", label: "Recency Bias", description: "Reviews focus on recent months", whyItMatters: "Employees' full-cycle contributions aren't recognized", severity: "medium", occurrences: 23, managers: 8, trend: "up", trendPct: 5 },
    { id: "bp-2", type: "inflation", label: "Grade Inflation", description: "Ratings consistently above team average", whyItMatters: "Inflated ratings reduce calibration accuracy", severity: "high", occurrences: 18, managers: 5, trend: "flat", trendPct: 0 },
    { id: "bp-3", type: "gendered", label: "Gendered Language", description: "Language patterns correlate with demographics", whyItMatters: "May reflect unconscious bias in evaluations", severity: "medium", occurrences: 12, managers: 4, trend: "down", trendPct: 12 },
    { id: "bp-4", type: "vague", label: "Vague Praise", description: "Generic phrases without concrete examples", whyItMatters: "Reduces actionability of feedback", severity: "low", occurrences: 45, managers: 15, trend: "down", trendPct: 8 },
    { id: "bp-5", type: "overuse", label: "Adjective Overuse", description: "Same descriptors used across multiple reviews", whyItMatters: "Suggests templated rather than individualized feedback", severity: "low", occurrences: 30, managers: 10, trend: "up", trendPct: 3 },
    { id: "bp-6", type: "comparison", label: "Peer Comparison", description: "Evaluating employees against each other", whyItMatters: "Should evaluate against role criteria, not peers", severity: "medium", occurrences: 8, managers: 3, trend: "down", trendPct: 15 },
  ],
  managers: mockManagerCalibrations,
  genderedLanguage: [
    { pattern: "Aggressive", count: 8, context: "7/8 used for male employees" },
    { pattern: "Emotional", count: 6, context: "6/6 used for female employees" },
    { pattern: "Bossy", count: 3, context: "3/3 used for female employees" },
    { pattern: "Ambitious", count: 5, context: "3/5 used for male employees" },
  ],
  recommendations: [
    {
      priority: 1,
      title: "Address Grade Inflation",
      description: "5 managers consistently rate 0.5+ points above team average, reducing calibration accuracy across the org.",
      managersAffected: 5,
      actions: ["Schedule calibration meeting", "Share rating distribution guidelines", "Review rating criteria and examples"],
    },
    {
      priority: 2,
      title: "Reduce Recency Bias",
      description: "23 reviews primarily reference Oct–Dec activities, missing Jul–Sep contributions.",
      managersAffected: 8,
      actions: ["Encourage mid-cycle check-ins", "Provide timeline template for reviews", "Send reminder to review full period"],
    },
    {
      priority: 3,
      title: "Improve Review Specificity",
      description: "45 reviews rely on generic phrases. Top-rated reviews include 4+ concrete examples.",
      managersAffected: 15,
      actions: ["Share writing guide with examples", "Highlight high-quality review samples", "Enable AI writing assistant org-wide"],
    },
  ],
  ratingDistribution: [
    { rating: 1, count: 3, expected: 5 },
    { rating: 2, count: 12, expected: 20 },
    { rating: 3, count: 48, expected: 55 },
    { rating: 4, count: 62, expected: 50 },
    { rating: 5, count: 31, expected: 26 },
  ],
};

// Manager's own patterns (for "My Review Patterns" page)
export interface ManagerOwnPatterns {
  mostUsedPhrases: { phrase: string; count: number; flagged: boolean; suggestion?: string }[];
  avgWordsPerReview: number;
  teamAvgWords: number;
  avgSpecificExamples: number;
  teamAvgExamples: number;
  ratingDistribution: { rating: number; count: number }[];
  teamAvgRating: number;
  ownAvgRating: number;
  ratingTrendNote: string;
  cycleOverCycle: { cycle: string; calibrationScore: number; reviewCount: number }[];
}

export const mockManagerOwnPatterns: ManagerOwnPatterns = {
  mostUsedPhrases: [
    { phrase: "team player", count: 9, flagged: true, suggestion: "Consider more specific descriptions" },
    { phrase: "strong communicator", count: 7, flagged: true, suggestion: "Add examples of effective communication" },
    { phrase: "needs improvement in", count: 6, flagged: false },
    { phrase: "exceeded expectations", count: 5, flagged: false },
    { phrase: "detail-oriented", count: 4, flagged: true, suggestion: "Replace with a concrete example" },
  ],
  avgWordsPerReview: 340,
  teamAvgWords: 425,
  avgSpecificExamples: 2.3,
  teamAvgExamples: 3.8,
  ratingDistribution: [
    { rating: 1, count: 0 }, { rating: 2, count: 1 }, { rating: 3, count: 3 },
    { rating: 4, count: 4 }, { rating: 5, count: 0 },
  ],
  teamAvgRating: 3.6,
  ownAvgRating: 3.8,
  ratingTrendNote: "Your ratings are 5% higher than the team average. This could indicate a strong team or slight grade inflation.",
  cycleOverCycle: [
    { cycle: "H2 2024", calibrationScore: 65, reviewCount: 8 },
    { cycle: "H1 2025", calibrationScore: 72, reviewCount: 8 },
    { cycle: "H2 2025", calibrationScore: 78, reviewCount: 8 },
  ],
};
