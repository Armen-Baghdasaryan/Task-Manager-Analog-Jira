import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "10px",
  borderRadius: "10px",
};

const ProjectModalContent = ({ props }) => {
  const {
    titleText,
    open,
    handleClose,
    handleSubmit,
    name,
    setName,
    description,
    setDescription,
    buttonText,
  } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <h3>{titleText}</h3>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Enter project name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="comment_form_textarea"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn_content btn_margin">
                  {buttonText}
                </button>
                <button className="btn_content" onClick={handleClose}>
                  Cancel
                </button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectModalContent;
