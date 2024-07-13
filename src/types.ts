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

interface PostComment {
  owner: UserLogged;
  content: string;
  _id: string;
}
interface Post {
  _id: string;
  userId: string;
  userOwner: UserLogged;
  content: string;
  images: any;
  createdAt: string;
  updatedAt: string;
  likes: [];
  comments: PostComment[]
}