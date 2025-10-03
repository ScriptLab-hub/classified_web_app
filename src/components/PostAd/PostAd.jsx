import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAd, uploadAdImage } from '../../services/adService';
import { supabase } from '../../services/supabase';

const PostAd = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    location_id: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories and locations directly from Supabase
      const fetchCategories = supabase.from('categories').select('*');
      const fetchLocations = supabase.from('locations').select('*');

      const [catRes, locRes] = await Promise.all([
        fetchCategories,
        fetchLocations
      ]);

      if (catRes.error) console.error('Error fetching categories:', catRes.error);
      else setCategories(catRes.data);

      if (locRes.error) console.error('Error fetching locations:', locRes.error);
      else setLocations(locRes.data);
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Please Log In
          </h2>
          <p className="text-center text-gray-600 text-lg">
            You need to be logged in to post an ad.{' '}
            <Link to="/signin" className="text-olxOrange hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    );
  }

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

    const { publicUrl, error: uploadError } = await uploadAdImage(user.id, imageFile);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setLoading(false);
      return;
    }

    const { error: createError } = await createAd({ ...formData, user_id: user.id, image_url: publicUrl });

    setLoading(false);
    if (createError) {
      alert('Error creating ad: ' + createError.message);
    } else {
      alert('Ad submitted successfully!');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post a New Ad
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">Price (PKR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category_id">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location_id">Location</label>
            <select
              name="location_id"
              value={formData.location_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.location_id} value={location.location_id}>
                  {location.city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">Ad Image</label>
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
                <img src={imagePreview} alt="Ad preview" className="w-full h-auto max-h-64 object-contain rounded-lg border" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-olxOrange hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition duration-300 disabled:bg-orange-300"
          >
            {loading ? 'Submitting...' : 'Submit Ad'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;