import { useState, type ChangeEvent } from "react";
import "./index.css";

export default function AvatarSelector() {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const src = URL.createObjectURL(e.target.files[0]);
    setSelectedAvatar(src);
  };

  return (
    <label
      htmlFor="avatar"
      className="sign__label--avatar"
      title="Take a picture."
    >
      <input
        onChange={handleInputChange}
        type="file"
        accept="image/*"
        id="avatar"
        name="avatar"
        hidden
      />

      <img
        src={selectedAvatar}
        hidden={selectedAvatar === ""}
        className="sign__label--avatar selected-avatar"
        loading="lazy"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: selectedAvatar === '' ? 'auto' : 'none' }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 5l0 14"></path>
        <path d="M5 12l14 0"></path>
      </svg>
    </label>
  );
}
