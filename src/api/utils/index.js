export function handleResponse(response) {
  if (response.ok) return response.json();
  throw response;
}
