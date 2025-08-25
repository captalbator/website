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

  eleventyConfig.addShortcode("excerpt", (post) => {
    if (!post.templateContent) return "";
    if (post.templateContent.indexOf("</p>") > 0) {
      let end = post.templateContent.indexOf("</p>");
      return post.templateContent.substr(0, end + 4);
    }
    return post.templateContent;
  });

  eleventyConfig.addShortcode("format-date", (date) => {
    if (!date) return "";
  });

  eleventyConfig.addCollection("tags", (collectionApi) => {
    let tags = new Set();
    let posts = collectionApi.getFilteredByTag("post");
    posts.forEach(p => {
      p.data.tags.forEach(t => {
        if (t != "post") {
          tags.add(t);
        }
      });
    });
    return Array.from(tags);
  });

  eleventyConfig.addFilter("filterByTag", (posts, tag) => {
    tag = tag.toLowerCase();
    let result = posts.filter(p => {
      let tags = p.data.tags.map(s => s.toLowerCase());
      return tags.includes(tag);
    });
    return result;
  });

  return {
    dir: {
      input: "src",
    },
  };
};
