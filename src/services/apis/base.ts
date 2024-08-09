/**
 * Returns a promise of returned data from the backend
 *
 * @returns {Promise<ResponseType[]>}
 */
export async function getData(uri) {
  const res = await fetch(`${process.env.BACKEND_URL}${uri}`);
  const data = await res.json();
  return data;
}

/**
 * Posts data to the backend
 *
 * @returns {Promise<ResponseType[]>}
 */
export async function postData(uri, body) {
  const res = await fetch(`${process.env.BACKEND_URL}${uri}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}
