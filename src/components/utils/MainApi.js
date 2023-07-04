const BASE_AUTH_URL = "http://localhost:3001";
// http://localhost:3001
// https://auth.nomoreparties.co
// http://api.diploma.dev.nomoredomains.rocks
// https://api.mymesto15front.nomoredomains.monster

function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };
  /* исключаем проверку токена 
  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  */
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_AUTH_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

export function registration({ password, email, name }) {
  return makeRequest("/signup", "POST", { password, email, name }, true);
}

export function login({ password, email }) {
  return makeRequest("/signin", "POST", { password, email }, true);
}

export function logout() {
  return makeRequest("/signout", "POST");
}

export function checkToken() {
  return makeRequest("/users/me", "GET");
}

export function getUserInfo() {
  return makeRequest(`/users/me`, "GET");
}

export function addInfo({ name, email }) {
  return makeRequest("/users/me", "PATCH", { name, email });
}

// ==== cards ==============

export function getInitCards() {
  return makeRequest(`/movies`, "GET");
}
/*
export function addNewCard({ name, link }) {
  return makeRequest("/cards", "POST", { name, link });
}

export function changeLikeStatus(id, isLiked) {
  if (isLiked) {
    return makeRequest(`/cards/${id}/likes`, "PUT");
  } else {
    return makeRequest(`/cards/${id}/likes`, "DELETE");
  }
};


export function deleteCard(id) {
  return makeRequest(`/cards/${id}`, "DELETE");
}*/