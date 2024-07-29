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
  children;
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
        color: "#fff",
        background:
          "linear-gradient(to top, var(--color_accent), var(--color_accent_light))",
        boxShadow: "0 5px 2px var(--color_accent_light)",
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
      const newLength = Number(data?.post?.likes?.length);

      if (hasLiked) {
        setStyles({
          color: "#fff",
          background:
            "linear-gradient(to top, var(--color_accent), var(--color_accent_light))",
          boxShadow: "0 5px 2px var(--color_accent_light)",
        });
        setTitle("Liked!");
        return setLength(newLength);
      }
      setTitle("Like this post!");
      setLength(newLength);
      setStyles({});
    } catch (e) {}
  }

  useEffect(() => {
    handleStyles();
    handleTitle();

    console.log(props)
  }, []);
  return (
    <>
      {action === "comment" ? (
        <a
          href={`/post/comment?from=${payload.userLogged?._id}&to=${payload?.to}`}
          className="action-btn"
          style={styles}
          title={title}
          onClick={async () => await sendLike()}
        >
          {props.children}
          <span className="likes">{length}</span>
        </a>
      ) : (
        <button
          className="action-btn"
          style={styles}
          title={title}
          onClick={async () => await sendLike()}
        >
          {props.children}
          <span className="likes">{length}</span>
        </button>
      )}
    </>
  );
}
