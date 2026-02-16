import React from "react";
import ReactMarkdown from "react-markdown";

const AboutSection = ({eyebrow, title, body, image, imageAlt, theme}) => {
  return (
    <section id="about" className="w-full max-w-4xl mt-10 text-center">
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
