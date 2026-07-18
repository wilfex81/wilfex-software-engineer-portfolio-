import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  clientMessage?: string;
  longDescription?: string;
  rating?: number;
}

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectsData: ProjectData[] = [
    {
      title: "CurioBot",
      description:
        "A friendly AI learning companion for curious kids. Ask anything about space, dinosaurs, science, or the world — and get answers that actually make sense to an 11-year-old.",
      techStack: [
        "FastAPI",
        "React",
        "PostgreSQL",
        "OpenAI",
        "Google Gemini",
        "Tailwind CSS",
      ],
      liveLink: "https://github.com/wilfex81/CurioBot.git",
      longDescription:
        "The internet wasn't built to answer a kid's questions. CurioBot fixes that. Kids aged 8-14 can chat with an AI that talks like a friendly older friend — using stories, analogies, and fun facts instead of jargon. Powered by GPT-4o Mini and Gemini 2.5 Flash with a factory pattern for easy provider swapping, built-in session limits to keep conversations intentional, and a playful React frontend with Framer Motion animations.",
      rating: 5,
    },
    {
      title: "ConsensusAI",
      description:
        "When one AI isn't enough. Orchestrate GPT-4, Claude, Gemini, and Grok to debate, evaluate, and synthesize the most well-reasoned answers through collective intelligence.",
      techStack: [
        "FastAPI",
        "React",
        "Vite",
        "OpenAI",
        "Claude",
        "Gemini",
        "Grok",
      ],
      liveLink: "https://github.com/wilfex81/ConsensusAI.git",
      longDescription:
        "What happens when the world's most powerful AI models work together instead of competing? ConsensusAI orchestrates a three-stage collaborative process: multiple leading LLMs (GPT-4, Claude, Gemini, Grok) independently respond to your query, then anonymously peer-review each other's answers, and finally synthesize a unified consensus response. The result? Answers that are more nuanced, well-reasoned, and reliable than any single model could provide. Full transparency lets you see how each model contributed to the final answer.",
      rating: 5,
    },
    {
      title: "MediBot",
      description:
        "Your AI health companion that understands symptoms, explains medications, and provides wellness guidance—powered by OpenAI and Gemini.",
      techStack: ["JavaScript", "Python", "OpenAI", "Google Gemini", "CSS"],
      liveLink: "https://github.com/wilfex81/Medibot.git",
      longDescription:
        "Healthcare information should be accessible to everyone. MediBot is an intelligent health assistant that helps you understand symptoms, learn about medications, get wellness tips, and access general health information through natural conversation. Powered by advanced AI models from OpenAI and Google Gemini, it provides thoughtful, well-researched responses while always recommending professional medical consultation for serious concerns. Multi-provider AI integration ensures reliable and comprehensive health guidance.",
      rating: 4,
    },
    {
      title: "TalkDoc",
      description:
        "Turn boring documentation into engaging audio explanations. AI-powered voice synthesis that makes your markdown sound human.",
      techStack: ["Python", "OpenAI TTS", "Docker", "FFmpeg", "Shell"],
      liveLink: "https://github.com/wilfex81/TalkDoc.git",
      longDescription:
        "Documentation doesn't have to be a chore. TalkDoc transforms your markdown files into professional audio explanations that sound like a knowledgeable colleague walking you through concepts—not a robot reading text. With 6 different AI voices, intelligent markdown parsing that handles code blocks and tables gracefully, and Docker-powered audio processing, TalkDoc makes technical documentation accessible for commutes, workouts, or anyone who learns better by listening.",
      rating: 4,
    },
    {
      title: "Deployment Handbook",
      description:
        "The ultimate guide to shipping code to production. From zero to deployed on Ubuntu VPS with Nginx, Docker, SSL, and CI/CD.",
      techStack: [
        "Nginx",
        "Docker",
        "Let's Encrypt",
        "GitHub Actions",
        "Ubuntu",
      ],
      liveLink: "https://github.com/wilfex81/deployment-handbook.git",
      longDescription:
        "Stop Googling 'how to deploy Node.js to VPS' every time. The Deployment Handbook is a comprehensive, battle-tested guide covering everything from initial server setup to production-grade deployments. Learn Nginx configuration, SSL certificates with Let's Encrypt, Docker containerization, multi-environment setups, GitHub Actions CI/CD, webhook automation, and operational monitoring. Whether you're deploying Node.js, Python, or Go applications, this handbook has you covered.",
      rating: 4,
    },
    {
      title: "Colabrix (Building...)",
      description:
        "Your AI copilot for project management. Automate workflows, predict bottlenecks, and ship faster with intelligent task orchestration and real-time team sync.",
      techStack: [
        "Node.js",
        "Next.js",
        "React",
        "GenAI",
        "Socket.io",
        "GitHub Integration",
      ],
      liveLink: "https://colabrix.com",
      longDescription:
        "Imagine a project management tool that thinks like your best teammate. Colabrix uses cutting-edge AI to automatically prioritize tasks, predict project risks, and suggest optimal workflows based on your team's patterns. With real-time collaboration powered by WebSockets, seamless GitHub integration for developer workflows, and intelligent insights that actually move the needle, Colabrix eliminates the busywork so your team can focus on building great products. No more status meetings, no more missed deadlines—just pure productivity.",
      rating: 0,
    },
    {
      title: "Tradescribe.in",
      description:
        "A stock data management and analysis platform designed to help users track, manage, and analyze market data efficiently.",
      techStack: [
        "Node.js",
        "React",
        "MongoDB",
        "TypeScript",
        "Docker",
        "WebSockets",
      ],
      liveLink: "https://tradescribe.in",
      clientMessage:
        "The platform has significantly improved our data analysis process, saving us hours of manual work each week.",
      longDescription:
        "Tradescribe.in is a comprehensive stock data management and analysis platform that helps financial analysts and traders track market trends, manage portfolios, and make data-driven decisions. The platform features real-time data visualization, custom alerts, and automated reporting to streamline the investment process.",
      rating: 4,
    },
    {
      title: "Spyke-AI",
      description:
        "The platform features a complete ecosystem where sellers upload premium prompts and automation tools, users discover and purchase digital solutions, and admins manage the thriving marketplace — all powered by cutting-edge technology for seamless transactions and instant downloads",
      techStack: [
        "Node.js",
        "Next.js",
        "Docker",
        "MongoDB",
        "Twilio",
        "Firebase",
      ],
      liveLink: "http://spykeai.com/",
      longDescription:
        "Spyke-AI is a comprehensive marketplace platform that enables sellers to upload and monetize premium prompts and automation tools. Users can discover and purchase digital solutions while admins oversee the marketplace operations. The platform features seamless transactions, instant downloads, and a robust ecosystem powered by cutting-edge technology to facilitate the exchange of AI-driven digital products.",
      rating: 5,
    },
    {
      title: "Petsu",
      description: "Caring Vets, Healthy Pets - Trust Us",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB"],
      liveLink: "https://petsu.in/",
      longDescription:
        "Petsu is a comprehensive veterinary platform that connects pet owners with qualified veterinarians. The platform facilitates appointment scheduling, health record management, and provides trusted veterinary care services to ensure the health and wellbeing of pets.",
      rating: 5,
    },
    {
      title: "Whisper AI",
      description: "Enterprise-grade speech-to-text that runs on your infrastructure. Zero cloud dependencies, infinite scalability, maximum privacy.",
      techStack: ["Python", "Flask", "Docker", "OpenAI Whisper"],
      liveLink: "https://github.com/wilfex81/whisper-open-ai.git",
      longDescription: "Stop paying per minute for transcriptions. Whisper AI is a production-ready, self-hosted API that turns audio into text with jaw-dropping accuracy across 99+ languages. Built with OpenAI's state-of-the-art Whisper model, containerized for instant deployment, and designed to handle everything from podcast episodes to customer calls. Your data stays yours, your costs stay predictable, and your transcriptions stay flawless.",
      rating: 5,
    },
    {
      title: "VerbIQ",
      description: "Never take meeting notes again. AI extracts decisions, action items, and insights from your calls—automatically.",
      techStack: ["Next.js", "OpenAI GPT-4", "Whisper AI"],
      liveLink: "https://github.com/wilfex81/verbiq.git",
      longDescription: "What if every meeting came with a personal assistant who captured every decision, tracked every commitment, and summarized the key insights? VerbIQ does exactly that. Upload your recording, and GPT-4 instantly extracts action items, sentiment, key decisions, and next steps. No more scrambling through hour-long transcripts or forgetting who committed to what. Just crystal-clear meeting intelligence that turns talk into action.",
      rating: 4,
    },
    {
      title: "ChangelogCraft",
      description: "Ship updates that users actually read. Beautiful, animated changelogs that turn release notes into marketing moments.",
      techStack: ["Next.js", "Markdown", "Tailwind CSS", "Framer Motion"],
      liveLink: "https://github.com/wilfex81/AI-Code-Reviewer.git",
      longDescription: "Release notes don't have to be boring. ChangelogCraft transforms your updates into stunning, animated experiences that users love to read. Write in simple Markdown, get a gorgeous changelog with smooth Framer Motion animations, responsive design, and professional polish. Perfect for SaaS products, developer tools, and anyone who ships features worth celebrating. Make every release feel like a product launch.",
      rating: 4,
    },
    {
      title: "EasyMeet",
      description: "Video calls without the friction. Crystal-clear HD, instant screen sharing, and zero downloads—just click and connect.",
      techStack: ["Next.js", "Stream.io SDK"],
      liveLink: "https://github.com/wilfex81/EasyMeet.git",
      longDescription: "Tired of clunky video conferencing tools? EasyMeet strips away the complexity and delivers what you actually need: HD video, crisp audio, instant screen sharing, and real-time chat—all in your browser. No downloads, no account required for guests, no 40-minute limits. Built with Stream.io's enterprise-grade infrastructure and Next.js for lightning-fast performance. Perfect for quick team syncs, client calls, or remote presentations.",
      rating: 4
    },
    {
      title: "Queryly (Building...)",
      description: "Upload your notes, get instant quizzes. AI that turns any PDF, lecture, or textbook into personalized practice tests.",
      techStack: ["Node.js", "OpenAI GPT-4", "React Native"],
      liveLink: "https://github.com/wilfex81/Queryly.git",
      longDescription: "Study smarter, not harder. Queryly uses a multi-agent AI system to digest your PDFs, lecture notes, and study materials, then generates intelligent quizzes tailored to your learning style. Whether you're prepping for exams, teaching a class, or mastering a new skill, Queryly creates practice questions that actually test understanding—not just memorization. Available on mobile so you can learn anywhere, anytime.",
      rating: 0,
    },
    {
      title: "Nessa",
      description:
        "A platform delivering sustainable and high-performance lighting solutions across 20+ countries.",
      techStack: ["Node.js", "React", "MongoDB", "Docker"],
      longDescription:
        "Nessa is an e-commerce platform specializing in sustainable lighting solutions. The platform includes product customization tools, energy savings calculators, and international shipping logistics to serve customers across more than 20 countries.",
      rating: 4,
    },
    {
      title: "Rabt-Naturals",
      description:
        "Rabt | Natural making sure your skin gets Good Better and Best",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB"],
      liveLink: "https://rabtnaturals.com/",
      longDescription:
        "Rabt-Naturals is a premium skincare e-commerce platform dedicated to providing natural and organic skincare products. The platform ensures customers receive the highest quality natural products with a focus on skin health and wellness. Features include product catalogs, customer reviews, secure payment processing, and personalized skincare recommendations.",
      rating: 4,
    },
    {
      title: "Promptly",
      description:
        "A versatile Discord bot for automating event reminders and announcements.",
      techStack: ["Node.js", "Docker", "Discord API"],
      liveLink: "https://github.com/wilfex81/Promptly",
      longDescription:
        "Promptly is a Discord bot that helps server administrators automate reminders and announcements. It features customizable scheduling, role-based notifications, and integration with external calendars.",
      rating: 4,
    },
    {
      title: "WoodLog",
      description:
        "An image-processing solution designed to assist post officers in efficiently counting logs.",
      techStack: ["Python", "Pandas", "YOLO", "Docker"],
      liveLink: "https://github.com/wilfex81/woodlog",
      longDescription:
        "WoodLog uses computer vision technology to automatically count and measure logs from images, saving postal officers significant time in inventory management. The solution processes images in real-time and generates detailed reports.",
      rating: 4,
    },
    {
      title: "EasyTechDBManager",
      description:
        "A comprehensive service to streamline MongoDB database and collection operations.",
      techStack: ["Node.js", "MongoDB"],
      liveLink: "https://github.com/wilfex81/EasyTechDBManager",
      longDescription:
        "EasyTechDBManager is a robust database management service tailored to simplify MongoDB database and collection operations. Designed for both small-scale projects and large-scale applications, it enables users to effortlessly create, manage, and maintain databases and collections. The platform provides an intuitive interface for CRUD operations, performance monitoring, backup management, and access control, making database administration more accessible and efficient.",
      rating: 4,
    },
    {
      title: "QuickPoll Public",
      description: "Create polls in 30 seconds, get results in real-time.",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB", "NextAuth"],
      liveLink: "https://github.com/wilfex81/QuickPoll.git",
      longDescription:
        "QuickPoll Public is a fast and efficient polling platform that enables users to create comprehensive polls in just 30 seconds and receive real-time results. The platform features user authentication, instant poll creation, real-time data visualization, and seamless sharing capabilities, making it perfect for quick decision-making, surveys, and gathering public opinion.",
      rating: 4,
    },
    {
      title: "dev-stack-factory",
      description:
        "Welcome to the Dev Stack Factory— where we manufacture battle-tested, production-ready full-stack templates! Skip the tedious setup and start building your next big idea with enterprise-grade architecture, modern tooling, and best practices baked right in.",
      techStack: [
        "Node.js",
        "React",
        "Docker",
        "Next.js",
        "Prisma",
        "MongoDB",
        "PostgreSQL",
      ],
      liveLink: "https://github.com/wilfex81/dev-stack-factory.git",
      longDescription:
        "Dev Stack Factory is a comprehensive collection of battle-tested, production-ready full-stack templates designed to accelerate development workflows. The platform provides developers with enterprise-grade architecture, modern tooling, and industry best practices pre-configured and ready to deploy. It eliminates the tedious setup process and enables developers to focus on building innovative solutions with confidence.",
      rating: 4,
    },
    {
      title: "Secure Repository",
      description:
        "A secure backup system utilizing GitHub Actions for automated backups post-merge, ensuring data integrity and safety.",
      techStack: ["Python-Django", "React", "MongoDB", "GitHub Actions"],
      longDescription:
        "Secure Repository provides organizations with a reliable backup solution that automatically creates secure backups after code merges. The system ensures data integrity and provides easy recovery options in case of data loss.",
      rating: 3,
    },
    {
      title: "Dowell Credit System",
      description:
        "A credit handling system for DoWell UX Living Lab's product APIs.",
      techStack: ["Django", "React", "Razorpay", "Stripe"],
      longDescription:
        "Dowell Credit System manages credits for all product API modules in DoWell UX Living Lab. Users can buy credits, activate product APIs before use, and track their transactions efficiently.",
      rating: 4,
    },
    {
      title: "My Fridge",
      description:
        "A smart storage solution that tracks fridge contents and expiry dates using QR codes.",
      techStack: ["Node.js", "BullMQ", "Flutter Flow", "MongoDB"],
      longDescription:
        "My Fridge helps users manage stored food by assigning master QR codes to containers. The app tracks expiry dates, sends notifications, and helps reduce food waste.",
      rating: 5,
    },
    {
      title: "College Finder Bot",
      description:
        "A Python bot that helps users find nearby colleges based on location and course interests.",
      techStack: ["Python", "NLP", "Geopy", "Flask"],
      liveLink: "https://github.com/wilfex81/college-finder-bot",
      longDescription:
        "College Finder Bot is a Python script designed to help users discover nearby colleges based on their location and course preferences. The bot leverages natural language processing (NLP) to interpret user queries and utilizes geospatial calculations to determine proximity to relevant institutions, providing accurate and personalized results.",
      rating: 4,
    },

  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    // Show 6 more projects when the button is clicked
    setVisibleProjects((prev) => Math.min(prev + 6, projectsData.length));
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="container mx-auto container-padding max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A collection of projects showcasing expertise in full-stack development, 
            cloud infrastructure, and scalable application design.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "opacity-0 transform translate-y-4 transition-all duration-500",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                index={index}
                liveLink={project.liveLink}
                clientMessage={project.clientMessage}
                longDescription={project.longDescription}
                rating={project.rating}
              />
            </div>
          ))}
        </div>

        {visibleProjects < projectsData.length && (
          <div className="mt-16 text-center">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={handleViewMore}
            >
              View More
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
