import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import emptyPhoto from "../../assets/emptyphoto.png";
import "./TodoItemById.scss";
import DeleteModal from "../../components/Modals/DeleteTodoModal";
import useAppDispatch from "../../hooks/useAppDispatch";
import { successTodos } from "../../redux/actions/actionCreator";
import EditTodoModal from "../../components/Modals/EditTodoModal";
import Comments from "../../components/Comments/Comments";

const TodoItemById = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const { id, name } = useParams();
  const { todos } = useAppSelector((store) => store.todos);
  const { isSuccessTodo } = useAppSelector((store) => store.loadState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const createdAt = new Date(comment.createdAt).toLocaleDateString();

  useEffect(() => {
    if (isSuccessTodo) {
      navigate(`/todolist/${name}`);
      dispatch(successTodos(false));
    }
  }, [isSuccessTodo, name, navigate, dispatch]);

  useEffect(() => {
    todos?.map((todo) => todo.id === id && setCurrentTodo(todo));
  }, [id, todos]);

  return (
    <>
      <div className="todo_id_container">
        <div className="todo_id_content">
          <section className="item_info_section">
            <div className="item_buttons_container">
              <Link to={`/todolist/${name}`}>
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
              Created Date - <span>{currentTodo?.createdAt?.seconds}</span>
            </div>
            <div>
              Time at work - <span>{"6 hour 15 minute"}</span>
            </div>
            <div>
              Finish date - <span>{"24/12/2022"}</span>
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

            <div>
              <Comments currentUserId="1" currentTodo={currentTodo} />
            </div>
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
