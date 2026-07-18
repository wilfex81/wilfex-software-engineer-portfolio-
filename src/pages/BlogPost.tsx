import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogBySlug } from '../lib/blog';
import { ArrowLeft, Calendar, Clock, User, Share2, Check, Copy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../components/Mermaid';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';



const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  useEffect(() => {
    if (!blog) {
      // Typically you might redirect to 404 here, but simple redirect to list is fine for now
      // navigate('/blogs'); 
    }
  }, [blog, navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-light mb-4">Post not found</h1>
        <button 
           onClick={() => navigate('/blogs')}
           className="text-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {blog && (
        <Helmet>
          <title>{blog.title} | Wilfex Kipchirchir</title>
          <meta name="description" content={blog.description} />
          <meta name="author" content={blog.author} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://wilfex-software-engineer-portfolio.vercel.app/blogs/${slug}`} />

          {/* Open Graph */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://wilfex-software-engineer-portfolio.vercel.app/blogs/${slug}`} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.description} />
          <meta property="og:image" content="https://wilfex-software-engineer-portfolio.vercel.app/wilfex.jpeg" />
          <meta property="og:site_name" content="Wilfex Kipchirchir" />
          <meta property="article:author" content={blog.author} />
          <meta property="article:published_time" content={blog.date} />
          {blog.tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={`https://wilfex-software-engineer-portfolio.vercel.app/blogs/${slug}`} />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:description" content={blog.description} />
          <meta name="twitter:image" content="https://wilfex-software-engineer-portfolio.vercel.app/wilfex.jpeg" />
          <meta name="twitter:creator" content="@wilfex" />

          {/* JSON-LD Article Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": blog.title,
              "description": blog.description,
              "author": {
                "@type": "Person",
                "name": blog.author,
                "url": "https://wilfex-software-engineer-portfolio.vercel.app"
              },
              "publisher": {
                "@type": "Person",
                "name": "Wilfex Kipchirchir",
                "url": "https://wilfex-software-engineer-portfolio.vercel.app"
              },
              "datePublished": blog.date,
              "dateModified": blog.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://wilfex-software-engineer-portfolio.vercel.app/blogs/${slug}`
              },
              "keywords": blog.tags.join(", "),
              "image": "https://wilfex-software-engineer-portfolio.vercel.app/wilfex.jpeg"
            })}
          </script>
        </Helmet>
      )}
      <Navbar />
      
      <main className="flex-grow pt-28 pb-24">
        <article className="container mx-auto container-padding max-w-4xl">
          {/* Header */}
          <header className="mb-16">
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to all posts
            </button>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.15] text-foreground">
              {blog.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {blog.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground pt-6 border-t border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-primary/10 rounded-full">
                   <User size={14} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-muted-foreground/70" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-muted-foreground/70" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h1:text-3xl prose-h1:mt-16 prose-h1:mb-8
            prose-h2:text-2xl prose-h2:mt-20 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-4
            prose-h3:text-xl prose-h3:mt-14 prose-h3:mb-5
            prose-h4:text-lg prose-h4:mt-10 prose-h4:mb-4
            prose-p:leading-[1.9] prose-p:text-muted-foreground prose-p:mb-6
            prose-li:text-muted-foreground prose-li:my-3 prose-li:leading-[1.8]
            prose-ul:my-8 prose-ol:my-8 prose-ul:pl-6 prose-ol:pl-6
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-secondary/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-muted-foreground prose-blockquote:my-10
            prose-strong:text-foreground prose-strong:font-bold
            prose-code:text-primary prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
            prose-hr:border-border/50 prose-hr:my-16
            prose-table:my-10 prose-th:bg-secondary/50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-td:border-border/30
            prose-pre:my-8 prose-pre:p-0 prose-pre:bg-transparent">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className, node, ref, ...rest} = props;
                  const match = /language-(\w+)/.exec(className || '');

                  if (match && match[1] === 'mermaid') {
                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                  }

                  return match ? (
                    <div className="rounded-xl overflow-hidden border border-border/40 my-8 shadow-lg">
                      <div className="bg-[#1d1f21] px-4 py-2 border-b border-border/20 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2 font-mono">{match[1]}</span>
                      </div>
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={atomDark}
                        customStyle={{
                          margin: 0,
                          padding: '1.25rem',
                          background: '#1d1f21',
                          fontSize: '0.9rem',
                          lineHeight: '1.7',
                        }}
                      />
                    </div>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {blog.content}
            </Markdown>
          </div>
          
          {/* Footer of article */}
          <footer className="mt-20 pt-10 border-t border-border/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1.5 bg-secondary/80 text-secondary-foreground rounded-full border border-border/30 hover:bg-secondary transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-secondary/50"
                onClick={async () => {
                  const shareData = {
                    title: blog.title,
                    text: blog.description,
                    url: window.location.href,
                  };

                  // Use native share on mobile if available
                  if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      // User cancelled or error
                    }
                  } else {
                    // Fallback to clipboard
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!', {
                      description: 'Share this article with your friends.',
                      duration: 3000,
                    });
                  }
                }}
              >
                <Share2 size={16} />
                Share this post
              </button>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
