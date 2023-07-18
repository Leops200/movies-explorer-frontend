import { MOV_API_URL } from "../utils/constants"

function makeRequest(url, method) {
    const headers = { "Content-Type": "application/json" };
    const config = { method, headers };
    
    return fetch(`${MOV_API_URL}${url}`, config).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
  }

export function getMovies() {
    return makeRequest("/beatfilm-movies", "GET");
}