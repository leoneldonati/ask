import { useState, type ChangeEvent } from "react";
import "./index.css";
import Carrousel from "../carrousel";

export default function ImageSelector() {
  const [selectedFiles, setSelectedFiles] = useState<string[] | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filesArray = Object.values(event.target?.files);

    const paths = filesArray.map((file) => URL.createObjectURL(file));

    setSelectedFiles(paths);
  };

  return (
    <label htmlFor="images" className="images">
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

      <div
        className="images-wrapper"
        style={{ maxWidth: `${selectedFiles?.length * 100}%` }}
      >
        {selectedFiles && <Carrousel imagesPaths={selectedFiles} />}
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
          style={{ opacity: !selectedFiles ? 1 : 0 }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>

        <button
          type="button"
          className="delete"
          style={{
            opacity: selectedFiles ? 1 : 0,
            pointerEvents: selectedFiles ? "auto" : "none",
          }}
          onClick={() => setSelectedFiles(null)}
          title="Delete files"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-trash"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
            <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
          </svg>
        </button>
      </div>
    </label>
  );
}
