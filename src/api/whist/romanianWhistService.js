const baseUrl = "http://localhost:3001/cards";

export function fetchCards() {
  return fetch(baseUrl).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
