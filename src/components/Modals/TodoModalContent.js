import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import MySelect from "../Select/Select";
import MyDatePicker from "../DatePickers/DatePicker";
import AddFileButton from "../AddFileButton/AddFileButton";
import emptyPhoto from "../../assets/emptyphoto.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "10px",
  borderRadius: "10px",
};

const TodoModalContent = ({ props }) => {
  const {
    open,
    handleClose,
    titleText,
    handleSubmit,
    title,
    setTitle,
    description,
    setDescription,
    number,
    setNumber,
    priority,
    setPriority,
    finishDate,
    setFinishDate,
    setFile,
    uploadImg,
    upLoad,
    buttonText,
    type,
  } = props;

  return (
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
              label="Enter task title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="comment_form_textarea"
              placeholder="Enter todo description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              type="number"
              id="outlined-basic"
              label="No - 123"
              variant="outlined"
              fullWidth
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <MySelect priority={priority} setPriority={setPriority} />
            <MyDatePicker
              finishDate={finishDate}
              setFinishDate={setFinishDate}
            />
            {type === "AddTodo" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "20px" }}>
                  <AddFileButton setFile={setFile} />
                </Box>
                <Box>
                  <img
                    alt="img"
                    src={uploadImg || emptyPhoto}
                    width={45}
                    height={45}
                  />
                </Box>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                disabled={upLoad !== null && upLoad < 100}
                type="submit"
                className={`btn_content btn_margin ${
                  upLoad !== null && upLoad < 100 ? "btn_disabled" : null
                }`}
              >
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
  );
};

export default TodoModalContent;
