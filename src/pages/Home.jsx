import React, {useEffect, useRef, useState} from "react";
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
  });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaScriptPromise = useRef(null);

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
          });
        }
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
    <div className="container mx-auto px-4 py-10 flex flex-col items-center text-center">
      <nav className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-steel">
            Charlesville
          </p>
          <p className="font-display text-lg text-haze">Game Dev Journal</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-steel">
          <a href="#posts" className="hover:text-haze transition-colors">
            Posts
          </a>
          <a href="#about" className="hover:text-haze transition-colors">
            About
          </a>
          <a href="#subscribe" className="hover:text-haze transition-colors">
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

      <section className="glass-panel w-full max-w-6xl mt-10 px-6 py-10 sm:px-10 sm:py-12 rounded-3xl">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-steel">
            {hero.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-haze">
            {hero.title}
          </h1>
          <p className="text-steel max-w-2xl">{hero.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#posts"
              className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition">
              {hero.ctaPrimary}
            </a>
            <a
              href="#subscribe"
              className="px-6 py-3 rounded-full border border-slate text-fog hover:text-haze hover:border-haze transition">
              {hero.ctaSecondary}
            </a>
          </div>
          <div className="w-full max-w-5xl">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="w-full rounded-2xl border border-slate/60 shadow-ember"
              loading="lazy"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
            {[
              {label: "Cadence", value: "Bi-weekly"},
              {label: "Focus", value: "Game design journal"},
              {label: "Mood", value: "Mellow futurism"},
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate/70 px-5 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-steel">
                  {item.label}
                </p>
                <p className="mt-2 text-haze font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="text-steel mt-10">
          No entries yet. Add one via the CMS!
        </p>
      ) : (
        <div id="posts" className="w-full max-w-6xl mt-12">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-steel">
              Latest entries
            </p>
            <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
              Recent journal notes
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const tags = normalizeTags(post.tags);
              const badges = [
                ...(post.category ? [post.category] : []),
                ...tags,
              ];

              return (
                <Card
                  key={post.slug}
                  className="shadow-glow hover:shadow-ember transition duration-300 hover:-translate-y-1 scanline">
                  <CardHeader>
                    {badges.length ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {badges.slice(0, 3).map((badge) => (
                          <span
                            key={badge}
                            className="text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1">
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <CardTitle className="text-xl mb-1 text-haze">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-xs uppercase tracking-[0.2em] text-steel">
                      {new Date(post.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-fog">{post.description}</p>
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
      )}

      <section id="about" className="w-full max-w-4xl mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">About</p>
        <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
          Hey, I’m Charles
        </h2>
        <p className="text-steel mt-3">
          Welcome! I'm Charles. A 26yo finally pursuing my childhood dream of
          becoming a game designer. Explore my journal entries on game dev,
          coding, meetup learnings, and fun side quests that involve games. It's
          mostly for me, but I hope you enjoy reading and learn something too.
          If an entry helps, subscribing would make my day. P.L.S. (Peace, love,
          and soul).
        </p>
      </section>

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
              className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition"
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
