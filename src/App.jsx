import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import CategoryPage from './components/Categories/CategoryPage';
import UserDashboard from './components/Auth/UserDashboard';
import PostAd from './components/PostAd/PostAd';
import AdDetail from './components/AdDetail/AdDetail';
import SignIn from './components/Auth/UserSignin';
import SignUp from './components/Auth/UserSignup';
import AdminPanel from './components/Admin/AdminPanel';
import HomePage from './components/HomePage/HomePage';
import UserManagement from './components/Admin/UserManagement';
import SearchPage from './SearchPage';
import AdsManagement from './AdsManagement';
import SponsoredAds from './components/Admin/SponsoredAds';
import CreateSponsoredAd from './components/Admin/CreateSponsoredAd';
import { supabase } from './services/supabase';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // All state and logic remains here
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role, username, profile_image_url')
          .eq('id', user.id)
          .single();
        
        if (error) console.error('Error fetching profile:', error);
        else setProfile(data);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogin = (sessionData) => {
    setSession(sessionData);
    setUser(sessionData?.user ?? null);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="App">
      {!isAdminRoute && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route 
          path="/dashboard" 
          element={profile?.role === 'user' ? <UserDashboard user={user} /> : <div className="pt-24 text-center"><h1>Access Denied</h1><p>Only regular users can access this page.</p></div>} 
        />
        <Route path="/post-ad" element={<PostAd user={user} />} />
        <Route path="/ads/:ad_id" element={<AdDetail />} />
        <Route path="/signin" element={<SignIn onSignIn={handleLogin} />} />          
        <Route 
          path="/admin" 
          element={profile?.role === 'admin' ? <AdminPanel profile={profile} /> : <div className="pt-24 text-center"><h1>Access Denied</h1></div>}
        >
          <Route index element={<HomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="ads" element={<AdsManagement />} />
          <Route path="sponsored" element={<SponsoredAds />} />
          <Route path="sponsored/new" element={<CreateSponsoredAd />} />
        </Route>
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;