import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../Modals/DeleteModal";
import "./FileContent.scss";

const FileContent = ({ file, currentTodo, isUbdate, setIsUbdate }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteHandler = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      <div className="files_container">
        {file?.imgUrl && (
          <div className="item_img_container">
            <div className="img_container">
              <a
                href={`${file?.imgUrl ? file?.imgUrl : "#"}`}
                target={`${file?.imgUrl && "blank"}`}
              >
                <img
                  alt="img"
                  className="todo_id_image"
                  src={file?.imgUrl}
                  srcSet={`${file?.imgUrl} 580w, ${file?.imgUrl} 1200w`}
                  // --> srcSet={`${Another Image || Another Image} 580w, ${
                  //   file?.imgUrl || Another file?.imgUrl } 1200w`}
                />
              </a>
            </div>
            <div className="img_icon_container" onClick={deleteHandler}>
              <DeleteOutlineIcon color="error" sx={{ cursor: "pointer" }} />
            </div>
          </div>
        )}
      </div>
      <DeleteModal
        props={{
          open: openDeleteModal,
          setOpen: setOpenDeleteModal,
          deleteItem: currentTodo,
          itemId: file?.id,
          deleteText: null,
          isUbdate,
          setIsUbdate,
          deleteType: "File",
          type: "DelFile",
        }}
      />
    </>
  );
};

export default FileContent;
