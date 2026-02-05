import React from "react";

const buildImageClass = (align) => {
  const base =
    "rounded-2xl border border-slate/60 shadow-ember mb-4 w-full object-cover";
  if (align === "left") {
    return `${base} sm:w-56 md:w-64 float-left mr-6`;
  }
  if (align === "right") {
    return `${base} sm:w-56 md:w-64 float-right ml-6`;
  }
  return `${base} max-w-2xl mx-auto`;
};

const ParagraphSection = ({ text, imageAlign }) => {
  const showImage = imageAlign !== "none";
  return (
    <section className="mb-8">
      {showImage ? (
        <div className="not-prose">
          <div
            className={buildImageClass(imageAlign)}
            aria-hidden="true"
            style={{ background: "#2a323d", height: 180 }}
          />
        </div>
      ) : null}
      <div className="prose prose-invert prose-blade max-w-none">
        <p>{text}</p>
      </div>
      {showImage && (imageAlign === "left" || imageAlign === "right") ? (
        <div className="clear-both" />
      ) : null}
    </section>
  );
};

const ParagraphLayoutPreview = ({ imageAlign }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <ParagraphSection
        imageAlign={imageAlign}
        text="This is a sample paragraph to show how text wraps around an image when it is aligned left or right. It should feel natural and easy to read."
      />
    </div>
  );
};

export default {
  title: "Entries/Paragraph Layout",
  component: ParagraphLayoutPreview,
  tags: ["autodocs"],
  args: {
    imageAlign: "left",
  },
  argTypes: {
    imageAlign: {
      control: "select",
      options: ["none", "left", "right", "center"],
    },
  },
};

export const Left = {
  args: { imageAlign: "left" },
};

export const Right = {
  args: { imageAlign: "right" },
};

export const Center = {
  args: { imageAlign: "center" },
};

export const None = {
  args: { imageAlign: "none" },
};
