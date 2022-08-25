import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

export default function Header({ title, icons }) {
  const [enableSearch, setEnableSearch] = useState(false);
  const history = useHistory();
  const { searchValue, setSearchValue } = useContext(Context);

  const createProfileIcon = () => (
    <button type="button" onClick={ () => history.push('/profile') }>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
    </button>
  );
  const createSearchIcon = () => (
    <button type="button" onClick={ () => setEnableSearch((prev) => !prev) }>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="profile-icon"
      />
    </button>);

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      {
        icons.profile && createProfileIcon()
      }
      {
        icons.search && createSearchIcon()
      }
      {
        enableSearch
        && <input
          data-testid="search-input"
          type="text"
          onChange={ (e) => setSearchValue(e.target.value) }
          value={ searchValue }
        />
      }
      <SearchBar />
    </header>
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
