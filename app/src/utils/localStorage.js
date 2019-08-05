export const setUserToken = (token, callback = () => {}) => {
  window.localStorage.setItem('posts_app_token', token);
  callback();
}

export const removeUserToken = (callback = () => {}) => {
  window.localStorage.removeItem('posts_app_token');
  callback();
}

export const getUserToken = () => 
  window.localStorage.getItem('posts_app_token');
