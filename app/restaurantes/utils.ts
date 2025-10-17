export function normalizeList(val?: string[] | string | null): string[] {
	if (!val) return [];
	if (Array.isArray(val)) return val as string[];
	return ('' + val).split(',').map(s => s.trim()).filter(Boolean);
}
