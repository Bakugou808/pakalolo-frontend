const API_ROOT = (path) => `https://pakalolo-api.herokuapp.com${path}`;
// https://pakalolo-api.herokuapp.com
// http://localhost:3000

const token = () => localStorage.getItem("token");

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

const login = (data) => {
  return fetch(API_ROOT("/login"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const signup = (data) => {
  return fetch(API_ROOT("/users"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const getCurrentUser = () => {
  return fetch(API_ROOT("/current_user"), {
    headers: headers(),
  }).then((res) => {
    return res.json();
  });
};

export const api = {
  auth: {
    login,
    signup,
    getCurrentUser,
  },
};
