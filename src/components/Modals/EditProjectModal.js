import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAppDispatch from "../../hooks/useAppDispatch";
import { editProject } from "../../redux/actions/actionCreator";
import ProjectModalContent from "./ProjectModalContent";

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
          editedAt: new Date().toISOString(),
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
      <ProjectModalContent
        props={{
          titleText: "Edit Project",
          open,
          handleClose,
          handleSubmit,
          name,
          setName,
          description,
          setDescription,
          buttonText: "Save",
          type: "EditProject",
        }}
      />
    </div>
  );
};

export default EditProjectModal;
