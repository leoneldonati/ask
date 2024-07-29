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
        hidden
        className="sign__label--avatar selected-avatar"
        loading="lazy"
      />
    </label>
  );
}
