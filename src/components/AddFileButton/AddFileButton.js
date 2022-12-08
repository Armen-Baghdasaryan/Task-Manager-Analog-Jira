import React from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import "./AddFileButton.scss";

const AddFileButton = ({ setFile }) => {
  return (
    <div>
      <label className="input-file">
        <input
          type="file"
          if="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="input-file-btn">
          Add file{" "}
          <AttachmentIcon sx={{ marginLeft: "10px", color: "black" }} />
        </div>
      </label>
    </div>
  );
};

export default AddFileButton;
