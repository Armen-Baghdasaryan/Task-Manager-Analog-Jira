import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { successTodos } from "../../redux/actions/actionCreator";
import { getTodos } from "../../redux/actions/actionCreator";
import FormSubtask from "../../components/SubTask/FormSubtask";
import SubTask from "../../components/SubTask/SubTask";
import DeleteModal from "../../components/Modals/DeleteTodoModal";
import EditTodoModal from "../../components/Modals/EditTodoModal";
import Comments from "../../components/Comments/Comments";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import emptyPhoto from "../../assets/emptyphoto.png";
import "./TodoItemById.scss";

const TodoItemById = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [isUbdate, setIsUbdate] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { id, projectId } = useParams();
  const { todos } = useAppSelector((store) => store.todos);
  const { isSuccessTodo } = useAppSelector((store) => store.loadState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const refElement = useRef();

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

  return (
    <>
      <div className="todo_id_container">
        <div className="todo_id_content">
          <section className="item_info_section">
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
          </section>

          <section className="item_img_section">
            <a
              href={`${currentTodo?.imgUrl ? currentTodo?.imgUrl : "#"}`}
              target={`${currentTodo?.imgUrl && "blank"}`}
            >
              <img
                alt="img"
                className="todo_id_image"
                src={currentTodo?.imgUrl || emptyPhoto}
                srcSet={`${currentTodo?.imgUrl || emptyPhoto} 580w, ${
                  currentTodo?.imgUrl || emptyPhoto
                } 1200w`}
                //-->
                // srcSet={`${Another Image || Another Image} 580w, ${
                //   currentTodo?.imgUrl || emptyPhoto } 1200w`}
              />
            </a>
          </section>
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
