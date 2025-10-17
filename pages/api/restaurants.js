import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('restaurants').select('*');
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, data });
  }

  if (req.method === 'POST') {
    const restaurant = req.body;
    const { data, error } = await supabase.from('restaurants').insert([restaurant]);
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(201).json({ success: true, data });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
