export async function fetchRestaurants(): Promise<any[]> {
	// Usa variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!SUPABASE_URL || !SUPABASE_KEY) {
		console.warn('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
		return [];
	}

	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/restaurants?select=*`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'apikey': SUPABASE_KEY,
			'Authorization': `Bearer ${SUPABASE_KEY}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('Supabase REST error:', res.status, text);
		throw new Error(`Supabase REST error: ${res.status}`);
	}

	const data = await res.json();
	return Array.isArray(data) ? data : [];
}
