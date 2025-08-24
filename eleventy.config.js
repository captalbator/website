import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import hljs from "highlight.js";

export default function(eleventyConfig) {
  const markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,

    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch(__) {}
      }
    }
  }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addWatchTarget("./src/style.css");

  return {
    dir: {
      input: "src",
    },
  };
};
