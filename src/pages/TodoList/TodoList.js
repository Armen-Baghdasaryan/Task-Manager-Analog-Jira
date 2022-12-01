import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AddTodoModal from "../../components/Modals/AddTodoModal";
import TodoItem from "../../components/TodoItem/TodoItem";
import useAppSelector from "../../hooks/useAppSelector";
import { getTodos } from "../../redux/actions/actionCreator";
import "./TodoList.scss";

const TodoList = () => {
  const [showAddTodoModal, setShowTodoModal] = useState(false);
  const { todos } = useAppSelector((store) => store.todos);
  const { isLoadingTodos, ubdateTodos } = useAppSelector(
    (store) => store.loadState
  );
  const { name } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, ubdateTodos]);

  return (
    <>
      <div className="todolist_container">
        <div className="todolist_content">
          <div className="project_header">
            <span className="project_name_text">{name}</span>
            <div>
              <button
                className="btn_content btn_margin"
                onClick={() => setShowTodoModal(true)}
              >
                Add Todo
              </button>
              <Link to={"/"}>
                <button className="btn_content">Back</button>
              </Link>
            </div>
          </div>

          {isLoadingTodos && <Loader />}

          <div className="sections_container">
            <section>
              <span className="text_status">Queue</span>
              <div className="section_item_container">
                {todos?.map(
                  (todo) =>
                    todo?.status === "Queue" &&
                    todo?.projectName === name && (
                      <TodoItem key={todo?.id} todo={todo} name={name} />
                    )
                )}
              </div>
            </section>
            <section>
              <span className="text_status">Development</span>
              <div className="section_item_container">
                {todos?.map(
                  (todo) =>
                    todo?.status === "Development" &&
                    todo?.projectName === name && (
                      <TodoItem key={todo?.id} todo={todo} name={name} />
                    )
                )}
              </div>
            </section>
            <section>
              <span className="text_status">Done</span>
              <div className="section_item_container">
                {todos?.map(
                  (todo) =>
                    todo?.status === "Done" &&
                    todo?.projectName === name && (
                      <TodoItem key={todo?.id} todo={todo} name={name} />
                    )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <AddTodoModal
        open={showAddTodoModal}
        setOpen={setShowTodoModal}
        name={name}
      />
    </>
  );
};

export default TodoList;
