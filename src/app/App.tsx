import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import profilePhoto from "@/imports/image2.jpeg";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Download,
  Eye,
  ChevronRight,
  Code2,
  Database,
  Server,
  Wrench,
  Globe,
  Layers,
  Menu,
  X,
  Award,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Terminal,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const skills = {
  Languages: {
    icon: <Code2 size={20} />,
    color: "#A855F7",
    items: ["C++", "Python", "JavaScript/TypeScript", "SQL"],
  },
  Development: {
    icon: <Layers size={20} />,
    color: "#EC4899",
    items: ["Next JS", "React JS", "Tailwind CSS", "Node JS", "Express JS"],
  },
  Database: {
    icon: <Globe size={20} />,
    color: "#34D399",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  Programming: {
    icon: <Database size={20} />,
    color: "#F472B6",
    items: ["DSA", "OOPs", "Competetive Programming", "AI/ML"],
  },
  Tools: {
    icon: <Wrench size={20} />,
    color: "#FBBF24",
    items: ["GitHub", "Canva", "Postman"],
  },
};

const projects = [
  {
    title: "PaperBiz ERP",
    description:
      "A full-featured Enterprise Resource Planning system for paper businesses. Handles inventory, billing, purchase orders, and financial reports end-to-end.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
    features: [
      "Inventory Management",
      "Invoice Generation",
      "Financial Reports",
      "Role-based Access",
    ],
    github: "#",
    demo: "#",
    highlight: true,
  },
  {
    title: "Expense Tracker",
    description:
      "A full-featured Enterprise Resource Planning system for paper businesses. Handles inventory, billing, purchase orders, and financial reports end-to-end.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
    features: [
      "Inventory Management",
      "Invoice Generation",
      "Financial Reports",
      "Role-based Access",
    ],
    github: "https://github.com/BhartiRai111/expenceTracker",
    demo: "#",
    highlight: true,
  },
  {
    title: "Chat Application",
    description:
      "Real-time messaging platform with WebSocket support, user authentication, group chats, and message history persistence.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=450&fit=crop&auto=format",
    tech: ["Java", "Spring Boot", "WebSocket", "MongoDB", "React"],
    features: [
      "Real-time Messaging",
      "Group Chat",
      "JWT Auth",
      "Message History",
    ],
    github: "https://github.com/BhartiRai111/chating_Application",
    demo: "#",
    highlight: false,
  },
  {
    title: "Business Management System",
    description:
      "Comprehensive dashboard for small businesses to track leads, manage clients, monitor revenue, and schedule tasks.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format",
    tech: ["Spring Boot", "Spring Security", "JPA", "PostgreSQL", "Bootstrap"],
    features: [
      "CRM Module",
      "Task Scheduler",
      "Revenue Analytics",
      "Client Portal",
    ],
    github: "https://github.com/BhartiRai111/business-management",
    demo: "#",
    highlight: false,
  },
  {
    title: "Student Management System",
    description:
      "Academic platform managing enrollments, grades, attendance, fee collection, and performance analytics.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop&auto=format",
    tech: ["Java", "Spring MVC", "Hibernate", "MySQL", "Thymeleaf"],
    features: [
      "Grade Management",
      "Attendance Tracking",
      "Fee Collection",
      "Report Cards",
    ],
    github: "https://github.com/BhartiRai111/student-management",
    demo: "#",
    highlight: false,
  },
];

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Adarsh_Sahu_Resume.pdf"; // public folder me PDF ka naam
  link.download = "Adarsh_Sahu_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const services = [
  {
    icon: <Server size={22} />,
    title: "Backend Development",
    desc: "Scalable Java Spring Boot microservices and monolithic applications built for production.",
    color: "#A855F7",
  },
  {
    icon: <Globe size={22} />,
    title: "REST API Development",
    desc: "Well-documented, secure, and efficient RESTful APIs following industry best practices.",
    color: "#EC4899",
  },
  {
    icon: <Database size={22} />,
    title: "Database Design",
    desc: "Normalized relational schemas, query optimization, and NoSQL data modeling.",
    color: "#34D399",
  },
  {
    icon: <Zap size={22} />,
    title: "Bug Fixing",
    desc: "Systematic debugging, performance profiling, and root-cause resolution.",
    color: "#FBBF24",
  },
  {
    icon: <Layers size={22} />,
    title: "Web Application Development",
    desc: "End-to-end full-stack web applications with clean architecture and responsive UI.",
    color: "#F472B6",
  },
];

