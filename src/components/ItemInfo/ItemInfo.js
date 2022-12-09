import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import AddFileButton from "../../components/AddFileButton/AddFileButton";
import FileContent from "../../components/FileContent/FileContent";
import emptyPhoto from "../../assets/emptyphoto.png";
import "./ItemInfo.scss";

const ItemInfo = ({ props }) => {
  const {
    projectId,
    setOpenEditModal,
    setOpenDeleteModal,
    currentTodo,
    setFile,
    uploadImg,
    handleAddFile,
    visiableFile,
    setVisiableFile,
    upLoad,
    isUbdate,
    setIsUbdate,
  } = props;

  const createdDate = moment(
    new Date(currentTodo?.createdAt).toLocaleDateString()
  ).format("DD-MM-YYYY");

  const finishDate = moment(
    new Date(currentTodo?.finishDate).toLocaleDateString()
  ).format("DD-MM-YYYY");

  const timeAgo = moment(currentTodo?.createdAt).fromNow();

  return (
    <div className="item_info_section">
      <div className="item_buttons_container">
        <Link to={`/todolist/${projectId}`}>
          <button className="btn_content">Back</button>
        </Link>
        <div>
          <button
            className="btn_content btn_margin"
            onClick={() => setOpenEditModal(true)}
          >
            Edit
          </button>
          <button
            className="btn_content btn_delete"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="item_comment_container">
        <div className="info_container">
          <div>
            Task Number - <span>{currentTodo?.number}</span>
          </div>
          <div>
            Title - <span>{currentTodo?.title}</span>
          </div>
          <div>
            Description - <span>{currentTodo?.description}</span>
          </div>
          <div>
            Created Date - <span>{createdDate}</span>
          </div>
          <div>
            Time at work - <span>{timeAgo}</span>
          </div>
          <div>
            Finish date - <span>{finishDate}</span>
          </div>
          <div>
            Priority -{" "}
            <span className={`${currentTodo?.priority}`}>
              {currentTodo?.priority}
            </span>
          </div>
          <div>
            Status - <span>{currentTodo?.status}</span>
          </div>
        </div>
        <div>
          <div className="add_file_container">
            <div className="add_file_content">
              <div className="add_button_container">
                <AddFileButton setFile={setFile} />
                <div className="file_field">
                  <img
                    alt="img"
                    width={45}
                    height={45}
                    src={uploadImg || emptyPhoto}
                  />
                </div>
              </div>
              <div className="btn_container_add">
                <button
                  onClick={handleAddFile}
                  disabled={!uploadImg}
                  className={`btn_content ${
                    !uploadImg || !upLoad ? "btn_disabled" : null
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {currentTodo?.files[0]?.imgUrl || currentTodo?.files[1]?.imgUrl ? (
            <div className="item_img_section">
              <div
                className="comments_title"
                onClick={() => setVisiableFile(!visiableFile)}
              >
                {visiableFile ? "Hide Files" : "Show Files"}
              </div>

              <div className="all_image_section">
                {" "}
                {visiableFile &&
                  currentTodo?.files?.map((file) => (
                    <FileContent
                      key={file?.id}
                      file={file}
                      currentTodo={currentTodo}
                      isUbdate={isUbdate}
                      setIsUbdate={setIsUbdate}
                    />
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
