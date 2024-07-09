const headers = new Headers();
headers.append("Content-Type", `application/json`);
async function resJson(payload: any, options?: { status: number }) {
  return new Response(JSON.stringify(payload), {status: options?.status ?? 200, headers})
}

export { resJson }