import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { successTodos, ubdateTodo } from "../../redux/actions/actionCreator";
import { getTodos } from "../../redux/actions/actionCreator";
import { upLoadFile } from "../../helpers/upLoadFile";
import FormSubtask from "../../components/SubTask/FormSubtask";
import SubTask from "../../components/SubTask/SubTask";
import DeleteModal from "../../components/Modals/DeleteTodoModal";
import EditTodoModal from "../../components/Modals/EditTodoModal";
import Comments from "../../components/Comments/Comments";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import AddFileButton from "../../components/AddFileButton/AddFileButton";
import FileContent from "../../components/FileContent/FileContent";
import emptyPhoto from "../../assets/emptyphoto.png";
import "./TodoItemById.scss";

const TodoItemById = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [isUbdate, setIsUbdate] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const [visiableFile, setVisiableFile] = useState(true);
  const [file, setFile] = useState("");
  const [upLoad, setUpLoad] = useState(null);
  const [uploadImg, setUploadImg] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { id, projectId } = useParams();
  const { todos } = useAppSelector((store) => store.todos);
  const { isSuccessTodo } = useAppSelector((store) => store.loadState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const refElement = useRef();

  useEffect(() => {
    file && upLoadFile(file, setUpLoad, setUploadImg);
  }, [file]);

  const createdDate = moment(
    new Date(currentTodo?.createdAt).toLocaleDateString()
  ).format("DD-MM-YYYY");

  const finishDate = moment(
    new Date(currentTodo?.finishDate).toLocaleDateString()
  ).format("DD-MM-YYYY");

  const timeAgo = moment(currentTodo?.createdAt).fromNow();

  useEffect(() => {
    if (isSuccessTodo) {
      navigate(`/todolist/${projectId}`);
      dispatch(successTodos(false));
    }
  }, [isSuccessTodo, projectId, navigate, dispatch]);

  useEffect(() => {
    todos?.map((todo) => todo.id === id && setCurrentTodo(todo));
  }, [id, todos]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, isUbdate]);

  const handleEdit = (task) => {
    setVisiable(true);
    setCurrentTask(task);
    setTimeout(() => {
      refElement?.current?.focus();
    }, 200);
  };

  const handleVisiable = () => {
    setVisiable(!visiable);
    setTitle("");
    setDescription("");
    setCurrentTask(null);
  };

  const handleAddFile = () => {
    uploadImg &&
      dispatch(
        ubdateTodo({
          ...currentTodo,
          files: [
            ...currentTodo?.files,
            {
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              imgUrl: uploadImg && uploadImg,
            },
          ],
        })
      );

    setUploadImg("");
    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 1000);
  };

  return (
    <>
      <div className="todo_id_container">
        <div className="todo_id_content">
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
                        disabled={upLoad !== null && upLoad < 100}
                        className={`btn_content btn_margin ${
                          upLoad !== null && upLoad < 100
                            ? "btn_disabled"
                            : null
                        }`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item_img_section">
                  <div
                    className="comments_title"
                    onClick={() => setVisiableFile(!visiableFile)}
                  >
                    {visiableFile ? "Hide File" : "Show"}
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
              </div>
            </div>
          </div>
          <div className="comments_section">
            <div className="form_container">
              <FormSubtask
                refElement={refElement}
                visiable={visiable}
                handleVisiable={handleVisiable}
                setVisiable={setVisiable}
                isUbdate={isUbdate}
                setIsUbdate={setIsUbdate}
                currentTodo={currentTodo}
                currentTask={currentTask}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
            </div>
            {currentTodo?.subTodos?.map((task) => (
              <SubTask
                setVisiable={setVisiable}
                isUbdate={isUbdate}
                handleEdit={handleEdit}
                setIsUbdate={setIsUbdate}
                currentTodo={currentTodo}
                key={task?.id}
                task={task}
              />
            ))}
            <Comments
              currentUserId="1"
              currentTodo={currentTodo}
              isUbdate={isUbdate}
              setIsUbdate={setIsUbdate}
            />
          </div>
        </div>
      </div>
      <EditTodoModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        editItem={currentTodo}
        isUbdate={isUbdate}
        setIsUbdate={setIsUbdate}
      />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteItem={currentTodo}
        type="todo"
      />
    </>
  );
};

export default TodoItemById;
