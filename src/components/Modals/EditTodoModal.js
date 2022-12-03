import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAppDispatch from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import MySelect from "../Select/Select";
import MyDatePicker from "../DatePickers/DatePicker";
import emptyPhoto from "../../assets/emptyphoto.png";
import { editTodos } from "../../redux/actions/actionCreator";

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

const EditTodoModal = ({ open, setOpen, editItem }) => {
  const [priority, setPriority] = useState("Normal");
  const [finishDate, setFinishDate] = useState("");
  const [file, setFile] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [upLoad, setUpLoad] = useState(null);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPriority(editItem?.priority);
    setUploadImg(editItem?.imgUrl);
    setNumber(editItem?.number);
    setTitle(editItem?.title);
    setDescription(editItem?.description);
  }, [
    editItem?.priority,
    editItem?.finishDate,
    editItem?.imgUrl,
    editItem?.number,
    editItem?.title,
    editItem?.description,
  ]);

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

    if (number && title && description) {
      dispatch(
        editTodos({
          ...editItem,
          number,
          title,
          description,
          ubdatedAt: new Date(),
          finishDate: finishDate.toString() || editItem?.finishDate,
          priority,
          imgUrl: uploadImg,
        })
      );

      setNumber(editItem?.number);
      setTitle(editItem?.title);
      setDescription(editItem?.description);
      setFinishDate("");
      setPriority(editItem?.priority);
      setFile("");
      setUploadImg(editItem?.imgUrl);
      setOpen(false);
    } else {
      toast("All fields is required!");
    }
  };

  const handleClose = () => {
    setNumber(editItem?.number);
    setTitle(editItem?.title);
    setDescription(editItem?.description);
    setFinishDate("");
    setPriority(editItem?.priority);
    setFile("");
    setUploadImg(editItem?.imgUrl);
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
              <TextField
                id="outlined-basic"
                label="Enter task description"
                variant="outlined"
                fullWidth
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
                  type={"file"}
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
