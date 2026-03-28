import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getAllPostSlugs, getPostData } from "@/lib/blogs"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {
      title: "Post Not Found | pAI",
    }
  }

  return {
    title: `${post.title} | pAI`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blogsupdates"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to updates
          </Link>

          <header className="mb-12 border-b border-border pb-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Blog Update
            </p>
            <h1 className="mb-5 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span aria-hidden="true">/</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div className="rounded-2xl border border-border bg-card/60 p-6 md:p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 text-base leading-8 text-muted-foreground last:mb-0">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 space-y-3 pl-5 text-base leading-8 text-muted-foreground list-disc">
                    {children}
                  </ul>
                ),
                li: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return (
                      <Link
                        href={href}
                        className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-muted-foreground"
                      >
                        {children}
                      </Link>
                    )
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-muted-foreground"
                    >
                      {children}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )
                },
                hr: () => <hr className="my-8 border-border" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
