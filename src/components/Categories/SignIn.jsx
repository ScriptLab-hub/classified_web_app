import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../services/authService';

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await signIn({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
      onSignIn(data.session);
      navigate('/dashboard');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded-md">{error}</p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-olxOrange"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-olxOrange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-orange-300">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-olxOrange hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;