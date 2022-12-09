import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createTodo } from "../../redux/actions/actionCreator";
import { upLoadFile } from "../../helpers/upLoadFile";
import useAppDispatch from "../../hooks/useAppDispatch";
import TodoModalContent from "./TodoModalContent";

const AddTodoModal = ({ open, setOpen, projectId }) => {
  const [priority, setPriority] = useState("Normal");
  const [finishDate, setFinishDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [upLoad, setUpLoad] = useState(null);
  const [uploadImg, setUploadImg] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    file && upLoadFile(file, setUpLoad, setUploadImg);
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
          status: "Queue",
          projectId: projectId,
          completed: false,
          todoId: Math.random().toString(36).substr(2, 9),
          type: "todo",
          comments: [],
          subTodos: [],
          files: [
            {
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              imgUrl: uploadImg,
            },
          ],
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
      <TodoModalContent
        props={{
          open,
          handleClose,
          titleText: "Add Todo",
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
          buttonText: "Add",
          type: "AddTodo",
        }}
      />
    </div>
  );
};

export default AddTodoModal;