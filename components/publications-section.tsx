import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"
import publicationsData from "@/app/data/publications.json"

const publications = publicationsData.slice(0, 5)

export function PublicationsSection() {
  return (
    <section id="publications" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-border pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Publications
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Recent work from PoggioAI.
            </p>
          </div>
          <Link
            href="/publications"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors shrink-0"
          >
            View all publications
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {publications.map((pub, index) => (
            <Link
              key={index}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              <div className="md:w-20 shrink-0 flex flex-col items-start gap-1">
                <span className="text-sm text-muted-foreground">{pub.year}</span>
                {pub.pdfLink && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                    PDF available
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors mb-2 text-pretty">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
                <p className="text-sm font-medium text-foreground/70">{pub.venue}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
