import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Post from '../../components/post';
import { useValidateUser } from '../../hooks/validateUser';
import { getUserToken, removeUserToken } from '../../utils/localStorage';
import { getPostsUrl } from '../../constants';

import { HomeContent, LogoutButton } from './styles';

const Home = ({ history }) => {
  const [ loadingPosts, setLoadingPosts ] = useState(false);
  const [ posts, setPosts ] = useState([]);
  const { error, loading, userValid } = useValidateUser();

  useEffect(() => {
    if (userValid) {
      setLoadingPosts(true);
      fetch(getPostsUrl, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(({ data, message }) => {
          setLoadingPosts(false);
          setPosts(data);
        })
        .catch((error) => {
          console.warn(error)
        })
    }
  }, [userValid])

  if (error) {
    return <Redirect to="/login" />
  }

  if (loading || loadingPosts) {
    return (
      <h1>Loading ...</h1>
    )
  }

  return (
    <HomeContent>
      {
        posts.map(({ body, title }, index) => (
          <Post
            body={body}
            key={`post-${index}`}  
            title={title}
          />
        ))
      }
      <LogoutButton
        onClick={() => {
          removeUserToken(() => { history.push('/login') });
        }}
      >
        Logout
      </LogoutButton>
    </HomeContent>
  );
};

export default Home;
