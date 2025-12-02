import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import headshotImage from "./assets/wmremove-transformed.png";
import heroBackgroundImage from "./assets/hero-background.jpg";

// Color palette inspired by olive blazer + warm office tones
const colors = {
  bg: "#faf8f4",
  bgAlt: "#4a5548",
  text: "#2a2a2a",
  textLight: "#5a5a5a",
  olive: "#4a5548",
  sage: "#8b9d83",
  terracotta: "#c4956a",
  cream: "#faf8f4",
};

// Animated section wrapper
function AnimatedSection({ children, className, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// World Card Component
function WorldCard({ title, role, description, accentColor, index }) {
  const { scrollYProgress } = useScroll();
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -20 + index * 5]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(74, 85, 72, 0.12)" }}
      style={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: "1.25rem",
        padding: "2rem",
        boxShadow: "0 4px 24px rgba(74, 85, 72, 0.06)",
        cursor: "default",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        y: cardY,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: accentColor,
          borderRadius: "1.25rem 1.25rem 0 0",
        }}
      />
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.6rem",
          fontWeight: 600,
          marginBottom: "0.35rem",
          color: colors.text,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <span
        style={{
          display: "block",
          fontSize: "0.75rem",
          color: colors.sage,
          fontWeight: 600,
          marginBottom: "1.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {role}
      </span>
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.75,
          color: colors.textLight,
          margin: 0,
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </motion.div>
  );
}

// Build Item Component
function BuildItem({ letter, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "2rem",
        paddingBottom: "2rem",
        borderBottom: index < 2 ? "1px solid rgba(250, 248, 244, 0.12)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "3.5rem",
          fontWeight: 300,
          color: colors.terracotta,
          lineHeight: 0.9,
          opacity: 0.5,
          minWidth: "50px",
        }}
      >
        {letter}
      </span>
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.75rem",
            fontWeight: 500,
            marginBottom: "0.6rem",
            color: colors.cream,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(250, 248, 244, 0.75)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Skill Block Component
function SkillBlock({ title, subtitle, description, index }) {
  const { scrollYProgress } = useScroll();
  const skillY = useTransform(scrollYProgress, [0, 1], [0, -10 + index * 3]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "1.25rem",
        boxShadow: "0 4px 24px rgba(74, 85, 72, 0.06)",
        borderLeft: `4px solid ${colors.sage}`,
        y: skillY,
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: colors.text,
          marginBottom: "0.3rem",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <span
        style={{
          display: "block",
          fontSize: "0.75rem",
          color: colors.terracotta,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "1rem",
        }}
      >
        {subtitle}
      </span>
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.75,
          color: colors.textLight,
          margin: 0,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// LinkedIn Icon
function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// Arrow Icon
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// Location Icon
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Down Arrow Icon
function DownArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const parallaxYFast = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const worlds = [
    {
      title: "Tessitura Network",
      role: "Cloud Project Manager",
      description: "<em>My day job.</em> Delivering cloud outcomes for arts & cultural organizations. Exploring AI-augmented strategic delivery and team leadership.",
      accentColor: colors.olive,
    },
    {
      title: "Emmaus Collective",
      role: "Emmaus Technology • Emmaus Software",
      description: "<em>My passion project.</em> Discipleship programming, church technology services, and software for businesses and consumers. Building tools for Kingdom impact.",
      accentColor: colors.sage,
    },
    {
      title: "Publisher & Editor",
      role: "Fiction • Nonfiction • Religious Literature",
      description: "<em>Helping friends achieve their dreams.</em> Crafting and curating stories that matter. From AI-assisted novel systems to theological deep dives, bringing ideas to print.",
      accentColor: colors.terracotta,
    },
    {
      title: "Family Projects",
      role: "Husband & Dad",
      description: "<em>An eye on what matters.</em> World travel adventures, 3D-printed creations, basement builds, and side ventures. Where craft meets chaos meets joy.",
      accentColor: "#7a6a5a",
    },
  ];

  const builds = [
    {
      letter: "•",
      title: "AI + Automation Systems",
      description: "AI agents, n8n workflows, Supabase-backed tools, and intelligent workflow engines that actually work.",
    },
    {
      letter: "•",
      title: "Apps & SaaS",
      description: "Quick-to-market, useful, maintainable products designed for clean handoff and real-world impact.",
    },
    {
      letter: "•",
      title: "Creative Tech Projects",
      description: "Maker products, digital art, IoT experiments, and rapid MVP prototypes that push boundaries.",
    }
  ];

  const skills = [
    {
      title: "AI Systems Design",
      subtitle: "From prompt engineering to production pipelines",
      description: "Building the bridge between raw AI capability and real business value. Modern stacks, thoughtful architecture, reliable outcomes.",
    },
    {
      title: "Delivery Leadership",
      subtitle: "Strategic execution with predictable outcomes",
      description: "Clear timelines, calm execution, and the ability to navigate complexity without losing sight of what matters.",
    },
    {
      title: "Rapid Prototyping",
      subtitle: "Ship fast, iterate wisely, polish on impact",
      description: "The discipline to move quickly without breaking things—and the wisdom to know when to slow down and get it right.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        html { scroll-behavior: smooth; }
        
        * { box-sizing: border-box; }
        
        ::selection {
          background: ${colors.sage};
          color: white;
        }
        
        a:hover { opacity: 0.85; }
      `}</style>

      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 2.5rem",
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(250, 248, 244, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(74, 85, 72, 0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: colors.olive,
            letterSpacing: "-0.02em",
          }}
        >
          Weston Muniak
        </span>
        <a
          href="https://linkedin.com/in/muniak/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: colors.olive,
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            padding: "0.6rem 1.1rem",
            borderRadius: "2rem",
            border: `1.5px solid rgba(74, 85, 72, 0.2)`,
            transition: "all 0.2s ease",
          }}
        >
          <LinkedInIcon size={18} />
          <span>Connect</span>
        </a>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "7rem 2rem 5rem",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(250, 248, 244, 0.85), rgba(250, 248, 244, 0.85)), url(${heroBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background gradient orbs */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            y: parallaxY,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${heroBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.015,
              filter: "grayscale(100%) contrast(0.3) brightness(1.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              width: "500px",
              height: "500px",
              background: `radial-gradient(circle, rgba(139, 157, 131, 0.05) 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "10%",
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, rgba(196, 149, 106, 0.04) 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5rem",
            maxWidth: "1200px",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "relative",
              flexShrink: 0,
              y: parallaxYFast,
            }}
          >
            <div
              style={{
                width: "300px",
                height: "380px",
                borderRadius: "180px 180px 28px 28px",
                overflow: "hidden",
                boxShadow: "0 30px 60px -15px rgba(74, 85, 72, 0.22)",
                border: "5px solid rgba(255, 255, 255, 0.9)",
                background: `linear-gradient(145deg, ${colors.sage}22, ${colors.olive}11)`,
                position: "relative",
              }}
            >
              <img
                src={headshotImage}
                alt="Weston Muniak"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            {/* Decorative ring */}
            <div
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: `2px solid ${colors.sage}`,
                opacity: 0.25,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "-20px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: colors.terracotta,
                opacity: 0.15,
              }}
            />
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              maxWidth: "520px",
              textAlign: "left",
              y: parallaxYSlow,
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: colors.sage,
                marginBottom: "1.25rem",
                padding: "0.4rem 0.9rem",
                backgroundColor: `${colors.sage}15`,
                borderRadius: "2rem",
              }}
            >
              Builder & Creator
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 4.8rem)",
                fontWeight: 600,
                lineHeight: 0.95,
                marginBottom: "1.5rem",
                color: colors.text,
                letterSpacing: "-0.03em",
              }}
            >
              Weston Muniak
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: 1.75,
                color: colors.textLight,
                marginBottom: "2rem",
              }}
            >
              Builder at the intersection of <em style={{ color: colors.olive, fontStyle: "italic" }}>technology</em>,{" "}
              <em style={{ color: colors.olive, fontStyle: "italic" }}>ministry</em>, and{" "}
              <em style={{ color: colors.olive, fontStyle: "italic" }}>craft</em>. I ship fast, automate what matters,
              and keep my family at the center.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                flexWrap: "wrap",
              }}
            >
              {["Cloud PM", "AI Builder", "Publisher", "Maker"].map((tag, i) => (
                <React.Fragment key={tag}>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: colors.olive,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                  {i < 3 && (
                    <span style={{ color: colors.terracotta, fontSize: "0.6rem" }}>●</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: colors.sage,
            opacity: 0.5,
          }}
        >
          <DownArrowIcon />
        </motion.div>
      </section>

      {/* Current Worlds Section */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              color: colors.terracotta,
              fontWeight: 500,
            }}
          >
            01
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.75rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: colors.text,
              margin: 0,
            }}
          >
            Current Worlds
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {worlds.map((world, i) => (
            <WorldCard key={world.title} {...world} index={i} />
          ))}
        </div>
      </section>

      {/* What I Build Section - Dark */}
      <section
        style={{
          padding: "6rem 0",
          backgroundColor: colors.bgAlt,
          color: colors.cream,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1rem",
                color: colors.terracotta,
                fontWeight: 500,
              }}
            >
              02
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.75rem",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              What I Build
            </motion.h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {builds.map((build, i) => (
              <BuildItem key={build.letter} {...build} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              color: colors.terracotta,
              fontWeight: 500,
            }}
          >
            03
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.75rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: colors.text,
              margin: 0,
            }}
          >
            Skills That Matter
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {skills.map((skill, i) => (
            <SkillBlock key={skill.title} {...skill} index={i} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        style={{
          padding: "6rem 2rem",
          backgroundColor: "#232323",
          color: colors.cream,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            paddingBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "3.25rem",
              fontWeight: 500,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Connect
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.85,
              opacity: 0.8,
              marginBottom: "2.5rem",
            }}
          >
            Whether it's AI automation, a creative build, ministry materials, or a new idea—I love partnering with
            people who care about craft and impact.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:w@westonmuniak.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: colors.sage,
                color: "#fff",
                padding: "1rem 2rem",
                borderRadius: "3rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span>Email Me</span>
              <ArrowIcon />
            </a>
            <a
              href="https://linkedin.com/in/muniak/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                backgroundColor: "transparent",
                color: colors.cream,
                padding: "1rem 2rem",
                borderRadius: "3rem",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1rem",
                border: "1.5px solid rgba(250, 248, 244, 0.25)",
                transition: "all 0.2s ease",
              }}
            >
              <LinkedInIcon size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Location footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(250, 248, 244, 0.08)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <LocationIcon />
          <span style={{ fontSize: "0.85rem", opacity: 0.45 }}>Medina, Ohio — Cleveland Metro</span>
        </div>
      </section>
    </div>
  );
}
