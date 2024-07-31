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
  return {
    getPost,
    getPosts,
    getUser,
    getUserPosts,
  };
}
export default ApiFunctions;
