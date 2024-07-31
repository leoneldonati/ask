import type { UserLogged } from "@types";
import "./index.css";
import { useEffect, useState } from "react";

type Props = {
  action: "like" | "comment";
  payload: {
    to: string;
    from: string;
    likes?: string[];
    comments?: any;
    userLogged: UserLogged;
    ownerName: string;
  };
  length: number;
};
export default function ActionBtn(props: Props) {
  const { action, length: initialLength, payload } = props;

  const [styles, setStyles] = useState({});
  const [length, setLength] = useState(initialLength);
  const [title, setTitle] = useState("");
  // VERIFICAR SI EL USUARIO LOGEADO YA INTERACTUO CON EL POST
  const hasLiked =
    payload.likes?.find((id) => id === payload.userLogged?._id) !== undefined;
  const hasCommented =
    action === "comment" &&
    payload.comments?.find(
      (comment) => comment?.owner?._id === payload.userLogged?._id
    ) !== undefined;

  // MANEJAR ESTILOS DEL BOTON
  function handleStyles() {
    if (action === "comment" && hasCommented) return setStyles({});

    if (action === "like" && hasLiked)
      return setStyles({
        color: "var(--color_accent)",
        fill: "var(--color_accent)",
      });
  }

  // MANEJAR CAMBIO DE TITULO DEL BOTON
  function handleTitle() {
    if (action === "comment") {
      return hasCommented
        ? setTitle("You has commented this!")
        : setTitle(`Share with ${payload?.ownerName}!`);
    }

    if (action === "like") {
      return hasLiked ? setTitle("Liked!") : setTitle("Like this post!");
    }
  }

  async function sendLike() {
    setStyles({
      color: "var(--color_accent)",
      fill: "var(--color_accent)",
    });
    setTitle("Liked!");
    try {
      const res = await fetch(
        `http://localhost:4321/api/post-actions?type=${action}&from=${payload?.from}&to=${payload?.to}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) return;

      const data = await res.json();

      const hasLiked = data?.post?.likes?.find((id) => payload?.from === id);

      if (!hasLiked) {
        setTitle("Like this post!");
        setLength(length - 1);
        return setStyles({ fill: "none" });
      }
      setLength(length + 1)
    } catch (e) {}
  }

  useEffect(() => {
    handleStyles();
    handleTitle();
  }, []);
  return (
    <>
      {action === "comment" ? (
        <a
          href={`/post/comment?from=${payload.userLogged?._id}&to=${payload?.to}`}
          className="action-btn"
          style={styles}
          title={title}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 10h10" />
            <path d="M9 14h5" />
            <path d="M12.4 3a5.34 5.34 0 0 1 4.906 3.239a5.333 5.333 0 0 1 -1.195 10.6a4.26 4.26 0 0 1 -5.28 1.863l-3.831 2.298v-3.134a2.668 2.668 0 0 1 -1.795 -3.773a4.8 4.8 0 0 1 2.908 -8.933a5.33 5.33 0 0 1 4.287 -2.16" />
          </svg>

          <span className="likes">{length}</span>
        </a>
      ) : (
        <button
          className="action-btn"
          style={styles}
          title={title}
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
            style={{ fill: !hasLiked ? "none" : "inherit"}}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
          </svg>
          <span className="likes">{length}</span>
        </button>
      )}
    </>
  );
}
