import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  deleteProject,
  deleteTodo,
  ubdateTodo,
} from "../../redux/actions/actionCreator";

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

const DeleteModal = ({ props }) => {
  const {
    open,
    setOpen,
    deleteItem,
    deleteText,
    deleteType,
    type,
    isUbdate,
    setIsUbdate,
    itemId,
  } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (type === "DelProject") {
      dispatch(deleteProject(deleteItem?.id));
      setOpen(false);
    }

    if (type === "DelTodo") {
      dispatch(deleteTodo(deleteItem?.id));
      setOpen(false);
    }

    if (type === "DelComment" || type === "DelSubtask") {
      dispatch(
        ubdateTodo({
          ...deleteItem,
          comments: [
            ...deleteItem?.comments?.filter((item) => item?.id !== itemId),
          ],
        })
      );
      setOpen(false);
      setTimeout(() => {
        setIsUbdate(!isUbdate);
      }, 1000);
    }

    if (type === "DelSubtask") {
      dispatch(
        ubdateTodo({
          ...deleteItem,
          subTodos: [
            ...deleteItem?.subTodos?.filter((item) => item?.id !== itemId),
          ],
        })
      );
      setTimeout(() => {
        setIsUbdate(!isUbdate);
        toast("Task was deleted");
      }, 1000);
    }

    if (type === "DelFile") {
      dispatch(
        ubdateTodo({
          ...deleteItem,
          files: [...deleteItem?.files?.filter((item) => item?.id !== itemId)],
        })
      );
      setOpen(false);
      setTimeout(() => {
        setIsUbdate(!isUbdate);
      }, 1000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
            {deleteText !== null && (
              <>
                <Typography
                  sx={{
                    color: "#707070",
                    fontStyle: "italic",
                    margin: "0 10px",
                  }}
                >
                  {deleteText}
                </Typography>{" "}
              </>
            )}
            {deleteType}?
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
  );
};

export default DeleteModal;
