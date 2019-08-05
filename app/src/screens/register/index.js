import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

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
import { registerUrl } from '../../constants';

const Register = ({
  history
}) => {
  const [loadingForm, setLoadingForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    loading,
    userValid
  } = useValidateUser();

  const registerUser = () => {
    setLoadingForm(true);
    setErrorMessage('');
    fetch(registerUrl, {
      body: JSON.stringify({
        email,
        name,
        password,
        userName: username
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
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          value={name}
        />
        <LoginInput
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          value={username}
        />
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
          disabled={!email || !password || !name || !username || loadingForm}
          onClick={registerUser}
        >
          Register
        </LoginButton>
        { loadingForm && <Spinner /> }
        <LoginButton
          onClick={() => history.push('/login')}
        >
          To login
        </LoginButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </LoginContent>
    </LoginContainer>
  )
};

export default Register;
