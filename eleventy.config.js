import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import hljs from "highlight.js";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  eleventyConfig.addFilter("md", (content) => {
    return markdownIt({ html: true }).render(content);
  })
  
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "loudbytes",
      subtitle: "Posts about programming and video games",
      base: "https://loudbytes.dev/",
      author: {
        name: "Antoine Gallien",
      }
    }
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: (file, options) => {
      // Return the first paragraph
      file.excerpt = file.content.split('\n\n').slice(0, 1).join(' ');
    },
  })

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


  eleventyConfig.addShortcode("excerptcutoff", (post, max) => {
    if (!post.templateContent) return "";
    if (post.templateContent.indexOf("</p>") > 0) {
      let end = post.templateContent.indexOf("</p>");
      if (end > max) {
        return post.templateContent.substr(0, max) + "...";
      }
      return post.templateContent.substr(0, end + 4);
    }
    return post.templateContent;
  });

  eleventyConfig.addShortcode("formatdate", (date) => {
    if (!date) return "";

    let day = date.getUTCDate();
    let day_string = day.toString();
    if (day < 10) {
      day_string = "0" + day_string;
    }

    let month = date.getUTCMonth() + 1;
    let month_string = month.toString();
    if (month < 10) {
      month_string = "0" + month_string;
    }

    let year_string = date.getUTCFullYear().toString();

    return year_string + "-" + month_string + "-" + day_string;
  })

  eleventyConfig.addShortcode("formatdatefull", (date) => {
    if (!date) return "";

    let day = date.getUTCDate();
    let day_string = day.toString();

    let mod = day % 10;
    if (day == 11 || day == 12 || day == 13) {
      day_string = day_string + "th";
    } else if (mod == 1) {
      day_string = day_string + "st";
    } else if (mod == 2) {
      day_string = day_string + "nd";
    } else if (mod == 3) { 
      day_string = day_string + "rd";
    } else {
      day_string = day_string + "th";
    }

    let month_string = months[date.getUTCMonth()];
    let year_string = date.getUTCFullYear().toString();

    return month_string + " " + day_string + ", " + year_string;
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
