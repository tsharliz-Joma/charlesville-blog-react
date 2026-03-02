import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FiMoon, FiSun} from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import AboutSection from "../components/about-section";

// Home page displays a grid of posts. Posts are loaded from
// public/posts/index.json. Each entry should include a slug,
// title, date and description. The Card component gives a
// consistent look and feel.
const Home = ({theme, onToggleTheme}) => {
  const [posts, setPosts] = useState([]);
  const [hero, setHero] = useState({
    image: "/hero-default.svg",
    imageAlt: "City lights reflected on rain-slick streets",
    eyebrow: "Game design journal",
    title: "Charles's Game Design Journal",
    description:
      "A blog-journal of game design, builds, and lessons I pick up along the way. Short, honest updates as I keep making things.",
    ctaPrimary: "Browse entries",
    ctaSecondary: "Get journal updates",
    cadence: "Bi-weekly",
    focus: "Game design journal",
    mood: "Mellow futurism",
  });
  const [about, setAbout] = useState({
    eyebrow: "About",
    title: "Hey, I'm Charles",
    body:
      "Welcome! I'm Charles. A 26yo finally pursuing my childhood dream of becoming a game designer. Explore my journal entries on game dev, coding, meetup learnings, and fun side quests that involve games. It's mostly for me, but I hope you enjoy reading and learn something too. If an entry helps, subscribing would make my day. P.L.S. (Peace, love, and soul).",
    image: "",
    imageAlt: "",
  });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaScriptPromise = useRef(null);
  const heroRef = useRef(null);
  const marqueeRowRefA = useRef(null);

  useEffect(() => {
    fetch("/posts/index.json")
      .then((res) => res.json())
      .then((data) => {
        // Support both { posts: [...] } and direct array formats.
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch((err) => {
        console.error("Failed to load posts index:", err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/settings/hero.json")
      .then((res) => {
        if (!res.ok) throw new Error("Hero settings not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.image) {
          setHero({
            image: data.image,
            imageAlt: data.imageAlt || "Hero image",
            eyebrow: data.eyebrow || "Game design journal",
            title: data.title || "Charles's Game Design Journal",
            description:
              data.description ||
              "A blog-journal of game design, builds, and lessons I pick up along the way. Short, honest updates as I keep making things.",
            ctaPrimary: data.ctaPrimary || "Browse entries",
            ctaSecondary: data.ctaSecondary || "Get journal updates",
            cadence: data.cadence || "Bi-weekly",
            focus: data.focus || "Game design journal",
            mood: data.mood || "Mellow futurism",
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/settings/about.json")
      .then((res) => {
        if (!res.ok) throw new Error("About settings not found");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setAbout({
          eyebrow: data.eyebrow || "About",
          title: data.title || "Hey, I'm Charles",
          body:
            data.body ||
            "Welcome! I'm Charles. A 26yo finally pursuing my childhood dream of becoming a game designer. Explore my journal entries on game dev, coding, meetup learnings, and fun side quests that involve games. It's mostly for me, but I hope you enjoy reading and learn something too. If an entry helps, subscribing would make my day. P.L.S. (Peace, love, and soul).",
          image: data.image || "",
          imageAlt: data.imageAlt || "",
        });
      })
      .catch(() => {});
  }, []);

  const normalizeTags = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string") {
      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    return [];
  };

  const isRecentPost = (dateValue) => {
    const time = new Date(dateValue || 0).getTime();
    if (!Number.isFinite(time)) return false;
    const diff = Date.now() - time;
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    return diff >= 0 && diff <= twoWeeks;
  };

  const getReadingTime = (post) => {
    const minutes = Number(post?.readingTime);
    if (Number.isFinite(minutes) && minutes > 0) return minutes;
    const words = (post?.description || "").split(/\s+/).filter(Boolean).length;
    return words ? Math.max(1, Math.round(words / 200)) : null;
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a?.date || 0).getTime();
      const dateB = new Date(b?.date || 0).getTime();
      return dateB - dateA;
    });
  }, [posts]);

  const marqueePosts = useMemo(() => {
    if (sortedPosts.length === 0) return [];
    return [...sortedPosts, ...sortedPosts];
  }, [sortedPosts]);


  useEffect(() => {
    if (!recaptchaSiteKey) return;
    if (!recaptchaScriptPromise.current) {
      recaptchaScriptPromise.current = new Promise((resolve, reject) => {
        const existingScript = document.querySelector(
          'script[src^="https://www.google.com/recaptcha/api.js"]',
        );
        if (existingScript) {
          if (window.grecaptcha) {
            resolve();
          } else {
            existingScript.addEventListener("load", resolve, {once: true});
            existingScript.addEventListener(
              "error",
              () => reject(new Error("Captcha failed to load.")),
              {once: true},
            );
          }
          return;
        }

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Captcha failed to load."));
        document.head.appendChild(script);
      });
    }
  }, [recaptchaSiteKey]);

  useEffect(() => {
    const rowA = marqueeRowRefA.current;
    if (!rowA || marqueePosts.length === 0) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setupMarquee = (container, direction) => {
      const state = {
        isDragging: false,
        isHovering: false,
        startX: 0,
        startScrollLeft: 0,
        pauseUntil: 0,
      };

      let rafId = null;
      let lastTime = performance.now();
      const speed = 0.02;

      const normalizeScroll = () => {
        const half = container.scrollWidth / 2;
        if (half <= 0) return;
        if (direction < 0 && container.scrollLeft < 0) {
          container.scrollLeft += half;
        } else if (direction > 0 && container.scrollLeft >= half) {
          container.scrollLeft -= half;
        }
      };

      const step = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        if (
          !prefersReducedMotion &&
          !state.isDragging &&
          !state.isHovering &&
          Date.now() >= state.pauseUntil
        ) {
          container.scrollLeft += delta * speed * direction;
          normalizeScroll();
        }

        rafId = requestAnimationFrame(step);
      };

      const pause = (duration = 1200) => {
        state.pauseUntil = Date.now() + duration;
      };

      const handlePointerDown = (event) => {
        if (event.pointerType !== "mouse") return;
        state.isDragging = true;
        state.startX = event.clientX;
        state.startScrollLeft = container.scrollLeft;
        container.classList.add("is-dragging");
        pause(2000);
        try {
          container.setPointerCapture(event.pointerId);
        } catch {}
      };

      const handlePointerMove = (event) => {
        if (!state.isDragging) return;
        const delta = event.clientX - state.startX;
        container.scrollLeft = state.startScrollLeft - delta;
      };

      const handlePointerUp = (event) => {
        if (event.pointerType !== "mouse") return;
        state.isDragging = false;
        container.classList.remove("is-dragging");
        pause(1200);
        try {
          container.releasePointerCapture(event.pointerId);
        } catch {}
      };

      const handleMouseEnter = () => {
        state.isHovering = true;
      };

      const handleMouseLeave = () => {
        state.isHovering = false;
        pause(800);
      };

      const handleWheel = () => pause(1200);

      const half = container.scrollWidth / 2;
      if (direction < 0 && half > 0) {
        container.scrollLeft = half;
      }

      rafId = requestAnimationFrame(step);
      container.addEventListener("pointerdown", handlePointerDown);
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerup", handlePointerUp);
      container.addEventListener("pointerleave", handlePointerUp);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("wheel", handleWheel, {passive: true});
      container.addEventListener("touchstart", handleWheel, {passive: true});
      container.addEventListener("scroll", handleWheel, {passive: true});

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        container.removeEventListener("pointerdown", handlePointerDown);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerup", handlePointerUp);
        container.removeEventListener("pointerleave", handlePointerUp);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleWheel);
        container.removeEventListener("scroll", handleWheel);
      };
    };

    const cleanupA = setupMarquee(rowA, 1);

    return () => {
      cleanupA();
    };
  }, [marqueePosts.length]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      hero.style.setProperty("--hero-parallax", "0px");
      return;
    }

    let rafId = null;

    const updateParallax = () => {
      rafId = null;
      const rect = hero.getBoundingClientRect();
      const offset = Math.max(-80, Math.min(80, rect.top * -0.2));
      hero.style.setProperty("--hero-parallax", `${offset.toFixed(1)}px`);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, {passive: true});
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getRecaptchaToken = async () => {
    if (!recaptchaSiteKey) {
      throw new Error("Captcha is not configured.");
    }

    if (recaptchaScriptPromise.current) {
      await recaptchaScriptPromise.current;
    }

    if (!window.grecaptcha) {
      throw new Error("Captcha failed to load.");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(recaptchaSiteKey, {action: "subscribe"})
          .then(resolve)
          .catch(() => reject(new Error("Captcha verification failed.")));
      });
    });
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    try {
      const token = await getRecaptchaToken();

      const response = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, recaptchaToken: token}),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data.message || "Subscription failed. Please try again.",
        );
      }

      setStatus("success");
      setMessage("You are in. New entries will land in your inbox.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-3 pb-10 flex flex-col items-center text-center">
      <nav
        className={`nav-sticky w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isNavScrolled ? "nav-sticky--active" : ""
        }`}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-steel">
            Charlesville
          </p>
          <p className="font-display text-lg text-haze">Game Dev Journal</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-steel">
          <a href="#posts" className="nav-link transition-colors">
            Posts
          </a>
          <Link to="/posts" className="nav-link transition-colors">
            All posts
          </Link>
          <a href="#about" className="nav-link transition-colors">
            About
          </a>
          <a href="#subscribe" className="nav-link transition-colors">
            Subscribe
          </a>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-slate bg-smoke/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-fog backdrop-blur hover:text-haze hover:border-haze transition"
          aria-label="Toggle color theme">
          {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          <span className="hidden sm:inline">
            {theme === "light" ? "Night" : "Day"}
          </span>
        </button>
      </nav>

      <section
        className="hero-bleed mt-4"
        ref={heroRef}
        style={{
          "--hero-image": hero.image ? `url(${hero.image})` : "none",
        }}>
        <div className="hero-bleed__noise" aria-hidden="true" />
        <div className="hero-bleed__content mx-auto w-full max-w-6xl px-6 pt-8 pb-14 sm:px-10 sm:pt-12 sm:pb-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-steel">
              {hero.eyebrow}
            </p>
            <h1 className="hero-title text-4xl sm:text-5xl font-display font-semibold text-haze">
              {hero.title}
            </h1>
            <p className="hero-copy text-fog max-w-2xl">{hero.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#posts"
              className="cta-button px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze hover:text-noir transition">
              {hero.ctaPrimary}
            </a>
              <a
                href="#subscribe"
                className="px-6 py-3 rounded-full border border-slate text-fog hover:text-haze hover:border-haze transition">
                {hero.ctaSecondary}
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl mt-6">
              {[
                {label: "Cadence", value: hero.cadence},
                {label: "Focus", value: hero.focus},
                {label: "Mood", value: hero.mood},
              ].map((item) => (
              <div
                key={item.label}
                className="hero-stat rounded-2xl border border-slate/60 bg-smoke/70 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-steel">
                  {item.label}
                </p>
                  <p className="mt-2 text-haze font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <AboutSection
            eyebrow={about.eyebrow}
            title={about.title}
            body={about.body}
            image={about.image}
            imageAlt={about.imageAlt}
            theme={theme}
          />
        </div>
      </section>

      {sortedPosts.length === 0 ? (
        <p className="text-steel mt-10">
          No entries yet. Add one via the CMS!
        </p>
      ) : (
        <div id="posts" className="w-full max-w-6xl mt-12">
          <div className="mb-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-steel">
              Latest entries
            </p>
            <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
              Recent journal notes
            </h2>
          </div>
          <div className="marquee-shell marquee-shell--single">
            <div className="marquee-row" ref={marqueeRowRefA}>
              {marqueePosts.map((post, index) => {
                const tags = normalizeTags(post.tags);
                const isNew = isRecentPost(post.date);
                const readingTime = getReadingTime(post);
                const dateLabel = post.date
                  ? new Date(post.date).toLocaleDateString()
                  : "Entry";
              const badges = [
                ...(post.category ? [post.category] : []),
                ...tags,
              ];
              const maxBadges = 4;
              const extraCount = badges.length - maxBadges;
              const displayBadges =
                extraCount > 0
                  ? [...badges.slice(0, maxBadges - 1), `+${extraCount} more`]
                  : badges.slice(0, maxBadges);

                return (
                  <Card
                    key={`${post.slug}-${index}`}
                    className="card-interactive marquee-card min-w-[260px] sm:min-w-[320px] lg:min-w-[360px] shadow-glow hover:shadow-ember transition duration-300 hover:-translate-y-1 scanline">
                    <CardHeader>
                      <div className="card-tag-row flex flex-wrap gap-2 mb-3">
                        {isNew ? (
                          <span className="card-badge card-badge--new text-[10px] uppercase tracking-[0.25em] rounded-full px-3 py-1">
                            New
                          </span>
                        ) : null}
                        {displayBadges.map((badge) => (
                          <span
                            key={badge}
                            className="card-badge text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <CardTitle className="text-xl mb-1 text-haze">
                        {post.title}
                      </CardTitle>
                      <div className="card-meta">
                        <CardDescription className="text-xs uppercase tracking-[0.2em] text-steel">
                          {dateLabel}
                        </CardDescription>
                        {readingTime ? (
                          <span className="card-readtime">~{readingTime} min read</span>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-fog card-description-clamp">
                        {post.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        to={`/posts/${post.slug}`}
                        className="text-neon hover:text-haze underline">
                        Read entry
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <section id="subscribe" className="w-full max-w-4xl mt-14">
        <div className="glass-panel rounded-3xl px-6 py-8 sm:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">
            Subscribe
          </p>
          <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
            Follow the journal
          </h2>
          <p className="text-steel mt-3">
            Short notes. No noise. Just the latest entries as they land.
          </p>
          <form
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="youremail@address.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full sm:w-64 rounded-full border border-slate bg-smoke px-4 py-3 text-fog placeholder:text-steel focus:outline-none"
              required
            />
            <button
              type="submit"
              className="cta-button px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition"
              disabled={status === "loading"}>
              {status === "loading" ? "Signing you up..." : "Get new entries"}
            </button>
          </form>
          {message ? (
            <p
              className={`mt-3 text-sm ${
                status === "error"
                  ? "text-pulse"
                  : "text-haze subscribe-success"
              }`}>
              {message}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Home;
