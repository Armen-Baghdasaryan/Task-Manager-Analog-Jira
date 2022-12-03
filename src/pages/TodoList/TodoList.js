import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AddTodoModal from "../../components/Modals/AddTodoModal";
import TodoItem from "../../components/TodoItem/TodoItem";
import useAppSelector from "../../hooks/useAppSelector";
import { getTodos, editTodos } from "../../redux/actions/actionCreator";
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

  const queueTodos = todos.filter(
    (todo) => todo?.status === "Queue" && todo?.projectName === name
  );

  const developmentTodos = todos.filter(
    (todo) => todo?.status === "Development" && todo?.projectName === name
  );

  const doneTodos = todos.filter(
    (todo) => todo?.status === "Done" && todo?.projectName === name
  );

  // Drag and Drop
  const boards = [
    { id: 1, title: "Queue", items: queueTodos },
    { id: 2, title: "Development", items: developmentTodos },
    { id: 3, title: "Done", items: doneTodos },
  ];

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [finishBoard, setFinishBoard] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {};

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {};

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    boards.map((b) => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }

      return b;
    });
    setFinishBoard(board);
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    boards.map((b) => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    });
    setFinishBoard(board);
  };

  useEffect(() => {
    currentItem &&
      finishBoard &&
      dispatch(
        editTodos({
          ...currentItem,
          status: finishBoard?.title,
        })
      );
    setTimeout(() => {
      setCurrentItem(null);
      setFinishBoard(null);
    }, 1500);
  }, [dispatch, currentItem, finishBoard, finishBoard?.title]);

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
            {boards?.map((board, idx) => (
              <section
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, board)}
                key={idx}
              >
                <span className="text_status">{board?.title}</span>
                {JSON.stringify(board?.items) === "[]" && (
                  <h5 className="not_todos">No tasks yet</h5>
                )}
                <div className="section_item_container">
                  {board?.items?.map((item, idx) => (
                    <div
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, board, item)}
                      draggable={true}
                      key={idx}
                    >
                      <TodoItem key={item?.id} todo={item} name={name} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
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
