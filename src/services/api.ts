

function ApiFunctions (origin: string) {
  async function getPosts(q?: number) {
    try {
      const res = await fetch(`${origin}/api/get-post?q=${q ?? 15}`);
  
      return await res.json();
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
      const res = await fetch(
        `${origin}/api/get-user-posts?id=${id}`
      );
  
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
  return {
    getPosts,
    getUser,
    getUserPosts
  }
}
export default ApiFunctions;
