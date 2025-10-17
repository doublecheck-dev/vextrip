import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ImageUploader from '../atoms/ImageUploader';

const initialForm = {
  name: '',
  description: '',
  image: '',
  gallery: [],
  rating: '',
  reviews: '',
  category: '',
  cuisine: '',
  location: '',
  address: '',
  price_range: '',
  phone: '',
  email: '',
  website: '',
  open_hours: '',
  featured: false,
  amenities: [],
  specialties: [],
  reservation_required: false,
  policies: [],
};

export default function RegisterRestaurantForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleArrayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.split(',').map(v => v.trim()).filter(Boolean) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      rating: form.rating ? Number(form.rating) : null,
      reviews: form.reviews ? Number(form.reviews) : null,
    };
    const { error } = await supabase.from('restaurants').insert([payload]);
    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    onSuccess();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Registrar Restaurante</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="w-full mb-2 p-2 border rounded text-gray-800" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="w-full mb-2 p-2 border rounded text-gray-800" required />
        <ImageUploader onUpload={url => setForm({ ...form, image: url })} folderPath="images/restaurantes/magia_natural" />
        {form.image && <img src={form.image} alt="Imagen subida" className="w-32 h-32 object-cover mt-2" />}
        <input name="gallery" value={form.gallery.join(', ')} onChange={handleArrayChange} placeholder="Galería (URLs separadas por coma)" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" type="number" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="reviews" value={form.reviews} onChange={handleChange} placeholder="Cantidad de reviews" type="number" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="Tipo de cocina" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Ubicación" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="price_range" value={form.price_range} onChange={handleChange} placeholder="Rango de precios" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Sitio web" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="open_hours" value={form.open_hours} onChange={handleChange} placeholder="Horario de apertura" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <label className="flex items-center mb-2">
          <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} className="mr-2" />
          Destacado
        </label>
        <input name="amenities" value={form.amenities.join(', ')} onChange={handleArrayChange} placeholder="Comodidades (separadas por coma)" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <input name="specialties" value={form.specialties.join(', ')} onChange={handleArrayChange} placeholder="Especialidades (separadas por coma)" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <label className="flex items-center mb-2">
          <input name="reservation_required" type="checkbox" checked={form.reservation_required} onChange={handleChange} className="mr-2" />
          Requiere reserva
        </label>
        <input name="policies" value={form.policies.join(', ')} onChange={handleArrayChange} placeholder="Políticas (separadas por coma)" className="w-full mb-2 p-2 border rounded text-gray-800" />
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancelar
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </>
  );
}
