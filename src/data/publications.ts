export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  pdfLink?: string;
};

export const publications: Publication[] = [
  {
    title: "Agentic Systems as Boosting Weak Reasoning Models",
    authors: "Sunkaraneni, V.*, Beneventano, P.*, Neumarker, R., Poggio, T., Galanti, T.",
    venue: "arXiv, May 2026",
    year: "2026",
    link: "https://arxiv.org/abs/2605.14163",
    pdfLink: "https://arxiv.org/pdf/2605.14163",
  },
  {
    title: "Distribution-Aware Algorithm Design with LLM Agents",
    authors: "Koganti, S., Mishra, P., Beneventano, P., Galanti, T.",
    venue: "arXiv, May 2026; revised June 2026",
    year: "2026",
    link: "https://arxiv.org/abs/2605.14141",
    pdfLink: "https://arxiv.org/pdf/2605.14141",
  },
  {
    title: "Agent Systems for Academic Research Automation: An Evolving Survey",
    authors:
      "Beneventano, P.*, Neumarker, R.*, Abdelmoneum, M., Bacvanski, M., Gan, Y., Hajoub, M., Liao, Q., Rimoldi, E., Tiwary, K., Ziyin, L., Galanti, T., Evgeniou, T., Poggio, T.",
    venue: "Living Survey, MIT, April 2026",
    year: "2026",
    link: "/papers/survey-of-ai-for-research-v0/",
    pdfLink: "/papers/Survey_of_AI_for_Research__TRUE_VERSION_-2.pdf",
  },
  {
    title: "pAI/MSc: ML Theory Research with Humans on the Loop",
    authors: "Abdelmoneum, M.*, Beneventano, P.*, Poggio, T.",
    venue: "Technical Report, MIT, March 2026",
    year: "2026",
    link: "/papers/poggioai-msc-v0/",
    pdfLink: "/papers/pAI_technical_report.pdf",
  },
];
