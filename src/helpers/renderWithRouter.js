import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({ ...render(<Router history={ history }>{component}</Router>), history });
};

export default renderWithRouter;
