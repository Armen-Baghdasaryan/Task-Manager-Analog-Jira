import React, { useState } from "react";
import { toast } from "react-toastify";
import useAppDispatch from "../../hooks/useAppDispatch";
import { createProject } from "../../redux/actions/actionCreator";
import ProjectModalContent from "./ProjectModalContent";

const AddProjectModal = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      dispatch(
        createProject({
          name,
          description,
          projectId: Math.random().toString(36).substr(2, 9),
          type: "project",
          createdAt: new Date().toISOString(),
        })
      );
      setName("");
      setDescription("");
      setOpen(false);
    } else {
      toast("Name is a required field!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <div>
      <ProjectModalContent
        props={{
          titleText: "Add Project",
          open,
          handleClose,
          handleSubmit,
          name,
          setName,
          description,
          setDescription,
          buttonText: "Add",
          type: "AddProject",
        }}
      />
    </div>
  );
};

export default AddProjectModal;