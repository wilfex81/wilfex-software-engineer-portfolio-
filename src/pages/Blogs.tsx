import React, { useState, useMemo } from 'react';
import { getBlogs } from '../lib/blog';
import { ArrowRight, Calendar, Clock, User, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allBlogs = getBlogs();

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return allBlogs;
    
    const query = searchQuery.toLowerCase();
    return allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, allBlogs]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Blog | Wilfex Kipchirchir - AI, Software Engineering & Tech</title>
        <meta name="description" content="Exploring the frontiers of AI, software engineering, and the future of tech. Read tutorials on GenAI, Node.js, Python, cloud infrastructure, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://wilfex-software-engineer-portfolio.vercel.app/blogs" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wilfex-software-engineer-portfolio.vercel.app/blogs" />
        <meta property="og:title" content="Blog | Wilfex Kipchirchir" />
        <meta property="og:description" content="Exploring the frontiers of AI, software engineering, and the future of tech." />
        <meta property="og:image" content="https://wilfex-software-engineer-portfolio.vercel.app/wilfex.jpeg" />
        <meta property="og:site_name" content="Wilfex Kipchirchir" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://wilfex-software-engineer-portfolio.vercel.app/blogs" />
        <meta name="twitter:title" content="Blog | Wilfex Kipchirchir" />
        <meta name="twitter:description" content="Exploring the frontiers of AI, software engineering, and the future of tech." />
        <meta name="twitter:image" content="https://wilfex-software-engineer-portfolio.vercel.app/wilfex.jpeg" />
        <meta name="twitter:creator" content="@wilfex" />

        {/* JSON-LD Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Wilfex Kipchirchir's Blog",
            "description": "Exploring the frontiers of AI, software engineering, and the future of tech",
            "url": "https://wilfex-software-engineer-portfolio.vercel.app/blogs",
            "author": {
              "@type": "Person",
              "name": "Wilfex Kipchirchir",
              "url": "https://wilfex-software-engineer-portfolio.vercel.app"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-28 pb-24">
        <div className="container mx-auto container-padding max-w-7xl">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-5">
              Insights & Thoughts
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Blog
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-lg mb-10">
              Exploring the frontiers of AI, software engineering, and the future of tech.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3.5 border border-border/60 rounded-full leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-sm hover:shadow-md text-sm"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBlogs.map((blog, index) => (
              <a
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col h-full bg-card rounded-2xl border border-border/40 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="p-7 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-muted-foreground/70" />
                      {blog.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-muted-foreground/70" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 bg-secondary/60 text-secondary-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 bg-secondary/60 text-secondary-foreground rounded-full">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium pt-5 border-t border-border/30 mt-auto">
                    <span className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight size={14} />
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <User size={12} />
                      {blog.author.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg mb-2">
                {searchQuery ? `No results found for "${searchQuery}"` : "No posts found."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary hover:underline font-medium text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blogs;
