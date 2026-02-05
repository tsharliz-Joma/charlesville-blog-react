import React from "react";

const HeroPreview = ({
  eyebrow,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}) => {
  return (
    <section className="glass-panel w-full max-w-4xl mx-auto px-6 py-10 rounded-3xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-steel">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-display font-semibold text-haze">
          {title}
        </h1>
        <p className="text-steel max-w-2xl">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition">
            {ctaPrimary}
          </button>
          <button className="px-6 py-3 rounded-full border border-slate text-fog hover:text-haze hover:border-haze transition">
            {ctaSecondary}
          </button>
        </div>
        <div className="w-full max-w-3xl">
          <div className="h-48 rounded-2xl border border-slate/60 shadow-ember bg-slate" />
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
  },
};

export const Default = {};
