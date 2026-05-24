import React from 'react';

export const TYPE_META = {
  grading: {
    label: 'Grading',
    color: '#E85A5A',
    bg: 'rgba(232, 90, 90, 0.08)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  reports: {
    label: 'Reports',
    color: '#3B9E9E',
    bg: 'rgba(59, 158, 158, 0.08)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  tutors: {
    label: 'AI Tutor',
    color: '#8B5AE8',
    bg: 'rgba(139, 90, 232, 0.08)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  planning: {
    label: 'Planning',
    color: '#D4A26B',
    bg: 'rgba(212, 162, 107, 0.08)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  communication: {
    label: 'Communication',
    color: '#E8845A',
    bg: 'rgba(232, 132, 90, 0.08)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
};

export const ITEMS = [
  {
    id: 'i1',
    type: 'tutors',
    title: "Tutoring sessions complete",
    subtitle: "8B Mathematics · Summaries ready",
    status: "1 student flagged.",
    urgency: 'high', 
    actions: {
      primary: { label: 'Review' }
    },
    deepLink: '/tutors/8b-math',
    evidence: {
      header: "AI Tutor Summary",
      studentCount: 4,
      detail: "4 students completed AI Tutor sessions on algebraic equations. Aarav flagged for repeated incorrect attempts and expressed frustration.",
      flagged: {
        count: 1,
        student: "Aarav Sharma",
        reason: "Repeated incorrect attempts solving negative integers, expressed frustration during conversation."
      },
      stats: [
        { label: "Avg Session Duration", value: "18 mins" },
        { label: "Core Concept Covered", value: "Solving for x" },
        { label: "Secondary Concept", value: "Negative integers" }
      ]
    }
  },
  {
    id: 'i2',
    type: 'grading',
    title: "Research essays",
    subtitle: "7A English · AI grading complete",
    status: "Ready for teacher review.",
    urgency: 'high', 
    actions: {
      primary: { label: 'Review' }
    },
    deepLink: '/grading/7a-english',
    evidence: {
      header: "Grading Assistant",
      studentCount: 9,
      detail: "AI has evaluated 9 student essays against the rubric and suggested grades with detailed rationale. 2 essays flagged due to ambiguous text evidence.",
      rubric: [
        { criteria: "Ideas", weight: "25%" },
        { criteria: "Structure", weight: "25%" },
        { criteria: "Voice", weight: "25%" },
        { criteria: "Conventions", weight: "25%" }
      ],
      flagged: {
        count: 2,
        reason: "Ambiguous text evidence, manual verification recommended."
      }
    }
  },
  {
    id: 'i3',
    type: 'communication',
    title: "3 family responses received",
    subtitle: "Grade 5 Science Exhibition",
    urgency: 'medium', 
    actions: {
      primary: { label: 'View Responses' }
    },
    deepLink: '/communication/science-exhibition',
    evidence: {
      header: "Family Engagement",
      detail: "3 parents responded to the Science Exhibition announcement, offering volunteer support and asking scheduling questions.",
      responses: [
        { parent: "Mrs. Patel (Meera's Mother)", comment: "I would love to volunteer for the setup on Thursday afternoon! Let me know what time to arrive." },
        { parent: "Mr. Reddy (Vihaan's Father)", comment: "Is there a specific dress code for the students presenting?" },
        { parent: "Dr. Singh (Kabir's Mother)", comment: "I can help judge the presentation slides if you still need volunteers." }
      ]
    }
  },
  {
    id: 'i4',
    type: 'reports',
    title: "Zoe's progress report drafted",
    subtitle: "Grade 5B · Report Assistant",
    status: "Ready for teacher review.",
    urgency: 'low', 
    actions: {
      primary: { label: 'Review' }
    },
    deepLink: '/reports/zoe-5b',
    evidence: {
      header: "Draft Report Comment",
      studentCount: 1,
      detail: "AI drafted a warm, evidence-backed progress report comment based on Zoe's portfolio entries and assessment history.",
      draftText: "Zoe has demonstrated outstanding curiosity and commitment in Science this term. Through her active participation in the group water-cycle project and an impressive 82% score on the subsequent quiz, she showed an excellent grasp of key processes. She collaborated effectively with peers, encouraging contributions and keeping the team organized.",
      evidenceLinked: [
        "3 portfolio entries (Water Cycle, Weather Journal)",
        "Science quiz score (82%)",
        "Peer collaboration rubric (Exceeds)"
      ],
      tone: "Warm, specific, evidence-backed"
    }
  },
  {
    id: 'i5',
    type: 'planning',
    title: "Continue Unit Flow",
    subtitle: "Ancient Civilizations · Week 2",
    urgency: 'low', 
    actions: {
      primary: { label: 'Continue' }
    },
    deepLink: '/planning/ancient-civilizations',
    evidence: {
      header: "Unit Planner",
      detail: "Continue designing lessons for Week 2 of the 'Ancient Civilizations' unit. 3 resources are currently drafted but unpublished.",
      draftResources: [
        "Interactive timeline builder",
        "Primary source analysis worksheet: Hammurabi's Code",
        "Discussion prompts on early river valleys"
      ]
    }
  }
];

export function prioritize(items, skippedCounts) {
  const URGENCY_ORDER = { high: 0, medium: 1, low: 2 };

  return [...items].sort((a, b) => {
    const skipsA = skippedCounts[a.id] || 0;
    const skipsB = skippedCounts[b.id] || 0;

    // Skip deferral
    if (skipsA === 1 && skipsB !== 1) return 1;
    if (skipsB === 1 && skipsA !== 1) return -1;

    // Urgency
    const urgencyDiff = URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;

    // Stable sort fallback
    return a.id.localeCompare(b.id);
  });
}
