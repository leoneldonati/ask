import "./index.css";
import { useEffect, useState } from "react";

interface Props {
  origin: string;
  payload: {
    to: string;
    from: string;
  };
  length: number;
  liked: boolean;
}
export default function LikeBtn(props: Props) {
  const { origin, payload, liked: initialState, length: initialLength } = props;

  const [liked, setLiked] = useState(initialState);
  const [length, setLength] = useState(initialLength);
  const [errors, setErrors] = useState(null);
  const [styles, setStyles] = useState({
    color: liked ? "var(--color_accent)" : '',
    fill: liked ? "var(--color_accent)" : '',
  });

  const sendLike = async () => {
    if (!liked) {
      setStyles({
        color: "var(--color_accent)",
        fill: "var(--color_accent)",
      });
      setLiked(true);
      setLength(length + 1);
    }
    if (liked) {
      setStyles({
        color: '',
        fill: ''
      });
      setLiked(false);
      setLength(length - 1);
    }
    try {
      const res = await fetch(
        `${origin}/api/post-actions?type=like&from=${payload?.from}&to=${payload?.to}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        setStyles({color: '', fill: ''});
        return setErrors(await res.json());
      }
    } catch (e) {
      setErrors(e);
    }
  };

  useEffect(() => {
    if (errors !== null) {
    }
  }, [errors]);
  return (
    <button
      className="action-btn"
      style={{ ...styles }}
      onClick={async () => await sendLike()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ fill: !liked ? "none" : "inherit" }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </svg>
      <span className="likes">{length}</span>
    </button>
  );
}
