"use client";

import ScrollMotion from "./ScrollMotion";

export default function ScrollMotionClient() {
  // Có thể thêm kiểm tra “mounted” nếu muốn tránh flash:
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);
  // if (!mounted) return null;

  return <ScrollMotion />;
}
