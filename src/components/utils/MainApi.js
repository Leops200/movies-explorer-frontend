const BASE_AUTH_URL = "https://api.l-energy.dev.nomoredomains.xyz";
// http://localhost:3000
// https://auth.nomoreparties.co
// http://api.diploma.dev.nomoredomains.rocks
// https://api.l-energy.dev.nomoredomains.xyz


function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_AUTH_URL}${url}`, config).then((res) => {
    const rez = res.json();
    return res.ok
      ? rez
      : rez.then ((err) => Promise.reject(`${err.message}`));
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

export function getUserInfo() {
  return makeRequest(`/users/me`, "GET");
}

export function addInfo({ email, name }) {
  return makeRequest("/users/me", "PATCH", { email, name });
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