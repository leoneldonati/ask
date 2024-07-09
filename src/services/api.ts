async function getPosts(q?: number, options?: { headers: Headers }) {
  try {
    const res = await fetch(`http://localhost:4321/api/get-post?q=${q ?? 15}`, {
      headers: options?.headers,
    });

    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

async function getUser(id: string, options?: { headers: Headers }) {
  try {
    const res = await fetch(`http://localhost:4321/api/get-user?id=${id}`, {
      headers: options?.headers,
    });

    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

async function getUserPosts(id: string) {
  try {
    const res = await fetch(
      `http://localhost:4321/api/get-user-posts?id=${id}`
    );

    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
export { getPosts, getUser, getUserPosts };
