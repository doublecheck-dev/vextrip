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

export async function fetchRestaurantById(id: string | number): Promise<any | null> {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) return null;
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/restaurants?id=eq.${id}&select=*`;
	const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Accept: 'application/json' } });
	if (!res.ok) { console.error('fetchRestaurantById error', await res.text()); return null; }
	const rows = await res.json();
	return Array.isArray(rows) && rows.length ? rows[0] : null;
}

export async function fetchMenusByRestaurant(restaurantId: string | number): Promise<any[]> {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) return [];
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/menus?select=*&restaurant_id=eq.${restaurantId}&order=title.asc`;
	const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Accept: 'application/json' } });
	if (!res.ok) { console.error('fetchMenusByRestaurant error', await res.text()); return []; }
	return await res.json();
}

export async function fetchMenuItemsByMenu(menuId: string | number): Promise<any[]> {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) return [];
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/menu_items?select=*&menu_id=eq.${menuId}&order=position.asc`;
	const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Accept: 'application/json' } });
	if (!res.ok) { console.error('fetchMenuItemsByMenu error', await res.text()); return []; }
	return await res.json();
}

export async function fetchTablesByRestaurant(restaurantId: string | number): Promise<any[]> {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) return [];
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/restaurant_tables?select=*&restaurant_id=eq.${restaurantId}&order=number.asc`;
	const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Accept: 'application/json' } });
	if (!res.ok) { console.error('fetchTablesByRestaurant error', await res.text()); return []; }
	return await res.json();
}

export async function fetchTableById(tableId: string | number): Promise<any | null> {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) return null;
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/restaurant_tables?id=eq.${tableId}&select=*`;
	const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Accept: 'application/json' } });
	if (!res.ok) { console.error('fetchTableById error', await res.text()); return null; }
	const rows = await res.json();
	return Array.isArray(rows) && rows.length ? rows[0] : null;
}

export async function updateTableStatus(tableId: string | number, status: string) {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Supabase env vars missing');
	const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/restaurant_tables?id=eq.${tableId}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers: {
			'apikey': SUPABASE_KEY,
			'Authorization': `Bearer ${SUPABASE_KEY}`,
			'Content-Type': 'application/json',
			'Prefer': 'return=representation'
		},
		body: JSON.stringify({ status, updated_at: new Date().toISOString() })
	});
	if (!res.ok) { throw new Error(`updateTableStatus failed: ${res.status} ${await res.text()}`); }
	return await res.json();
}
