import { useEffect, useState } from "react";
import { IconLoader } from "@tabler/icons-react";
import "./index.css";

interface Props {
  child1: string;
  child2: string;
}
export default function SubmitBtn(props: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <button type="submit" onClick={handleClick} className={`login__button ${loading ? 'disabled' : ''}`}>
      {!loading ? props.child1 : props.child2} <IconLoader className={!loading ? 'loading' : ''} />
    </button>
  );
}
