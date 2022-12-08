import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import TodoModalContent from "./TodoModalContent";

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
      <TodoModalContent
        props={{
          open,
          handleClose,
          titleText: "Edit Todo",
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
          buttonText: "Save",
          type: "EditTodo",
        }}
      />
    </div>
  );
};

export default EditTodoModal;
