interface UserLogged {
  _id: string;
  name: string;
  email: string;
  username: string;
  hash: string;
  bio: string;
  date: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  settings: object;
  location: object;
  avatar: Array<{ secureUrl: string, publicId: string }>;
  posts: Post[];
  followers: [];
  followed: []
}

interface Post {
  id: string;
  userId: string;
  content: string;
  images: any;
  createdAt: string;
  updatedAt: string;
}