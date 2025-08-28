export type BotItem = {
  key: string; // slug key (dùng build URL)
  name: string; // tên hiển thị
  summary?: string; // mô tả ngắn
  logo: string; // đường dẫn ảnh (public)
  link?: string; // tuỳ chọn, mặc định /product/<key>
  price?: string | number | { service: string; price: string }[];
  headquarters?: string;
  founded?: string;
  tag?: string[];
  features?: string[];
  strengths?: string[];
  weaknesses?: string[];
  targetUsers?: string[];
};
// ---------Category
// Một tool được tham chiếu bằng key
export type ToolRef = {
  key: string;
};

// Một tag (nhóm con) trong category
export type TagGroup = {
  key: string;
  tools: ToolRef[];
};

export type CategoryData = {
  key: string;
  title: string;
  desc: string;
  tags?: TagGroup[];
};
