const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { Feed } = require("feed");

const postsDir = path.resolve("public", "posts");
const outputFile = path.resolve("public", "rss.xml");

const siteUrl =
  process.env.URL ||
  process.env.DEPLOY_URL ||
  process.env.SITE_URL ||
  "https://charlesville-blog-react.netlify.app";

const readFrontmatter = (content) => {
  if (!content.startsWith("---")) return { data: {}, body: content };
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  try {
    const data = yaml.load(match[1]) || {};
    return { data, body: match[2] };
  } catch {
    return { data: {}, body: match[2] };
  }
};

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

const getExcerpt = (body) => {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines[0] || "";
};

const toStringOrEmpty = (value) =>
  typeof value === "string" ? value : value?.toString?.() || "";

const buildFeed = () => {
  if (!fs.existsSync(postsDir)) {
    console.error("Posts directory not found:", postsDir);
    process.exit(1);
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const stats = fs.statSync(filePath);
    const { data, body } = readFrontmatter(content);

    const dateValue = toStringOrEmpty(data.date);
    const parsedDate = dateValue ? new Date(dateValue) : null;
    const date = parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate
      : stats.mtime;

    const title = toStringOrEmpty(data.title) || "Untitled entry";
    const description =
      toStringOrEmpty(data.description) || getExcerpt(body) || "";
    const url = `${siteUrl}/posts/${slug}`;

    const categories = [
      ...normalizeTags(data.tags),
      ...(data.category ? [data.category] : []),
    ];

    return {
      title,
      id: url,
      link: url,
      description,
      date,
      category: categories.map((label) => ({ name: label })),
    };
  });

  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  const updated = items.length ? items[0].date : new Date();

  const feed = new Feed({
    title: "Charles's Game Design Journal",
    description: "A blog-journal of game design, builds, and lessons learned.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/vite.svg`,
    updated,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  items.forEach((item) => feed.addItem(item));

  fs.writeFileSync(outputFile, feed.rss2());
  console.log(`Wrote RSS feed to ${outputFile}`);
};

buildFeed();
