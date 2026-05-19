import NeutralizeImg from '../../assets/neutralize.png';

export const neutralize = {
  meta: {
    name: 'Neutralize',
    tagline:
      'A Chrome extension that surfaces bias in the news articles you read, in real time.',
    status: 'All Ireland Hackathon Finalist',
    role: 'Team Lead',
    teamSize: '4',
    timeline: 'February 2025',
    techStack: [
      'JavaScript',
      'Chrome Extensions API',
      'Python',
      'Multi-model LLM',
      'Web Scraping',
    ],
    heroImage: NeutralizeImg,
    liveUrl: 'https://www.neutralise.net',
    repoUrl: null, // fill in when public
  },

  tldr: "Neutralize is a Chrome extension that analyzes news articles for bias using multiple language models in parallel, then surfaces the disagreement between them as a signal. Built in 30 hours at the All Ireland Hackathon by a team of four, it reached the finals and is in the process ofbeing shipped to the Chrome Web Store. The target user is anyone who reads news online and wants a lightweight, ambient check on the framing of what they're reading.",

  problem: {
    summary:
      'Most people read news without a clear sense of where the framing comes from. Bias detection tools exist but live in academic papers or standalone websites, both of which require leaving the article and going somewhere else. Almost no one does that.',
    user: "Casual but engaged news readers — people who care about being well-informed but don't have time to cross-reference every article.",
    whyNow:
      'The combination of cheap multi-model LLM access and a polarized media environment makes ambient, passive bias detection finally feasible. A year ago this would have been either too expensive to run on every page view or too slow to feel ambient.',
    anecdote: null, // add a motivating moment here if there is one
  },

  decisions: [
    {
      decision: 'Multi-model analysis instead of a single bias score',
      why: "A single model's bias judgment is itself biased, and presenting it as authoritative would undermine the whole point. Running multiple models in parallel and surfacing where they agree (high confidence) and disagree (low confidence) gives the user a more honest signal than any single number.",
      tradeoff:
        'Higher latency, higher cost, and a more complex UI to explain. We accepted these because the alternative was just building "yet another sentiment analysis tool."',
    },
    {
      decision: 'Chrome extension instead of a web app',
      why: "Bias analysis has to happen where the reading happens. Asking someone to copy-paste a URL into a separate tool is friction that kills the use case. The extension meets users on the article page they're already on.",
      tradeoff:
        'Limited to Chromium browsers at launch. Distribution is harder — Web Store review, no inbound SEO.',
    },
    // Add a third decision here: the most debated call on the team
    // e.g. client-side vs server-side scraping, which models to include, how much UI to show
  ],

  howItWorks: {
    overview:
      'The extension injects a content script that detects when the user is on a news article page and extracts the article text. That text is sent to a Python backend, which runs the article through multiple LLMs in parallel and computes both an aggregated bias signal and an inter-model agreement score. Results come back to the extension and are surfaced as an overlay on the page.',
    architectureBullets: [
      'Chrome extension (JavaScript): content script, background worker, popup UI',
      'Python backend: article preprocessing, multi-model orchestration, result aggregation',
      'LLM ensemble: multiple models running in parallel for independent bias judgments',
      // fill in: which models, where the backend is hosted
    ],
  },

  retrospective: [
    'Validate the bias signal with real users before tuning it. We tuned prompts and thresholds based on team intuition during the hackathon. A small structured study — even 10 people — would have caught blind spots faster than another week of internal iteration.',
    // add 1-2 more specific reflections here
  ],

  metrics: {
    northStar:
      'Weekly active users who keep the extension installed past 30 days. Bias analysis is only useful as a habit, not a one-time curiosity.',
    shipped: false,
    speculative: [
      {
        name: 'Install count and 7-day retention',
        why: 'The primary early signal for whether the extension has a market.',
      },
      {
        name: 'Articles analyzed per active user per week',
        why: 'Engagement depth — are users building the habit?',
      },
      {
        name: 'Uninstall rate and the action that preceded it',
        why: 'The most informative failure signal. What broke the experience?',
      },
    ],
  },
};
