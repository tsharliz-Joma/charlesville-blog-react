import React from "react";

const HeroPreview = ({
  eyebrow,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  cadence,
  focus,
  mood,
}) => {
  return (
    <section
      className="hero-bleed"
      style={{
        "--hero-image": "url(/hero-default.svg)",
      }}>
      <div className="hero-bleed__content mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-14 text-center sm:px-10 sm:py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-steel">
          {eyebrow}
        </p>
        <h1 className="hero-title text-4xl sm:text-5xl font-display font-semibold text-haze">
          {title}
        </h1>
        <p className="hero-copy text-fog max-w-2xl">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition">
            {ctaPrimary}
          </button>
          <button className="px-6 py-3 rounded-full border border-slate text-fog hover:text-haze hover:border-haze transition">
            {ctaSecondary}
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl mt-6">
          {[
            {label: "Cadence", value: cadence},
            {label: "Focus", value: focus},
            {label: "Mood", value: mood},
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
    </section>
  );
};

export default {
  title: "Hero",
  component: HeroPreview,
  tags: ["autodocs"],
  args: {
    eyebrow: "Game design journal",
    title: "Charles's Game Design Journal",
    description:
      "A blog-journal of game design, builds, and lessons I pick up along the way.",
    ctaPrimary: "Browse entries",
    ctaSecondary: "Get journal updates",
    cadence: "Bi-weekly",
    focus: "Game design journal",
    mood: "Mellow futurism",
  },
};

export const Default = {};
