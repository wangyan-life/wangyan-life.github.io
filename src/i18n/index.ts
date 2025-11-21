import { SITE } from "@/config";

// Minimal i18n dictionary structure. Add more locales as needed.
const locales: Record<
  string,
  {
    breadcrumbNames: Record<string, string>;
    // other global translations can go here in future
    months: string[];
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
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
  },
  en: {
    breadcrumbNames: {
      posts: "Posts",
      tags: "Tags",
      about: "About",
      archives: "Archives",
      search: "Search",
    },
    months: [
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
    ],
  },
};

export const LOCALE = locales[SITE.lang ?? "en"] ?? locales.en;

export default LOCALE;
