const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function buildMockResult(topic) {
  const title = topic.trim()

  return {
    topic: title,
    generatedAt: new Date().toISOString(),
    confidence: 0.86,
    summary: {
      headline: `Autonomous brief on “${title}”`,
      overview: `A coordinated four-agent run scoped “${title}”, gathered current literature and public data, synthesized a structured narrative, and verified high-impact claims. This is a frontend mock until the research backend is wired in.`,
      keyFindings: [
        `The field around “${title}” is moving from isolated prototypes toward multi-agent pipelines that separate exploration, evidence, writing, and verification.`,
        'Highest-signal sources combine peer-reviewed literature, technical reports, and recent primary datasets rather than news summaries alone.',
        'Remaining uncertainty is concentrated in deployment cost, evaluation standards, and how well findings transfer across domains.',
        'A defensible next step is a narrow evidence review with explicit inclusion criteria and a verification checklist for every claim.',
      ],
      openQuestions: [
        'Which evaluation metrics should count as ground truth for this topic?',
        'Where do published results fail to transfer outside lab conditions?',
        'What data access or compute constraints would change the recommendation?',
      ],
    },
    sources: [
      {
        id: 's1',
        title: 'Survey of multi-agent research systems',
        authors: 'Kim, Rao, and Patel',
        year: 2025,
        type: 'Review',
        url: 'https://arxiv.org',
        note: 'Placeholder citation for literature mapping.',
      },
      {
        id: 's2',
        title: 'Evidence retrieval for autonomous scientific workflows',
        authors: 'Nguyen et al.',
        year: 2024,
        type: 'Conference',
        url: 'https://dl.acm.org',
        note: 'Placeholder for retrieval and ranking methods.',
      },
      {
        id: 's3',
        title: 'Verification protocols for generated research briefs',
        authors: 'OECD Science Policy Working Paper',
        year: 2025,
        type: 'Report',
        url: 'https://www.oecd.org',
        note: 'Placeholder for claim-checking guidance.',
      },
      {
        id: 's4',
        title: 'Open datasets catalog (mock index)',
        authors: 'Aether Lab data agent',
        year: 2026,
        type: 'Dataset',
        url: 'https://example.com/datasets',
        note: 'Replace with live corpus hits from the gathering agent.',
      },
    ],
    report: {
      title: `Research report: ${title}`,
      sections: [
        {
          heading: '1. Problem framing',
          body: `The exploration agent treated “${title}” as a bounded inquiry: what is known, what is contested, and which questions are worth answering first. It produced a working map of adjacent fields, stakeholder language, and likely failure modes before any drafting began.`,
        },
        {
          heading: '2. Evidence base',
          body: 'The data gathering agent assembled a mock corpus of reviews, primary papers, policy reports, and dataset indexes. In production this step should stream ranked documents with snippets, publication dates, and retrieval scores. For the demo, four representative sources stand in for that pipeline.',
        },
        {
          heading: '3. Synthesis',
          body: `The writing agent organized the brief around motivation, current approaches, trade-offs, and next experiments. The through-line is that “${title}” benefits from an explicit split of labor: explore, gather, write, then verify, rather than a single model producing an ungrounded essay.`,
        },
        {
          heading: '4. Verification notes',
          body: 'The verification agent marked this run as a mock with high demo fidelity and incomplete factual grounding. Claims that depend on live literature search are labeled as placeholders. Confidence is 86% for structure and workflow completeness, not for domain truth until the backend is connected.',
        },
        {
          heading: '5. Recommended next actions',
          body: 'Connect the four agents to real tools (search, paper APIs, citation graph, and a verifier). Persist runs, expose source snippets, and allow a human editor to accept or reject each finding before export.',
        },
      ],
    },
  }
}

export async function startResearchRun({ topic, onAgentUpdate }) {
  const steps = [
    {
      id: 'explore',
      duration: 900,
      status: 'running',
      detail: 'Scoping the topic and generating research questions…',
    },
    {
      id: 'explore',
      duration: 700,
      status: 'complete',
      detail: 'Mapped adjacent fields and 3 priority questions.',
    },
    {
      id: 'gather',
      duration: 1000,
      status: 'running',
      detail: 'Querying literature, reports, and dataset indexes…',
    },
    {
      id: 'gather',
      duration: 800,
      status: 'complete',
      detail: 'Ranked 4 placeholder sources for the demo corpus.',
    },
    {
      id: 'write',
      duration: 1100,
      status: 'running',
      detail: 'Drafting findings, narrative, and recommended actions…',
    },
    {
      id: 'write',
      duration: 700,
      status: 'complete',
      detail: 'Produced a five-section research brief.',
    },
    {
      id: 'verify',
      duration: 900,
      status: 'running',
      detail: 'Checking claims against cited sources…',
    },
    {
      id: 'verify',
      duration: 600,
      status: 'complete',
      detail: 'Flagged mock citations; structure verified.',
    },
  ]

  for (const step of steps) {
    onAgentUpdate?.(step)
    await delay(step.duration)
  }

  return buildMockResult(topic)
}

export function formatReportText(result) {
  const lines = [
    result.report.title,
    `Topic: ${result.topic}`,
    `Generated: ${new Date(result.generatedAt).toLocaleString()}`,
    `Confidence: ${Math.round(result.confidence * 100)}% (mock)`,
    '',
    'SUMMARY',
    result.summary.overview,
    '',
    'KEY FINDINGS',
    ...result.summary.keyFindings.map((item, index) => `${index + 1}. ${item}`),
    '',
    'OPEN QUESTIONS',
    ...result.summary.openQuestions.map((item) => `- ${item}`),
    '',
    'FULL REPORT',
    ...result.report.sections.flatMap((section) => ['', section.heading, section.body]),
    '',
    'SOURCES',
    ...result.sources.map(
      (source, index) =>
        `[${index + 1}] ${source.authors} (${source.year}). ${source.title}. ${source.type}. ${source.url}`,
    ),
    '',
    '— Generated by Aether Lab (Track 2: AI Research Team). Backend placeholders in use.',
  ]

  return lines.join('\n')
}
