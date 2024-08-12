import "./index.css";
import type { Post, UserLogged } from "@types";

interface Props {
  posts: Post[];
  user: UserLogged;
}
export default function StaticsHeader(props: Props) {
 
  return (
    <header className="profile__container--header">
      <button>
        Posts: <strong>{props.posts?.length}</strong>
      </button>

      <button>
        Followers: <strong>{props.user?.followers.length}</strong>
      </button>

      <button>
        Followed: <strong>{props.user?.followed.length}</strong>
      </button>
    </header>
  );
}
