import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const [emailLocal, setEmailLocal] = useState('');

  const getEmailLocalStorage = () => {
    const emailCapture = localStorage.getItem('user');
    if (emailCapture !== null) {
      const emailGet = JSON.parse(emailCapture);
      setEmailLocal(emailGet.email);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);

  return (
    <>
      <Header title="Profile" icons={ { profile: true, search: false } } />
      <section className="profile-container">
        <p data-testid="profile-email">{emailLocal}</p>
        <div className="recipes-buttons">
          <Link to="/done-recipes">
            <button type="button" data-testid="profile-done-btn">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button type="button" data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
          </Link>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
            className="logout-button"
          >
            Logout
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
