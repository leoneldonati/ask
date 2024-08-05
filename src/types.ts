export interface UserLogged {
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
  location: {
    city: string;
    country_name: string;
  };
  avatar: Array<{ secureUrl: string; publicId: string }>;
  followers: string[];
  followed: string[];
}

export interface PostComment {
  owner: UserLogged;
  content: string;
  _id: string;
  createdAt: string;
}
export interface Post {
  _id: string;
  ownerId: string;
  content: string;
  images: any;
  createdAt: string | Date;
  updatedAt: string | Date;
  likes: [];
  comments: PostComment[];
}
