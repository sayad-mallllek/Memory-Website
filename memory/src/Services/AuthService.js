const tokenKey = "token";

const setToken = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

const getToken = () => {
  return localStorage.getItem(tokenKey);
};

const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

export default {
  setToken,
  getToken,
  removeToken,
};
