import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ImageUploader({ onUpload, folderPath = '' }: { onUpload: (url: string) => void; folderPath?: string }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const filePath = folderPath ? `${folderPath}/${file.name}` : `images/restaurantes/magia_natural/${file.name}`;
    const { data, error } = await supabase.storage
      .from('resources')
      .upload(filePath, file, {
        upsert: true, // Overwrite if file exists
      });
    if (error) {
      setError(error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = await supabase.storage
      .from('resources')
      .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days expiration in seconds
    if (urlData?.signedUrl) {
      onUpload(urlData.signedUrl);
    } else {
      setError('No se pudo obtener la URL firmada.');
    }
    setUploading(false);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <span>Subiendo imagen...</span>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
