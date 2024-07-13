import { createState } from "@libs/state-js";

type PostStores = Post[]
export const postStores = createState<PostStores>([])