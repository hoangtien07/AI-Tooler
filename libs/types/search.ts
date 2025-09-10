export type SearchBlogItem = {
  _id: string;
  type: "blog";
  title: string;
  slug: string;
  image?: string;
  views?: number;
  snippet: string; // có thể chứa <mark>...</mark>
  matchIn: string[];
};
export type SearchBotItem = {
  _id: string;
  type: "bot";
  name: string;
  category: string;
  slug: string;
  image?: string;
  summary?: string;
  description?: string;
};
export type SearchAllResponse = {
  query: string;
  counts: { bots: number; blogs: number };
  tabs: {
    blogs: SearchBlogItem[];
    bots: SearchBotItem[];
  };
};
export type SearchBlogResponse = {
  query: string;
  counts: { blogs: number };
  tabs: {
    blogs: SearchBlogItem[];
  };
};
export type SearchBotResponse = {
  query: string;
  counts: { bots: number };
  tabs: {
    bots: SearchBotItem[];
  };
};

export type Paginated<T> = { total: number; items: T[] };
