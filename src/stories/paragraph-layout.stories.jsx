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

const ParagraphSection = ({ heading, text, imageAlign }) => {
  const showImage = imageAlign !== "none";
  return (
    <section className="mb-8">
      {heading ? (
        <div className="prose prose-invert prose-blade max-w-none">
          <h2>{heading}</h2>
        </div>
      ) : null}
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

const MultiSectionLayoutPreview = ({ sections }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {sections.map((section, index) => (
        <ParagraphSection
          key={`${section.heading}-${index}`}
          heading={section.heading}
          imageAlign={section.imageAlign}
          text={section.text}
        />
      ))}
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

export const OneSectionTextOnly = {
  parameters: {
    controls: { exclude: ["imageAlign"] },
  },
  render: () => (
    <MultiSectionLayoutPreview
      sections={[
        {
          heading: "Text-only section",
          imageAlign: "none",
          text: "This section has no image. It should feel calm, readable, and spaced like a real journal entry.",
        },
      ]}
    />
  ),
};

export const TwoSectionsMixed = {
  parameters: {
    controls: { exclude: ["imageAlign"] },
  },
  render: () => (
    <MultiSectionLayoutPreview
      sections={[
        {
          heading: "Left aligned image",
          imageAlign: "left",
          text: "The first section uses a left-aligned image, so the text flows around it on larger screens.",
        },
        {
          heading: "Right aligned image",
          imageAlign: "right",
          text: "The second section flips the layout to the right for variety and rhythm.",
        },
      ]}
    />
  ),
};

export const ThreeSections = {
  parameters: {
    controls: { exclude: ["imageAlign"] },
  },
  args: {
    sectionOneAlign: "left",
    sectionTwoAlign: "center",
    sectionThreeAlign: "none",
  },
  argTypes: {
    sectionOneAlign: {
      control: "select",
      options: ["none", "left", "right", "center"],
    },
    sectionTwoAlign: {
      control: "select",
      options: ["none", "left", "right", "center"],
    },
    sectionThreeAlign: {
      control: "select",
      options: ["none", "left", "right", "center"],
    },
  },
  render: (args) => (
    <MultiSectionLayoutPreview
      sections={[
        {
          heading: "Left aligned image",
          imageAlign: args.sectionOneAlign,
          text: "Section one introduces the idea with a left image.",
        },
        {
          heading: "Center aligned image",
          imageAlign: args.sectionTwoAlign,
          text: "Section two centers the image for emphasis and breathing room.",
        },
        {
          heading: "Text-only close",
          imageAlign: args.sectionThreeAlign,
          text: "Section three closes without an image, keeping the focus on the takeaway.",
        },
      ]}
    />
  ),
};
