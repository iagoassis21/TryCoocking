import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, icons }) {
  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      {
        icons.profile
      && <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
      }
      {
        icons.search
      && <img data-testid="search-top-btn" src={ searchIcon } alt="profile-icon" />
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.shape({
    profile: PropTypes.bool,
    search: PropTypes.bool,
  }),
};

Header.defaultProps = {
  icons: { profile: true, search: true },
};
