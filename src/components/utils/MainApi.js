const BASE_AUTH_URL = "http://api.diploma.dev.nomoredomains.rocks";
// http://localhost:3001
// https://auth.nomoreparties.co
// http://api.diploma.dev.nomoredomains.rocks


function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };

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
  return makeRequest("/signup", "POST", { password, email, name });
}

export function login({ password, email }) {
  return makeRequest("/signin", "POST", { password, email });
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

export function creatCardMovies({country, director, duration,
  year, description, image, trailerLink, thumbnail, movieId,
  nameRU, nameEN
}) {
  return makeRequest("/movies", "POST", {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN
  });
}

export function cardDel(id) {
  return makeRequest(`/movies/${id}`, "DELETE");
}