function ApiFunctions(origin: string) {
  async function getPosts(q?: number) {
    try {
      const res = await fetch(`${origin}/api/get-post?q=${q ?? 15}`);

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function getPost(id: string) {
    try {
      const res = await fetch(`${origin}/api/get-post-by?id=${id}`);

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getUser(id: string) {
    try {
      const res = await fetch(`${origin}/api/get-user?id=${id}`);

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserPosts(id: string) {
    try {
      const res = await fetch(`${origin}/api/get-user-posts?id=${id}`);

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function addPost(paylaod: FormData) {
    try {
      const res = await fetch(`${origin}/api/add-post`, {
        method: "POST",
        body: paylaod,
      });

      if (res.ok)
        return {
          ok: true,
          data: (await res.json())?.savedPost,
        };

      return {
        ok: false,
        error: await res.json(),
      };
    } catch (err) {
      return {
        ok: false,
        error: err,
      };
    }
  }

  async function checkNewPosts() {
    const res = await fetch(`${origin}/api/check-new-posts`)

    if (!res.ok) return false;

    return await res.json()
  }
  return {
    getPost,
    getPosts,
    getUser,
    getUserPosts,
    addPost,
    checkNewPosts
  };
}
export default ApiFunctions;
