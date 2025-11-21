import { SITE } from "@/config";

// Minimal i18n dictionary structure. Add more locales as needed.
const locales: Record<
  string,
  {
    breadcrumbNames: Record<string, string>;
    // other global translations can go here in future
  }
> = {
  zh: {
    breadcrumbNames: {
      posts: "文章",
      tags: "标签",
      about: "关于",
      archives: "归档",
      search: "搜索",
    },
  },
  en: {
    breadcrumbNames: {
      posts: "Posts",
      tags: "Tags",
      about: "About",
      archives: "Archives",
      search: "Search",
    },
  },
};

export const LOCALE = locales[SITE.lang ?? "en"] ?? locales.en;

export default LOCALE;
