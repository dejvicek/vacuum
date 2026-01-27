export function trimString<T>(value: T): T | string {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value;
}
