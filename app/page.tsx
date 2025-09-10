// app/page.tsx
import { redirect } from "next/navigation";

const DEFAULT_LOCALE = "vi" as const;

export default function RootIndex() {
  // Chuyển hẳn về /vi (hoặc /en nếu bạn muốn)
  redirect(`/${DEFAULT_LOCALE}`);
}