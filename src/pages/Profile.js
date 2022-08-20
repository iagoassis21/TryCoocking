import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
// import Footer from '../components/Footer';

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
    <div>
      <Header
        title="Profile"
        profileIcon={ profileIcon }
      />
      <section>
        <p data-testid="profile-email">{emailLocal}</p>
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
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
          >
            Logout
          </button>
        </Link>

      </section>
      <Footer />
    </div>
  );
}

export default Profile;
