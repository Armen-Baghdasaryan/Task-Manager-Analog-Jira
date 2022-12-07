import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import "./FileContent.scss";

const FileContent = ({ file, currentTodo, isUbdate, setIsUbdate }) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(
      ubdateTodo({
        ...currentTodo,
        files: [...currentTodo?.files?.filter((item) => item?.id !== file.id)],
      })
    );

    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 1000);
  };

  return (
    <div className="files_container">
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
    </div>
  );
};

export default FileContent;
