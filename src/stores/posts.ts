import type { Post } from "@types";
import { atom } from "nanostores";

type PostsStore = Post[]
export const postsStore = atom<PostsStore>([])