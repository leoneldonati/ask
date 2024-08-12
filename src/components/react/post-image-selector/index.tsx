import { IconImageInPicture } from "@tabler/icons-react";
import "./index.css";
import { useState } from "react";

export default function ImageSelector() {
  const [imagesLength, setImagesLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesLength = e.target.files.length;
    setImagesLength(filesLength);
  };
  return (
    <label htmlFor="images" className="images" title="Select images">
      <span
        className="images__counter"
        style={{
          opacity: imagesLength === 0 ? 0 : 1,
        }}
      >
        {imagesLength}
      </span>
      <input
        type="file"
        name="images"
        id="images"
        accept="images/*"
        multiple
        hidden
        max="4"
        onChange={handleChange}
      />

      <IconImageInPicture />
    </label>
  );
}
