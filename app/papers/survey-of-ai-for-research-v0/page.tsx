import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

const siteUrl = "https://poggioai.github.io"
const landingPath = "/papers/survey-of-ai-for-research-v0/"
const pdfPath = "/papers/survey-of-ai-for-research-v0.pdf"
const landingUrl = `${siteUrl}${landingPath}`
const pdfUrl = `${siteUrl}${pdfPath}`

const title = "Agent Systems for Academic Research Automation: An Evolving Survey"
const authors = [
  "Pierfrancesco Beneventano",
  "Riccardo Neumarker",
  "Mahmoud Abdelmoneum",
  "Marc Bacvanski",
  "Yulu Gan",
  "Mehdi Hajoub",
  "Qianli Liao",
  "Emanuele Rimoldi",
  "Kushagra Tiwary",
  "Liu Ziyin",
  "Tomer Galanti",
  "Theodoros Evgeniou",
  "Tomaso Poggio",
]
const description =
  "A living survey of agent systems for academic research automation, covering recurring engineering principles, system families, and verification regimes."
const abstract =
  "Agentic systems are beginning to reshape scholarly work, e.g., they can now design experiments, develop mathematical arguments, generate full academic papers, peer reviews, and rebuttals. This raises a natural question: to what extent can research itself be automated? The recent history of research automation can be read as a progression from retrieval and indexing, to citation linking, to summarization, and finally to end-to-end agentic systems. This survey examines the agentic systems most directly relevant to that question, namely those whose primary outputs are scholarly artifacts. First, we distill the recurring engineering principles and architectural patterns in current systems. Second, we propose a compact conceptual framework for identifying how to map the systems within the landscape as the field evolves. For the latter, we organize these systems along three dimensions: the phases of the research process a system covers, the kind of artifacts it produces, and the verification regime that governs its principal claims. Because this area is evolving faster than traditional publication cycles can accommodate, we treat the survey as a living document, updated regularly to track one of the fastest-moving developments in contemporary research automation."

export const metadata: Metadata = {
  title: `${title} | pAI`,
  description,
  alternates: {
    canonical: landingUrl,
  },
  openGraph: {
    title,
    description,
    type: "article",
    url: landingUrl,
    siteName: "pAI",
  },
  authors: authors.map((name) => ({ name })),
  other: {
    citation_title: title,
    citation_author: authors,
    citation_publication_date: "2026/04/02",
    citation_online_date: "2026/04/07",
    citation_language: "en",
    citation_abstract_html_url: landingUrl,
    citation_pdf_url: pdfUrl,
    citation_fulltext_html_url: landingUrl,
    citation_keywords: [
      "agent systems",
      "agentic systems",
      "academic research automation",
      "survey",
      "living document",
    ],
    "dc.title": title,
    "dc.creator": authors,
    "dc.date": "2026-04-02",
    "dc.description": abstract,
    "dc.identifier": landingUrl,
    "dc.type": "Text",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: title,
  name: title,
  description,
  abstract,
  url: landingUrl,
  datePublished: "2026-04-02",
  dateModified: "2026-04-07",
  inLanguage: "en",
  author: authors.map((name) => ({
    "@type": "Person",
    name,
  })),
  publisher: {
    "@type": "Organization",
    name: "pAI",
    url: siteUrl,
  },
  isAccessibleForFree: true,
  encoding: {
    "@type": "MediaObject",
    encodingFormat: "application/pdf",
    contentUrl: pdfUrl,
  },
}

export default function SurveyOfAIForResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/publications"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to publications
          </Link>

          <div className="rounded-3xl border border-border bg-card/60 p-8 md:p-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Living Survey
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              {title}
            </h1>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>{authors.join(", ")}</p>
              <p>Massachusetts Institute of Technology; NTT Research; Texas A&amp;M University; INSEAD</p>
              <p>Version 1 posted April 2, 2026. Website entry added April 7, 2026.</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Open PDF
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <article className="rounded-3xl border border-border bg-background p-8">
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-semibold tracking-tight">Abstract</h2>
              </div>
              <p className="text-base leading-8 text-muted-foreground">{abstract}</p>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-card/40 p-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Links
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-foreground transition-colors hover:bg-muted"
                  >
                    <span>PDF survey</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card/40 p-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Citation
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Beneventano, P., Neumarker, R., Abdelmoneum, M., Bacvanski, M.,
                  Gan, Y., Hajoub, M., Liao, Q., Rimoldi, E., Tiwary, K., Ziyin, L.,
                  Galanti, T., Evgeniou, T., and Poggio, T.{" "}
                  <span className="italic">{title}</span>. Living Survey,
                  Massachusetts Institute of Technology, 2026.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
