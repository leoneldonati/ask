import { useEffect, useState } from "react";
import "./index.css";

interface Props {
  error: {
    message: string;
  };
}
export default function ErrorCard(props: Props) {
  const [styles, setStyles] = useState({})
  const { error } = props;
  const defaultMessage = "Please retry o re-chargue tab.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setStyles({
        transform: `translateX(-20%)`,
        opacity: 0
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <article className="error" id="card" style={styles}>
      <div>
        <h2 className="error__h2">Oh, an error ocurred!</h2>

        <p className="error__p">{error.message ?? defaultMessage}</p>
      </div>
    </article>
  );
}
