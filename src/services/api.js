const API_ROOT = (path)=> `https://localhost:3000${path}`

const token = () => localStorage.getItem("token");

export const headers = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token()
    }; 
};

const login = data => { 
    return fetch(API_ROOT('/login'), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data)
    }).then(res => res.json());
};

const signup = (data) => {
    return fetch(API_ROOT('/users'), {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(data)
      }).then(res => res.json());
}


const getCurrentUser = () => {
    // console.log("getting current user", headers);
  
    return fetch(API_ROOT('/current_user'), {
        headers: headers()
    }).then(res => {
        // console.log(res)
        return res.json();
    })
};











export const api = {
    auth: {
      login,
      signup,
      getCurrentUser
    }
}