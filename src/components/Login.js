import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function Login(props) {
  const [isValid, setValid] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const {
    setPageType,
  } = useContext(Context);

  const validateEmail = () => {
    const regexEmail = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
    return !!(email.match(regexEmail));
  };

  const validatePassword = () => {
    const passwordLength = 6;
    return pass.length >= passwordLength;
  };

  const changeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
    setValid(!(validateEmail() && validatePassword()));
  };

  const changePass = ({ target }) => {
    const { value } = target;
    setPass(value);
    setValid(!(validateEmail() && validatePassword()));
  };

  const onClickLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setPageType('foods');
    const { history } = props;
    history.push('/foods');
  };

  return (
    <>
      <h4>Login</h4>
      <form>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Insira o seu email..."
          value={ email }
          onChange={ changeEmail }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Insira sua senha..."
          value={ pass }
          onChange={ changePass }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isValid }
          onClick={ onClickLogin }
        >
          Enter
        </button>
      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape([
  ]).isRequired,
};

export default Login;
