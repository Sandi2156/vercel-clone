async function makeApiCall({
  method,
  url,
  body,
  headers = {},
}: {
  method: "POST" | "GET";
  url: string;
  body: object;
  headers?: object;
}) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return await response.json();
}

export default makeApiCall;
