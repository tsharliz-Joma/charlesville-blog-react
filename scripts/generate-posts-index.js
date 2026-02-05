const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const postsDir = path.resolve("public", "posts");
const outputFile = path.join(postsDir, "index.json");

const readFrontmatter = (content) => {
  if (!content.startsWith("---")) return {};
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return {};
  try {
    const data = yaml.load(match[1]);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
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

const toStringOrEmpty = (value) =>
  typeof value === "string" ? value : value?.toString?.() || "";

const buildIndex = () => {
  if (!fs.existsSync(postsDir)) {
    console.error("Posts directory not found:", postsDir);
    process.exit(1);
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"));

  const entries = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(postsDir, file), "utf8");
    const data = readFrontmatter(content);

    return {
      slug,
      title: toStringOrEmpty(data.title) || "Untitled entry",
      date: toStringOrEmpty(data.date) || "",
      description: toStringOrEmpty(data.description) || "",
      category: toStringOrEmpty(data.category) || "",
      tags: normalizeTags(data.tags),
      image: toStringOrEmpty(data.image) || "",
      imageAlt: toStringOrEmpty(data.imageAlt) || "",
      spotifyUrl: toStringOrEmpty(data.spotifyUrl) || "",
      spotifyLabel: toStringOrEmpty(data.spotifyLabel) || "",
    };
  });

  entries.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2));
  console.log(`Wrote ${entries.length} posts to ${outputFile}`);
};

buildIndex();
