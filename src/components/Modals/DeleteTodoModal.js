import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import useAppDispatch from "../../hooks/useAppDispatch";
import { deleteTodo } from "../../redux/actions/actionCreator";

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

const DeleteModal = ({ open, setOpen, deleteItem, type }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(deleteItem?.id));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <h3>Delete</h3>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Delete{" "}
              <Typography
                sx={{ color: "#707070", fontStyle: "italic", margin: "0 10px" }}
              >
                {deleteItem?.title}
              </Typography>
              {""}
              {type}?
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn_content btn_margin btn_delete"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button className="btn_content" onClick={handleClose}>
                Cancel
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
