import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { createTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import MySelect from "../Select/Select";
import MyDatePicker from "../DatePickers/DatePicker";
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

const AddTodoModal = ({ open, setOpen, projectId }) => {
  const [priority, setPriority] = useState("Normal");
  const [finishDate, setFinishDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [upLoad, setUpLoad] = useState(null);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  // Upload image
  useEffect(() => {
    const upLoadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUpLoad(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadImg(downloadURL);
          });
        }
      );
    };
    file && upLoadFile();
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number && title && description && finishDate) {
      dispatch(
        createTodo({
          number,
          title,
          description,
          createdAt: new Date().toISOString(),
          finishDate: new Date(finishDate).toISOString(),
          priority,
          imgUrl: uploadImg,
          status: "Queue",
          projectId: projectId,
          completed: false,
          todoId: Math.random().toString(36).substr(2, 9),
          type: "todo",
          comments: [],
          subTodos: [],
        })
      );

      setNumber("");
      setTitle("");
      setDescription("");
      setFinishDate(new Date());
      setUploadImg("");
      setPriority("Normal");
      setFile("");
      setOpen(false);
    } else {
      toast("All fields is required!");
    }
  };

  const handleClose = () => {
    setNumber("");
    setTitle("");
    setDescription("");
    setFinishDate(new Date());
    setUploadImg("");
    setPriority("Normal");
    setFile("");
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
            <h3>Add Todo</h3>
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  sx={{ marginRight: "20px" }}
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <img
                  alt="img"
                  src={uploadImg || emptyPhoto}
                  width={55}
                  height={55}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  disabled={upLoad !== null && upLoad < 100}
                  type="submit"
                  className={`btn_content btn_margin ${
                    upLoad !== null && upLoad < 100 ? "btn_disabled" : null
                  }`}
                >
                  Add
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

export default AddTodoModal;
