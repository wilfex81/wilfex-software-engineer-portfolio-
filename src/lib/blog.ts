import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  readTime: string;
  tags: string[];
}

export const getBlogs = (): BlogPost[] => {
  const modules = import.meta.glob('/src/blogs/*.md', { as: 'raw', eager: true });
  
  const blogs: BlogPost[] = [];
  
  for (const path in modules) {
    const content = modules[path] as string;
    const { data, content: markdownContent } = matter(content);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    // Calculate read time (rough estimate: 200 words per minute)
    const words = markdownContent.split(/\s+/).length;
    const readTime = Math.ceil(words / 200) + ' min read';

    blogs.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? new Date(data.date).toLocaleDateString() : new Date().toLocaleDateString(),
      author: data.author || 'Wilfex Kipchirchir',
      content: markdownContent,
      readTime,
      tags: data.tags || []
    });
  }
  
  // Sort by date (newest first)
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  const blogs = getBlogs();
  return blogs.find(blog => blog.slug === slug);
};
