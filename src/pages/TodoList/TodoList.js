import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTodos,
  getProjects,
  ubdateTodo,
} from "../../redux/actions/actionCreator";
import useAppSelector from "../../hooks/useAppSelector";
import Loader from "../../components/Loader/Loader";
import AddTodoModal from "../../components/Modals/AddTodoModal";
import TodoLIstHeader from "../../components/TodoListHeader/TodoLIstHeader";
import TodoListContent from "../../components/TodoListContent/TodoListContent";
import "./TodoList.scss";

const TodoList = () => {
  const [showAddTodoModal, setShowTodoModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("Queue");
  const { todos } = useAppSelector((store) => store.todos);
  const { projects } = useAppSelector((store) => store.projects);
  const [parentProject, setParentProject] = useState(null);
  const { isLoadingTodos, ubdateTodos } = useAppSelector(
    (store) => store.loadState
  );
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, ubdateTodos]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    projects?.map((project) => {
      if (project?.projectId === projectId) {
        setParentProject(project);
      }
      return null;
    });
  }, [projects, projectId]);

  // Drag and Drop
  const queueTodos = todos?.filter(
    (todo) => todo?.status === "Queue" && todo?.projectId === projectId
  );

  const developmentTodos = todos?.filter(
    (todo) => todo?.status === "Development" && todo?.projectId === projectId
  );

  const doneTodos = todos?.filter(
    (todo) => todo?.status === "Done" && todo?.projectId === projectId
  );

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
    if (currentItem && finishBoard) {
      dispatch(
        ubdateTodo({
          ...currentItem,
          status: finishBoard?.title,
        })
      );
      setTimeout(() => {
        setCurrentItem(null);
        setFinishBoard(null);
      }, 1200);
    }
  }, [dispatch, currentItem, finishBoard, finishBoard?.title]);

  return (
    <>
      <div className="todolist_container">
        <div className="todolist_content">
          <TodoLIstHeader
            props={{
              parentProject,
              showSearch,
              setShowSearch,
              search,
              setSearch,
              setShowTodoModal,
            }}
          />
          {isLoadingTodos && <Loader />}
          <div className="buttons_container_section">
            {boards.map((item) => (
              <div
                key={item.id}
                className={`button_items ${
                  item.title === activeSection ? "active_button" : null
                }`}
                onClick={() => setActiveSection(item.title)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <TodoListContent
            props={{
              boards,
              dragOverHandler,
              dropCardHandler,
              activeSection,
              search,
              dragLeaveHandler,
              dragStartHandler,
              dragEndHandler,
              dropHandler,
              projectId,
            }}
          />
        </div>
      </div>
      <AddTodoModal
        open={showAddTodoModal}
        setOpen={setShowTodoModal}
        projectId={projectId}
      />
    </>
  );
};

export default TodoList;
