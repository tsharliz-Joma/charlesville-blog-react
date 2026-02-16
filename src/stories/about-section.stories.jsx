import React from "react";
import AboutSection from "../components/about-section";

export default {
  title: "Home/About Section",
  component: AboutSection,
  decorators: [
    (Story) => (
      <div className="bg-noir text-fog min-h-screen px-6 py-10">
        <Story />
      </div>
    ),
  ],
  args: {
    eyebrow: "About",
    title: "Hey, I'm Charles",
    body:
      "Welcome! I'm Charles. A 26yo finally pursuing my childhood dream of becoming a game designer.\n\nThis journal covers game dev, travel, and the things I'm learning along the way.",
    image: "/hero-default.svg",
    imageAlt: "A moody hero image",
    theme: "dark",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["dark", "light"],
    },
  },
};

export const Default = {};

export const NoImage = {
  args: {
    image: "",
    imageAlt: "",
  },
};
