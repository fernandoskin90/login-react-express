import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  ErrorMessage,
  LoginButton,
  LoginContainer,
  LoginContent,
  LoginInput,
  Spinner
} from './styles';
import { setUserToken } from '../../utils/localStorage';
import { useValidateUser } from '../../hooks/validateUser';
import { loginUrl } from '../../constants';

const Login = ({
  history
}) => {
  const [loadingForm, setLoadingForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    loading,
    userValid
  } = useValidateUser();

  const loginUser = () => {
    setLoadingForm(true);
    setErrorMessage('');
    fetch(loginUrl, {
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then(({ data, message }) => {
        setLoadingForm(false);
        if (data && data.token) {
          setUserToken(
            data.token,
            () => history.push('/')
          );
        }
        if (!data && message) {
          setErrorMessage(message);
        }
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  if (loading) {
    return (
      <div>Loading ...</div>
    );
  }

  if (userValid) {
    return <Redirect to='/' />;
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginInput
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <LoginInput
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <LoginButton
          disabled={!email || !password || loadingForm}
          onClick={loginUser}
        >
          Login
        </LoginButton>
        { loadingForm && <Spinner /> }
        <LoginButton
          onClick={() => history.push('/register')}
        >
          To register
        </LoginButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </LoginContent>
    </LoginContainer>
  )
};

export default Login;
