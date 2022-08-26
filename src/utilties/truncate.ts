export function truncateChars(
  desc: string | undefined,
  length: number
): string {
  if (!desc) return "";
  if (desc.length > length) return desc.slice(0, length) + "...";
  return desc;
}
