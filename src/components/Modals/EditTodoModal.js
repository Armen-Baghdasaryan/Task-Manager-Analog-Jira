import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import MySelect from "../Select/Select";
import MyDatePicker from "../DatePickers/DatePicker";

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

const EditTodoModal = ({ open, setOpen, editItem, isUbdate, setIsUbdate }) => {
  const [priority, setPriority] = useState("Normal");
  const [finishDate, setFinishDate] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPriority(editItem?.priority);
    setFinishDate(new Date(editItem?.finishDate));
    setNumber(editItem?.number);
    setTitle(editItem?.title);
    setDescription(editItem?.description);
  }, [
    editItem?.priority,
    editItem?.finishDate,
    editItem?.number,
    editItem?.title,
    editItem?.description,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number && title && description && finishDate) {
      dispatch(
        ubdateTodo({
          ...editItem,
          number,
          title,
          description,
          ubdatedAt: new Date().toISOString(),
          finishDate: new Date(finishDate).toISOString(),
          priority,
        })
      );

      setNumber(editItem?.number);
      setTitle(editItem?.title);
      setDescription(editItem?.description);
      setFinishDate(new Date(editItem?.finishDate));
      setPriority(editItem?.priority);
      setIsUbdate(!isUbdate);
      setOpen(false);
    } else {
      toast("All fields is required!");
    }
  };

  const handleClose = () => {
    setNumber(editItem?.number);
    setTitle(editItem?.title);
    setDescription(editItem?.description);
    setFinishDate(new Date(editItem?.finishDate));
    setPriority(editItem?.priority);
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
            <h3>Edit Todo</h3>
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
                placeholder="Edit todo description"
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className={`btn_content btn_margin`}>
                  Save
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

export default EditTodoModal;
