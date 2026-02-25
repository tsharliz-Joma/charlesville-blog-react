import React, {useEffect, useRef} from "react";
import ReactMarkdown from "react-markdown";

const AboutSection = ({eyebrow, title, body, image, imageAlt, theme}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      section.style.setProperty("--reveal-progress", "1");
      return;
    }

    let rafId = null;

    const updateProgress = () => {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.35;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(1, rawProgress));
      section.style.setProperty("--reveal-progress", progress.toFixed(3));
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-reveal w-full max-w-4xl mx-auto mt-16 text-center">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-steel">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
          {title}
        </h2>
      ) : null}
      {body ? (
        <div
          className={`prose prose-blade max-w-none mt-4 ${
            theme === "light" ? "" : "prose-invert"
          }`}
        >
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      ) : null}
      {image ? (
        <div className="mt-6 w-full max-w-md mx-auto">
          <img
            src={image}
            alt={imageAlt || title || "About image"}
            className="w-full rounded-2xl border border-slate/60 shadow-ember"
            loading="lazy"
          />
        </div>
      ) : null}
    </section>
  );
};

export default AboutSection;
