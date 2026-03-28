import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Settings, Terminal, ServerCog } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Docs | pAI",
  description: "Documentation hub for pAI MSc.",
}

const guides = [
  {
    title: "Getting Started",
    description: "Install MSc, run setup, and generate a first paper.",
    icon: BookOpen,
    href: "https://github.com/PoggioAI/PoggioAI.github.io/blob/main/docs-src/docs/getting-started.md",
  },
  {
    title: "Configuration",
    description: "Environment variables, budgets, and model selection.",
    icon: Settings,
    href: "https://github.com/PoggioAI/PoggioAI.github.io/blob/main/docs-src/docs/configuration.md",
  },
  {
    title: "Usage",
    description: "Single runs, campaigns, counsel mode, and output flow.",
    icon: Terminal,
    href: "https://github.com/PoggioAI/PoggioAI.github.io/blob/main/docs-src/docs/usage.md",
  },
  {
    title: "HPC / SLURM Setup",
    description: "Cluster deployment guidance for larger runs.",
    icon: ServerCog,
    href: "https://github.com/PoggioAI/PoggioAI.github.io/blob/main/docs-src/docs/setup.md",
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Documentation
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 text-balance">
              pAI MSc Docs
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The full MSc documentation lives alongside the project repo. This page is a lightweight hub to the setup,
              configuration, usage, and cluster guides that ship with the site source.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://github.com/PoggioAI/PoggioAI_MSc/tree/MSc_Prod"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Project Repository
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/PoggioAI/PoggioAI.github.io/tree/main/docs-src/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground px-5 py-3 text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Docs Source
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <a
                key={guide.title}
                href={guide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <guide.icon className="w-5 h-5 text-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {guide.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                  Open guide
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-background p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looking for the main site overview instead?
              {" "}
              <Link href="/" className="text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4">
                Return to the homepage
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
