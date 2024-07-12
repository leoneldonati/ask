const headers = new Headers();
headers.append("Content-Type", `application/json`);
const append = (key, value) => headers.append(key, value);
function resJson(payload: any, options?: { status: number }) {

  return new Response(JSON.stringify(payload), {
    status: options?.status ?? 200,
    headers,
  });
}

export { resJson, append };