const certifications = [
  {
    title: "Java Full Stack Development",
    issuer: "Naresh i Technologies",
    year: "2023",
    icon: <Award size={20} />,
  },
  {
    title: "Spring Boot Masterclass",
    issuer: "Udemy",
    year: "2023",
    icon: <Award size={20} />,
  },
  {
    title: "SQL & Database Design",
    issuer: "HackerRank",
    year: "2022",
    icon: <Award size={20} />,
  },
  {
    title: "Git & GitHub Essentials",
    issuer: "Coursera",
    year: "2022",
    icon: <Award size={20} />,
  },
];

/* ─── Hooks ─────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useTypingEffect(strings: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setStrIdx((i) => (i + 1) % strings.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return display;
}

/* ─── Components ────────────────────────────────────────────────────────── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-gradient-to-r from-[#A855F7] to-transparent" />
      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ${
        hover
          ? "hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(168,85,247,0.12)]"
          : ""
      } ${className}`}
      style={{
        background: "rgba(19,15,36,0.7)",
        borderColor: "rgba(168,85,247,0.12)",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Sections ───────────────────────────────────────────────────────────── */

function Nav({
  active,
  scrollTo,
}: {
  active: string;
  scrollTo: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = [
    "About",
    "Skills",
    "Experience",
    "Projects",
    "Services",
    "Education",
    "Contact",
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(13,10,26,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(168,85,247,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-lg font-bold cursor-pointer"
            style={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(90deg, #A855F7, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AS/
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-sm transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: active === l ? "#A855F7" : "#9488B0",
                  fontWeight: active === l ? 600 : 400,
                }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              style={{
                background: "linear-gradient(135deg, #A855F7, #EC4899)",
                color: "#0D0A1A",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Hire Me
            </button>
          </div>

          <button
            className="md:hidden text-[#9488B0] hover:text-[#A855F7] transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{
            background: "rgba(13,10,26,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => {
                scrollTo(l.toLowerCase());
                setOpen(false);
              }}
              className="text-2xl font-semibold transition-colors"
              style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  const typed = useTypingEffect([
    "Full Stack Developer",
    "Competetive Programmer",
    "REST API Specialist",
    "Database Architect",
  ]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 0 }}
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-20%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
            animation: "blob1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "-10%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)",
            animation: "blob2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            top: "40%",
            left: "30%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
            animation: "blob3 12s ease-in-out infinite",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.1)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.08)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-15px,15px) scale(0.95)} }
        @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: cursor-blink 1s step-end infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .float-anim { animation: float 4s ease-in-out infinite; }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D0A1A; }
        ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.4); }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 w-full py-10 mt-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8"
              style={{
                borderColor: "rgba(168,85,247,0.2)",
                background: "rgba(168,85,247,0.06)",
                color: "#A855F7",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
              Available for hire · 1 Year Experience
            </div>

            <h1
              className="font-bold leading-tight mb-4"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                color: "#EDE8F5",
              }}
            >
              Hi, I&apos;m{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #A855F7 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Adarsh Sahu
              </span>
            </h1>

            <div
              className="text-xl md:text-2xl font-semibold mb-6 h-9 flex items-center"
              style={{ fontFamily: "Poppins, sans-serif", color: "#C084FC" }}
            >
              {typed}
              <span className="cursor-blink ml-0.5 text-[#A855F7]">|</span>
            </div>

            <p
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "Inter, sans-serif", color: "#9488B0" }}
            >
              Hey there!😀👋 I'm Adarsh😎, a tech enthusiast🤓, a Passionate
              Software Engineer🤖, a Full Stack Web Developer👾, and also an
              Athlete🏃.
              <br /> 💪 Great command on C/C++ , Python & JavaScript. 
              <br /> 💪 Good knowledge of Data Structures, Object Oriented Programmings
              & Problem Solving Algorithms.
              <br /> 💪 Good command on Full Stack Development, Next JS, React
              JS, Node JS, Express JS, PostgreSQL & Mongo DB.
              <br /> 💪 Quick learner, good listener, team player, technical
              guy, Happy to Connect !!
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  color: "#0D0A1A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Download size={16} />
                Download Resume
              </button>
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-[rgba(168,85,247,0.08)] hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(168,85,247,0.3)",
                  color: "#A855F7",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Eye size={16} />
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-[rgba(236,72,153,0.08)] hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(236,72,153,0.3)",
                  color: "#EC4899",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Mail size={16} />
                Hire Me
              </button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t"
              style={{ borderColor: "rgba(168,85,247,0.1)" }}
            >
              {[
                { val: "1+", label: "Years Experience" },
                { val: "20+", label: "Projects Built" },
                { val: "25+", label: "Technologies" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      background: "linear-gradient(90deg, #A855F7, #EC4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar / Visual */}
          <div className="flex items-center justify-center relative mt-10 lg:mt-0">
            <div className="relative float-anim">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #A855F7, #EC4899, transparent, #A855F7)",
                  padding: 2,
                  margin: -20,
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "#0D0A1A" }}
                />
              </div>

              {/* Photo */}
              <div
                className="relative w-72 h-72 rounded-full overflow-hidden"
                style={{
                  border: "3px solid rgba(168,85,247,0.3)",
                  boxShadow:
                    "0 0 60px rgba(168,85,247,0.2), inset 0 0 30px rgba(168,85,247,0.05)",
                }}
              >
                <ImageWithFallback
                  src={profilePhoto}
                  alt="Bharti Rai, Java Backend Developer"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, rgba(13,10,26,0.4))",
                  }}
                />
              </div>

              {/* Floating tech badges */}
              {[
                {
                  label: "Next JS",
                  color: "#6DB33F",
                  top: "0%",
                  right: "-20%",
                },
                {
                  label: "C++",
                  color: "#A855F7",
                  bottom: "10%",
                  left: "-25%",
                },
                {
                  label: "REST API",
                  color: "#EC4899",
                  top: "40%",
                  right: "-30%",
                },
                {
                  label: "Node JS",
                  color: "#818CF8",
                  top: "80%",
                  right: "-20%",
                },
                {
                  label: "Express JS",
                  color: "#10B981",
                  top: "-10%",
                  right: "60%",
                },
                {
                  label: "SQL",
                  color: "#F97316",
                  top: "40%",
                  right: "100%",
                },
                {
                  label: "AI",
                  color: "#FACC15",
                  top: "105%",
                  right: "30%",
                },
                {
                  label: "Python",
                  color: "#06B6D4",
                  top: "100%",
                  right: "70%",
                },
                {
                  label: "DSA",
                  color: "#F43F5E",
                  top: "-20%",
                  right: "20%",
                },
              ].map((b) => (
                <div
                  key={b.label}
                  className="absolute px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    ...b,
                    background: "rgba(19,15,36,0.9)",
                    border: `1px solid ${b.color}40`,
                    color: b.color,
                    fontFamily: "Inter, sans-serif",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const experience = [
    {
      role: "Associate Software Developer",
      company: "Dataman Computer Systems Pvt. Ltd.",
      period: "2025 – Present",
      duration: "1 Year",
      desc: "Developed and maintained ERP Software for Paper Industry serving 50k+ users. Led REST API design for 3 client-facing products. Reduced query response time by 40%. Built modern UI/UX using Next JS and Tailwind CSS",
      achievements: [
        "50k+ users served",
        "40% query optimization",
        "3 API products led",
      ],
    },
  ];

  const education = [
    {
      degree: "B.Tech — Computer Science (Specialization In AI)",
      institution: "Chhatrapati Sahuji Maharaj University, Kanpur",
      year: "2021 – 2025",
      gpa: "7.67 CGPA",
    },
  ];

  return (
    <section id="about" className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="About Me" />
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Who I Am
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
          >
            A passionate Full Stack developer and Competetive Programmer focused
            on building clean, maintainable, and scalable software. I take pride
            in writing production-grade code that solves real problems.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <FadeIn delay={100}>
            <div
              className="flex items-center gap-2 mb-6 text-sm font-semibold"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              <Briefcase size={16} />
              Work Experience
            </div>
            <div
              className="relative pl-6 border-l"
              style={{ borderColor: "rgba(168,85,247,0.2)" }}
            >
              {experience.map((e, i) => (
                <div key={i} className="relative mb-6 last:mb-0">
                  <div
                    className="absolute -left-[1.45rem] w-3 h-3 rounded-full border-2"
                    style={{
                      background: "#A855F7",
                      borderColor: "#0D0A1A",
                      top: 4,
                    }}
                  />
                  <GlassCard className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3
                          className="text-base font-semibold"
                          style={{
                            color: "#EDE8F5",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {e.role}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{
                            color: "#A855F7",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {e.company}
                        </p>
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full shrink-0"
                        style={{
                          background: "rgba(168,85,247,0.1)",
                          color: "#A855F7",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {e.duration}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{
                        color: "#9488B0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {e.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {e.achievements.map((a) => (
                        <span
                          key={a}
                          className="flex items-center gap-1 text-xs px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(52,211,153,0.1)",
                            color: "#34D399",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <Star size={10} />
                          {a}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Education Timeline */}
          <FadeIn delay={200}>
            <div
              className="flex items-center gap-2 mb-6 text-sm font-semibold"
              style={{ color: "#EC4899", fontFamily: "Inter, sans-serif" }}
            >
              <GraduationCap size={16} />
              Education
            </div>
            <div
              className="relative pl-6 border-l"
              style={{ borderColor: "rgba(236,72,153,0.2)" }}
            >
              {education.map((e, i) => (
                <div key={i} className="relative mb-6 last:mb-0">
                  <div
                    className="absolute -left-[1.45rem] w-3 h-3 rounded-full border-2"
                    style={{
                      background: "#EC4899",
                      borderColor: "#0D0A1A",
                      top: 4,
                    }}
                  />
                  <GlassCard className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        className="text-base font-semibold"
                        style={{
                          color: "#EDE8F5",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {e.degree}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded-full shrink-0"
                        style={{
                          background: "rgba(236,72,153,0.1)",
                          color: "#EC4899",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {e.gpa}
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{
                        color: "#A855F7",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {e.institution}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{
                        color: "#9488B0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {e.year}
                    </p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skillLevels: Record<string, Record<string, number>> = {
    Languages: { "C++": 90, Python: 80, "JavaScript/TypeScript": 80 , SQL:90},
    Development: {
      "Next JS": 90,
      "React JS": 88,
      "Tailwind CSS": 80,
      "Node JS": 90,
      "Express JS": 95,
    },
    Database: { MySQL: 85, PostgreSQL: 90, MongoDB: 70 },
    Programming: { DSA: 95, OOPs: 90, "Competetive Programming": 80, "AI/ML": 75},
    Tools: { GitHub: 85, Canva: 90, Postman: 82 },
  };

  return (
    <section
      id="skills"
      className="py-14 px-6"
      style={{ background: "rgba(19,15,36,0.3)" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Technical Skills" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            My Tech Stack
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(skills).map(([cat, data], i) => (
            <FadeIn key={cat} delay={i * 80}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${data.color}18`, color: data.color }}
                  >
                    {data.icon}
                  </div>
                  <h3
                    className="font-semibold text-base"
                    style={{
                      color: "#EDE8F5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {cat}
                  </h3>
                </div>
                <div className="space-y-3">
                  {data.items.map((skill) => {
                    const level = skillLevels[cat]?.[skill] ?? 70;
                    return (
                      <div key={skill}>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="text-sm"
                            style={{
                              color: "#D8CFEC",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {skill}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: data.color,
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {level}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <SkillBar level={level} color={data.color} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ level, color }: { level: number; color: string }) {
  const { ref, inView } = useInView(0.3);
  return (
    <div
      ref={ref}
      className="h-full rounded-full transition-all duration-1000 ease-out"
      style={{
        width: inView ? `${level}%` : "0%",
        background: `linear-gradient(90deg, ${color}, ${color}80)`,
      }}
    />
  );
}

function Experience() {
  return (
    <section id="experience" className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Experience" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Work History
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <GlassCard className="p-8 md:p-10" hover={false}>
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(168,85,247,0.12)",
                    color: "#A855F7",
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    color: "#EDE8F5",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Associate Software Developer
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
                >
                  Dataman Computer Systems Pvt. Ltd.
                </p>
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(168,85,247,0.1)",
                    color: "#A855F7",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Aug 2025 – Present · 1+ Year
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4
                    className="text-sm font-semibold mb-3"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.1em",
                    }}
                  >
                    KEY RESPONSIBILITIES
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Developed and maintained ERP software used by 100+ enterprise users for the paper industry using Next.js, creating responsive and scalable user interfaces.",
                      "Built and integrated frontend components with REST APIs to support ERP modules such as inventory, production,and order management.",
                      "Implemented authentication and role-based authorization, ensuring access control across different ERP user roles.",
                      "Improved application performance by optimizing frontend logic and reducing page load time by 30%, enhancing the overall user experience.",
                      "Collaborated on backend development using Node.js and ASP.NET, worked with SQL databases, and used Git for version control during feature development and deployment",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                        style={{
                          color: "#D8CFEC",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        <ChevronRight
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#A855F7" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    className="text-sm font-semibold mb-3"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ACHIEVEMENTS
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      {
                        icon: <Zap size={16} />,
                        val: "40%",
                        label: "Query Speed Gain",
                        color: "#FBBF24",
                      },
                      {
                        icon: <Server size={16} />,
                        val: "50k+",
                        label: "Users Served",
                        color: "#A855F7",
                      },
                      {
                        icon: <Shield size={16} />,
                        val: "3",
                        label: "APIs Shipped",
                        color: "#34D399",
                      },
                    ].map((a) => (
                      <div
                        key={a.label}
                        className="p-4 rounded-xl text-center"
                        style={{
                          background: `${a.color}0D`,
                          border: `1px solid ${a.color}20`,
                        }}
                      >
                        <div
                          className="flex justify-center mb-1"
                          style={{ color: a.color }}
                        >
                          {a.icon}
                        </div>
                        <div
                          className="text-xl font-bold"
                          style={{
                            color: a.color,
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {a.val}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{
                            color: "#9488B0",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {a.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="projects"
      className="py-14 px-6"
      style={{ background: "rgba(19,15,36,0.3)" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Featured Projects" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Things I&apos;ve Built
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <GlassCard
                className={`overflow-hidden cursor-pointer ${active === i ? "ring-1 ring-[#A855F7]/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]" : ""}`}
                hover={false}
              >
                <div
                  className="relative h-48 overflow-hidden bg-[#1C1433]"
                  onClick={() => setActive(i)}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ filter: "brightness(0.7) saturate(0.9)" }}
                  />
                  {p.highlight && (
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #A855F7, #EC4899)",
                        color: "#0D0A1A",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <Star size={10} />
                      Featured
                    </div>
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,10,26,0.8) 0%, transparent 60%)",
                    }}
                  />
                </div>

                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      color: "#EDE8F5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(168,85,247,0.08)",
                          color: "#A855F7",
                          border: "1px solid rgba(168,85,247,0.15)",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.features.map((f) => (
                      <span
                        key={f}
                        className="flex items-center gap-1 text-xs"
                        style={{
                          color: "#9488B0",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        <ChevronRight size={12} style={{ color: "#34D399" }} />
                        {f}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex gap-3 pt-4 border-t"
                    style={{ borderColor: "rgba(168,85,247,0.1)" }}
                  >
                    <a
                      href={p.github}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:bg-[rgba(168,85,247,0.08)]"
                      style={{
                        borderColor: "rgba(168,85,247,0.2)",
                        color: "#A855F7",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    <a
                      href={p.demo}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]"
                      style={{
                        background: "linear-gradient(135deg, #A855F7, #EC4899)",
                        color: "#0D0A1A",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Service Drawer ─────────────────────────────────────────────────────── */

const drawerFeatures = [
  { icon: <Server size={16} />, label: "Spring Boot Development" },
  { icon: <Globe size={16} />, label: "REST API Development" },
  { icon: <Shield size={16} />, label: "Authentication & JWT" },
  { icon: <Database size={16} />, label: "Database Integration" },
  { icon: <Zap size={16} />, label: "Performance Optimization" },
  { icon: <Terminal size={16} />, label: "Deployment Support" },
];

const drawerTechs = [
  "Java",
  "Spring Boot",
  "Hibernate",
  "JPA",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Docker",
  "AWS",
];

const drawerProjects = [
  {
    title: "PaperBiz ERP",
    desc: "Full-featured ERP system handling inventory, billing, and financial reports.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&auto=format",
  },
  {
    title: "Chat Application",
    desc: "Real-time messaging with WebSocket, JWT auth, and MongoDB persistence.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=220&fit=crop&auto=format",
  },
];

const processSteps = [
  {
    step: "01",
    label: "Requirement Discussion",
    desc: "Deep-dive into your goals, constraints, and tech stack.",
  },
  {
    step: "02",
    label: "Planning",
    desc: "Architecture design, database schema, and API contract definition.",
  },
  {
    step: "03",
    label: "Development",
    desc: "Iterative Spring Boot development with clean, tested code.",
  },
  {
    step: "04",
    label: "Testing",
    desc: "Unit tests, integration tests, and API validation via Postman.",
  },
  {
    step: "05",
    label: "Deployment",
    desc: "CI/CD pipeline setup, cloud deployment, and monitoring.",
  },
  {
    step: "06",
    label: "Support",
    desc: "Post-launch bug fixes, performance tuning, and feature additions.",
  },
];

const whyHireMe = [
  {
    icon: <Code2 size={16} />,
    label: "Clean Code",
    desc: "SOLID principles, DRY patterns",
  },
  {
    icon: <Layers size={16} />,
    label: "Scalable Architecture",
    desc: "Built to grow with your business",
  },
  {
    icon: <Zap size={16} />,
    label: "On-Time Delivery",
    desc: "Agile sprints, clear milestones",
  },
  {
    icon: <Shield size={16} />,
    label: "Long-Term Support",
    desc: "Post-launch maintenance & updates",
  },
];

type ServiceType = (typeof services)[number];

function ServiceDrawer({
  service,
  onClose,
  scrollTo,
}: {
  service: ServiceType | null;
  onClose: () => void;
  scrollTo: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (service) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [service]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  if (!service) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-all duration-500"
        style={{
          background: visible ? "rgba(13,10,26,0.7)" : "rgba(13,10,26,0)",
          backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-full overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          width: "min(500px, 100vw)",
          background: "rgba(19,15,36,0.96)",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(168,85,247,0.2)",
          boxShadow:
            "-8px 0 80px rgba(168,85,247,0.18), -2px 0 20px rgba(236,72,153,0.08)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow strip top */}
        <div
          className="sticky top-0 left-0 right-0 h-px z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, #A855F7, #EC4899, transparent)",
          }}
        />

        <div className="p-6 md:p-8 pb-12">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${service.color}22, ${service.color}0a)`,
                  border: `1px solid ${service.color}40`,
                  color: service.color,
                }}
              >
                <span style={{ transform: "scale(1.4)", display: "flex" }}>
                  {service.icon}
                </span>
              </div>
              <div>
                <h2
                  className="text-xl font-bold leading-tight"
                  style={{
                    color: "#EDE8F5",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {service.title}
                </h2>
                <span
                  className="inline-block mt-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: `${service.color}15`,
                    color: service.color,
                    border: `1px solid ${service.color}30`,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Java Backend
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 shrink-0"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "#9488B0",
              }}
              aria-label="Close drawer"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Description ── */}
          <p
            className="text-sm leading-relaxed mb-8 pb-8 border-b"
            style={{
              color: "#9488B0",
              fontFamily: "Inter, sans-serif",
              borderColor: "rgba(168,85,247,0.1)",
            }}
          >
            {service.desc} I bring 2+ years of hands-on Spring Boot experience
            to every engagement — writing production-grade code that scales with
            your business and stands up to real-world load.
          </p>

          {/* ── What I Can Do ── */}
          <div className="mb-8">
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              What I Can Do
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {drawerFeatures.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(168,85,247,0.12)] cursor-default"
                  style={{
                    background: "rgba(168,85,247,0.06)",
                    border: "1px solid rgba(168,85,247,0.12)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      color: "#A855F7",
                    }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="text-xs font-medium leading-tight"
                    style={{
                      color: "#D8CFEC",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Technologies ── */}
          <div
            className="mb-8 pb-8 border-b"
            style={{ borderColor: "rgba(168,85,247,0.1)" }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {drawerTechs.map((t, i) => {
                const colors = [
                  "#A855F7",
                  "#EC4899",
                  "#C084FC",
                  "#A855F7",
                  "#34D399",
                  "#34D399",
                  "#FBBF24",
                  "#9488B0",
                  "#EC4899",
                  "#A855F7",
                ];
                const c = colors[i % colors.length];
                return (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5 cursor-default"
                    style={{
                      background: `${c}12`,
                      border: `1px solid ${c}30`,
                      color: c,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Related Projects ── */}
          <div className="mb-8">
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              Related Projects
            </h3>
            <div className="space-y-4">
              {drawerProjects.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] group cursor-pointer"
                  style={{
                    background: "rgba(28,20,51,0.6)",
                    border: "1px solid rgba(168,85,247,0.12)",
                  }}
                >
                  <div className="relative h-32 overflow-hidden bg-[#1C1433]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.65) saturate(0.8)" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(19,15,36,0.9) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  <div className="p-4 flex items-end justify-between">
                    <div>
                      <h4
                        className="text-sm font-semibold mb-0.5"
                        style={{
                          color: "#EDE8F5",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {p.title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{
                          color: "#9488B0",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ml-3 shrink-0 transition-all hover:shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                      style={{
                        background: "linear-gradient(135deg, #A855F7, #EC4899)",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <ExternalLink size={11} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Development Process ── */}
          <div
            className="mb-8 pb-8 border-b"
            style={{ borderColor: "rgba(168,85,247,0.1)" }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              Development Process
            </h3>
            <div
              className="relative pl-6 border-l"
              style={{ borderColor: "rgba(168,85,247,0.2)" }}
            >
              {processSteps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative ${i < processSteps.length - 1 ? "mb-6" : ""}`}
                >
                  <div
                    className="absolute -left-[1.35rem] w-2.5 h-2.5 rounded-full"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #A855F7, #EC4899)"
                          : "rgba(168,85,247,0.3)",
                      border:
                        i === 0 ? "none" : "1px solid rgba(168,85,247,0.4)",
                      top: 4,
                    }}
                  />
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span
                      className="text-xs font-mono"
                      style={{
                        color: "#A855F7",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {s.step}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: "#EDE8F5",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Why Hire Me ── */}
          <div className="mb-8">
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
            >
              Why Hire Me
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {whyHireMe.map((w) => (
                <div
                  key={w.label}
                  className="p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  style={{
                    background: "rgba(168,85,247,0.06)",
                    border: "1px solid rgba(168,85,247,0.12)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(168,85,247,0.2)",
                        color: "#A855F7",
                      }}
                    >
                      {w.icon}
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: "#EDE8F5",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {w.label}
                    </span>
                  </div>
                  <p
                    className="text-xs"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 100%)",
              border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 40px rgba(168,85,247,0.1) inset",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{
                background: "linear-gradient(135deg, #A855F7, #EC4899)",
                color: "#fff",
              }}
            >
              <Zap size={22} />
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "#EDE8F5", fontFamily: "Poppins, sans-serif" }}
            >
              Ready to build your project?
            </h3>
            <p
              className="text-xs mb-5"
              style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
            >
              Let&apos;s turn your idea into a production-ready application.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  scrollTo("contact");
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Mail size={14} />
                Hire Me
              </button>
              <button
                onClick={() => {
                  onClose();
                  scrollTo("contact");
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-[rgba(168,85,247,0.1)] hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(168,85,247,0.3)",
                  color: "#A855F7",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Phone size={14} />
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Services({
  onServiceClick,
}: {
  onServiceClick: (s: ServiceType) => void;
}) {
  return (
    <section id="services" className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Services" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            What I Offer
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 70}>
              <GlassCard className="p-6 group cursor-pointer" hover={true}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    color: "#EDE8F5",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
                >
                  {s.desc}
                </p>
                <button
                  onClick={() => onServiceClick(s)}
                  className="flex items-center gap-1 mt-4 text-xs font-medium transition-all group-hover:gap-2"
                  style={{ color: s.color, fontFamily: "Inter, sans-serif" }}
                >
                  Learn more
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    {
      degree: "B.Tech — Computer Science & Engineering",
      institution: "Chhatrapati Sahuji Maharaj University, Kanpur",
      year: "2021 – 2025",
      gpa: "7.8 CGPA",
      icon: <GraduationCap size={20} />,
      color: "#EC4899",
      highlights: [
        "Data Structures & Algorithms",
        "Database Management",
        "Software Engineering",
        "Operating Systems",
        "Machine Learning",
        "Artificial Intelligence"
      ],
    },
  ];

  return (
    <section
      id="education"
      className="py-14 px-6"
      style={{ background: "rgba(19,15,36,0.3)" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Education" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Academic Background
          </h2>
        </FadeIn>
        <div className="space-y-6">
          {items.map((e, i) => (
            <FadeIn key={e.degree} delay={i * 120}>
              <GlassCard className="p-8" hover={false}>
                <div className="grid md:grid-cols-[auto_1fr] gap-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${e.color}15`, color: e.color }}
                  >
                    {e.icon}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3
                        className="text-lg font-bold"
                        style={{
                          color: "#EDE8F5",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {e.degree}
                      </h3>
                      <span
                        className="text-xs px-3 py-1 rounded-full self-start sm:self-auto"
                        style={{
                          background: `${e.color}15`,
                          color: e.color,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {e.gpa}
                      </span>
                    </div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        color: e.color,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {e.institution}
                    </p>
                    <p
                      className="text-xs mb-4"
                      style={{
                        color: "#9488B0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {e.year}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {e.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            color: "#D8CFEC",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Certifications" />
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Credentials
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {certifications.map((c, i) => (
            <FadeIn key={c.title} delay={i * 80}>
              <GlassCard className="p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(251,191,36,0.12)",
                    color: "#FBBF24",
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  className="text-sm font-semibold mb-1.5 leading-snug"
                  style={{
                    color: "#EDE8F5",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-xs mb-1"
                  style={{ color: "#A855F7", fontFamily: "Inter, sans-serif" }}
                >
                  {c.issuer}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
                >
                  {c.year}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id === "msg" ? "message" : id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        "https://mail-backend-red.vercel.app/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const contacts = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "adarshsahu1310@gmail.com",
      color: "#A855F7",
      href: "mailto:adarshsahu1310@email.com",
    },
    // {
    //   icon: <Phone size={20} />,
    //   label: "Phone",
    //   value: "+91 6393521586",
    //   color: "#34D399",
    //   href: "tel:+916393521586",
    // },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "linkedin.com/in/adarshsahu1310/",
      color: "#EC4899",
      href: "https://www.linkedin.com/in/adarshsahu1310/",
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "github.com/yaarAdarsh",
      color: "#FBBF24",
      href: "https://github.com/yaarAdarsh",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Kanpur, Uttar Pradesh, India",
      color: "#F472B6",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-14 px-6"
      style={{ background: "rgba(19,15,36,0.3)" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel label="Contact" />
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Poppins, sans-serif", color: "#EDE8F5" }}
          >
            Get In Touch
          </h2>
          <p
            className="text-base mb-16 max-w-lg"
            style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
          >
            I&apos;m currently open to new opportunities. Whether you have a
            project in mind or just want to connect — my inbox is always open.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <FadeIn key={c.label} delay={i * 60}>
                <a
                  href={c.href || "#"}
                  target={
                    c.label === "GitHub" || c.label === "LinkedIn"
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!c.href) e.preventDefault();
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:-translate-y-0.5 group"
                  style={{
                    background: "rgba(19,15,36,0.6)",
                    borderColor: "rgba(168,85,247,0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}15`, color: c.color }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs mb-0.5"
                      style={{
                        color: "#9488B0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{
                        color: "#EDE8F5",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: c.color }}
                  />
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <GlassCard className="p-8" hover={false}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: "#EDE8F5", fontFamily: "Poppins, sans-serif" }}
              >
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  {
                    id: "name",
                    label: "Your Name",
                    type: "text",
                    placeholder: "Name",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "your_email@gmail.com",
                  },
                  {
                    id: "subject",
                    label: "Subject",
                    type: "text",
                    placeholder: "Job Opportunity / Project",
                  },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-xs mb-1.5 font-medium"
                      style={{
                        color: "#9488B0",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.id]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1"
                      style={{
                        background: "rgba(28,20,51,0.8)",
                        border: "1px solid rgba(168,85,247,0.12)",
                        color: "#EDE8F5",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="msg"
                    className="block text-xs mb-1.5 font-medium"
                    style={{
                      color: "#9488B0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="msg"
                    rows={4}
                    placeholder="Tell me about the role or project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-1"
                    style={{
                      background: "rgba(28,20,51,0.8)",
                      border: "1px solid rgba(168,85,247,0.12)",
                      color: "#EDE8F5",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #A855F7, #EC4899)",
                    color: "#0D0A1A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-10 px-6 border-t"
      style={{ borderColor: "rgba(168,85,247,0.08)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="text-xl font-bold mb-1"
            style={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(90deg, #A855F7, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Adarsh Sahu
          </div>
          <p
            className="text-xs"
            style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
          >
            Software Engineer · Kanpur, India
          </p>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "#9488B0", fontFamily: "Inter, sans-serif" }}
        >
          © 2026 Adarsh Sahu. Built with Spring of passion. All rights reserved
        </p>

        <div className="flex items-center gap-4">
          {[
            {
              icon: <Github size={18} />,
              href: "https://github.com/yaarAdarsh",
              label: "GitHub",
            },
            {
              icon: <Linkedin size={18} />,
              href: "https://www.linkedin.com/in/adarshsahu1310/",
              label: "LinkedIn",
            },
            {
              icon: <Mail size={18} />,
              href: "mailto:adarshsahu1310@email.com",
              label: "Email",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:text-[#A855F7] hover:border-[rgba(168,85,247,0.3)] hover:-translate-y-0.5"
              style={{
                borderColor: "rgba(168,85,247,0.1)",
                color: "#9488B0",
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────────────────── */

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [drawerService, setDrawerService] = useState<ServiceType | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = [
      "about",
      "skills",
      "experience",
      "projects",
      "services",
      "education",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          }
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Nav active={activeSection} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services onServiceClick={setDrawerService} />
      <ServiceDrawer
        service={drawerService}
        onClose={() => setDrawerService(null)}
        scrollTo={scrollTo}
      />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
