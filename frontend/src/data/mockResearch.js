const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function slugify(topic) {
  return topic
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48) || 'research-topic'
}

export function buildMockResearch(topic) {
  const trimmed = topic.trim()
  const generatedAt = new Date().toISOString()

  return {
    topic: trimmed,
    generatedAt,
    confidence: 0.86,
    summary: {
      headline: `Autonomous brief on “${trimmed}”`,
      overview: `The research team scoped “${trimmed}”, gathered representative sources, synthesized a structured brief, and verified the highest-impact claims. This mock run demonstrates the Track 2 pipeline; swap the placeholder API for a live backend when ready.`,
      highlights: [
        `Primary research question: What is the current state of knowledge around ${trimmed}?`,
        'Evidence base spans peer-reviewed literature, technical reports, and practitioner sources.',
        'Synthesis emphasizes consensus findings, open debates, and practical implications.',
        'Verification flagged no critical contradictions in the mock corpus; residual uncertainty is noted in limitations.',
      ],
      keyFindings: [
        {
          title: 'Landscape',
          body: `${trimmed} sits at the intersection of rapidly evolving methods and uneven real-world adoption. Core techniques are maturing, while evaluation standards still vary by domain.`,
        },
        {
          title: 'Opportunities',
          body: `The most actionable opportunities around ${trimmed} are tighter evaluation protocols, better data provenance, and human-in-the-loop review of high-stakes outputs.`,
        },
        {
          title: 'Risks',
          body: `Key risks include over-generalizing from limited samples, citation drift, and treating correlation as causal evidence. The verification agent recommends conservative claims until primary studies are confirmed.`,
        },
      ],
    },
    sources: [
      {
        id: 's1',
        title: `Foundational survey: ${trimmed}`,
        authors: 'Chen, A. et al.',
        year: '2024',
        type: 'Journal article',
        url: 'https://example.org/papers/foundational-survey',
        relevance: 'High',
      },
      {
        id: 's2',
        title: `Empirical evaluation of methods for ${trimmed}`,
        authors: 'Patel, R. & Gómez, L.',
        year: '2025',
        type: 'Conference paper',
        url: 'https://example.org/papers/empirical-eval',
        relevance: 'High',
      },
      {
        id: 's3',
        title: 'Open dataset and benchmark notes',
        authors: 'Open Research Collective',
        year: '2025',
        type: 'Dataset / technical report',
        url: 'https://example.org/datasets/benchmark-notes',
        relevance: 'Medium',
      },
      {
        id: 's4',
        title: 'Practitioner briefing and policy implications',
        authors: 'Institute for Applied Science',
        year: '2023',
        type: 'White paper',
        url: 'https://example.org/briefs/policy',
        relevance: 'Medium',
      },
    ],
    report: {
      title: `Research Report: ${trimmed}`,
      sections: [
        {
          heading: '1. Abstract',
          body: `This report summarizes an autonomous multi-agent investigation of ${trimmed}. Exploration defined scope and sub-questions; gathering assembled a mock evidence set; synthesis produced the narrative below; verification scored claim confidence.`,
        },
        {
          heading: '2. Research questions',
          body: `RQ1: How is ${trimmed} currently defined and measured?\nRQ2: What methods and datasets dominate the recent literature?\nRQ3: Where do findings agree, and where do they conflict?\nRQ4: What should a decision-maker do next?`,
        },
        {
          heading: '3. Methods (pipeline)',
          body: 'The team ran four sequential agents. Exploration produced a question tree. Data gathering retrieved ranked sources. Writing/synthesis drafted structured sections with inline citations. Verification checked claim–source alignment and assigned an overall confidence of 86% on this mock corpus.',
        },
        {
          heading: '4. Findings',
          body: `Consensus exists around the importance of rigorous evaluation for ${trimmed}. Recent work emphasizes transparency of data sources and reproducibility of pipelines. Remaining debates concern generalization, cost–quality tradeoffs, and how far automated synthesis can go without expert review.`,
        },
        {
          heading: '5. Limitations',
          body: 'This frontend currently uses mock API placeholders. Source URLs, statistics, and citations are illustrative. A production backend should replace this payload with live retrieval, ranking, and verification traces.',
        },
        {
          heading: '6. Recommended next steps',
          body: `Connect the Start Research action to the Track 2 backend. Persist run IDs, stream agent events over WebSockets or SSE, and render real citations in the sources panel. For ${trimmed}, prioritize a live literature search and a human review pass on high-stakes claims.`,
        },
      ],
    },
    downloadSlug: slugify(trimmed),
  }
}

export function formatReportMarkdown(result) {
  const lines = [
    `# ${result.report.title}`,
    '',
    `Topic: ${result.topic}`,
    `Generated: ${new Date(result.generatedAt).toLocaleString()}`,
    `Overall confidence: ${Math.round(result.confidence * 100)}%`,
    '',
    '## Summary',
    result.summary.overview,
    '',
    '## Highlights',
    ...result.summary.highlights.map((item) => `- ${item}`),
    '',
    '## Key findings',
    ...result.summary.keyFindings.flatMap((finding) => [
      `### ${finding.title}`,
      finding.body,
      '',
    ]),
    '## Full report',
    ...result.report.sections.flatMap((section) => [
      `### ${section.heading}`,
      section.body,
      '',
    ]),
    '## Sources',
    ...result.sources.map(
      (source, index) =>
        `${index + 1}. ${source.authors} (${source.year}). ${source.title}. ${source.type}. ${source.url}`,
    ),
    '',
    '_Generated by Aether Lab — AI Research Team (Track 2 demo)._',
  ]

  return lines.join('\n')
}

const AGENT_LOGS = {
  explore: [
    'Parsing topic and extracting entities…',
    'Building question tree and scope constraints…',
    'Exploration complete. Handing off to data gathering.',
  ],
  gather: [
    'Querying mock literature index…',
    'Ranking papers, reports, and datasets…',
    'Evidence pack ready. Starting synthesis.',
  ],
  write: [
    'Outlining report sections…',
    'Drafting findings with placeholder citations…',
    'Synthesis complete. Sending draft to verification.',
  ],
  verify: [
    'Checking claim–source alignment…',
    'Scoring confidence and listing limitations…',
    'Verification complete. Research run finished.',
  ],
}

export async function runMockResearch(topic, { onAgentUpdate, signal } = {}) {
  const agentIds = ['explore', 'gather', 'write', 'verify']

  for (const id of agentIds) {
    if (signal?.aborted) {
      throw new DOMException('Research cancelled', 'AbortError')
    }

    const logs = AGENT_LOGS[id]
    onAgentUpdate?.({ id, status: 'running', log: logs[0] })
    await delay(700)
    onAgentUpdate?.({ id, status: 'running', log: logs[1] })
    await delay(800)
    onAgentUpdate?.({ id, status: 'complete', log: logs[2] })
  }

  await delay(350)
  return buildMockResearch(topic)
}
