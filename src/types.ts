interface UserLogged {
  id: string;
  name: string;
  email: string;
  username: string;
  hash: string;
  bio: string;
  DATE: Date;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  settings: string;
  location: null;
  avatar: string;
  posts: Post[];
}

interface Post {
  id: string;
  userId: string;
  content: string;
  images: any;
  createdAt: string;
  updatedAt: string;
}