import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const { data, error } = await supabase.from('test_table').insert([{ name }]);
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, data });
  }

  // GET: fetch data
  const { data, error } = await supabase.from('test_table').select('*').limit(10);
  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
  return res.status(200).json({ success: true, data });
}
