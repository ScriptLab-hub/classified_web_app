import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const CreateSponsoredAd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cta_text: '',
    cta_action: '',
    placement: 'footer',
    is_active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please upload an image for the ad.');
      return;
    }
    setLoading(true);

    // 1. Upload image to storage
    const filePath = `${Date.now()}_${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('sponsored-ads')
      .upload(filePath, imageFile);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setLoading(false);
      return;
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage.from('sponsored-ads').getPublicUrl(filePath);

    // 3. Insert ad data into the database
    const adData = { ...formData, image_url: publicUrl };
    const { error } = await supabase.from('sponsored_ads').insert([adData]);

    setLoading(false);
    if (error) {
      alert('Error creating sponsored ad: ' + error.message);
    } else {
      alert('Sponsored ad created successfully!');
      navigate('/admin/sponsored');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Sponsored Ad</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ad Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-olxOrange file:text-white hover:file:bg-orange-600"
            accept="image/*"
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <img 
                src={imagePreview} 
                alt="Ad preview" 
                className="w-full h-auto max-h-48 object-contain rounded-lg border" 
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Call-to-Action Text (e.g., "Shop Now")</label>
          <input
            type="text"
            name="cta_text"
            value={formData.cta_text}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Call-to-Action URL</label>
          <input
            type="text"
            name="cta_action"
            value={formData.cta_action}
            onChange={handleChange}
            placeholder="https://example.com/product"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Placement</label>
          <select name="placement" value={formData.placement} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="footer">Footer</option>
            <option value="hero_carousel">Hero Carousel</option>
          </select>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label className="ml-2 block text-sm text-gray-900">Active</label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-olxOrange text-white py-2 rounded-md hover:bg-orange-600 font-bold transition disabled:bg-orange-300">
          {loading ? 'Creating...' : 'Create Sponsored Ad'}
        </button>
      </form>
    </div>
  );
};

export default CreateSponsoredAd;