import "./index.css";
import { useEffect, useState } from "react";
import ApiFunctions from "@services/api";

interface Props {
  origin: string;
}
export default function SeeMoreBtn(props: Props) {
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const [newPostsLength, setNewPostsLength] = useState(0);
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  useEffect(() => {
    const id = setInterval(() => {
      ApiFunctions(props.origin)
        .checkNewPosts()
        .then(({ newPosts }) => {
          if (newPosts === 0) {
            return setHasNewPosts(false);
          }
          setHasNewPosts(true);
          setNewPostsLength(newPosts);
        });
    }, FIFTEEN_MINUTES);

    return () => clearInterval(id);
  }, []);
  return (
    <form method="post">
      <button
        type="submit"
        className="home__btn--more"
        title="See more posts!"
        style={{
          opacity: hasNewPosts ? 1 : 0,
          transform: `translateY(${hasNewPosts ? 0 : -20}%)`,
          pointerEvents: hasNewPosts ? 'auto' : 'none'
        }}
      >
        <strong>{newPostsLength}</strong> new post
        {newPostsLength < 2 ? "" : "s"} added!
      </button>
    </form>
  );
}
