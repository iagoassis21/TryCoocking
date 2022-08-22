import PropTypes from 'prop-types';
import React from 'react';
import Context from './Context';

function Provider({ children }) {
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Provider;
