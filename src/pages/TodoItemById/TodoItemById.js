import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { successTodos, ubdateTodo } from "../../redux/actions/actionCreator";
import { getTodos } from "../../redux/actions/actionCreator";
import { upLoadFile } from "../../helpers/upLoadFile";
import FormSubtask from "../../components/SubTask/FormSubtask";
import SubTask from "../../components/SubTask/SubTask";
import EditTodoModal from "../../components/Modals/EditTodoModal";
import Comments from "../../components/Comments/Comments";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import DeleteModal from "../../components/Modals/DeleteModal";
import ItemInfo from "../../components/ItemInfo/ItemInfo";
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
            {
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              imgUrl: uploadImg && uploadImg,
            },
            ...currentTodo?.files,
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
          <ItemInfo
            props={{
              projectId,
              setOpenEditModal,
              setOpenDeleteModal,
              currentTodo,
              setFile,
              upLoad,
              uploadImg,
              handleAddFile,
              visiableFile,
              setVisiableFile,
              isUbdate,
              setIsUbdate,
            }}
          />
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
        props={{
          open: openDeleteModal,
          setOpen: setOpenDeleteModal,
          deleteItem: currentTodo,
          deleteText: currentTodo?.title,
          deleteType: "Todo",
          type: "DelTodo",
        }}
      />
    </>
  );
};

export default TodoItemById;
