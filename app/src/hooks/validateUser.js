import { useEffect, useState } from 'react';

import { validateUserByToken } from '../constants';
import { getUserToken } from '../utils/localStorage';

export const useValidateUser = () => {
  const [error, setError] = useState(false);
  const [userValid, setUserValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    const token = getUserToken()

    if (token) {
      fetch(validateUserByToken, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(({ data }) => {
          setUserValid(data ? data.userValid : false);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        })
    } else {
      setLoading(false);
      setError(true);
    }
  }, [])

  return {
    error,
    loading,
    userValid
  }
}
