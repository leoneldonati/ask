import { useState } from "react";
import "./index.css";

export default function Carrousel(props: { imagesPaths: string[] }) {
  const [position, setPosition] = useState(0);
  const { length } = props.imagesPaths;
  const finalCarrousel = Math.abs(position) === (length - 1) * 100;
  const handleLeftBtn = () => {
    if (position === 0) return;
    setPosition(position + 100);
  };
  const handleRightBtn = () => {
    if (finalCarrousel) return;
    setPosition(position - 100);
  };
  return (
    <picture>
      <span className="container--length">
        <strong>
          {(Math.abs(position) / 100) + 1}/{props.imagesPaths.length}
        </strong>
      </span>
      <div
        id="container"
        style={{
          maxWidth: `${props.imagesPaths.length * 100}%`,
          transform: `translateX(${position}%)`,
        }}
      >
        {props.imagesPaths.map((path, index) => (
          <img
            src={path}
            alt={`Post image ${index}.`}
            loading="lazy"
            key={index}
          />
        ))}
      </div>
      <button
        onClick={handleRightBtn}
        style={{
          opacity: finalCarrousel && 0,
          pointerEvents: finalCarrousel ? "none" : "auto",
        }}
        type="button"
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </svg>
      </button>
      <button
        onClick={handleLeftBtn}
        style={{
          opacity: position === 0 && 0,
          pointerEvents: position === 0 ? "none" : "auto",
        }}
        type="button"
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </button>
    </picture>
  );
}
