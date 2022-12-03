import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import useAppDispatch from "../../hooks/useAppDispatch";
import { editProject } from "../../redux/actions/actionCreator";

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

const EditProjectModal = ({ open, setOpen, project }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setName(project?.name || "");
    setDescription(project?.description || "");
  }, [project, project?.name, project?.description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      dispatch(
        editProject({
          ...project,
          name,
          description,
          editedAt: new Date(),
        })
      );

      setName(project?.name);
      setDescription(project?.description);
      setOpen(false);
    } else {
      toast("Name is a required field!");
    }
  };

  const handleClose = () => {
    setName(project?.name);
    setDescription(project?.description);
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
            <h3>Edit Project</h3>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Edit project name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Edit project description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn_content btn_margin">
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

export default EditProjectModal;
