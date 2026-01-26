export function normalizeUsername(value: unknown): unknown {
  return typeof value === 'string' ? value.trim().toLowerCase() : value;
}
