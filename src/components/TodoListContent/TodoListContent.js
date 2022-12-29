import React from "react";
import { filterTodos } from "../../helpers/filters";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoListContent.scss";

const TodoListContent = ({ props }) => {
  const {
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
  } = props;

  return (
    <div className="sections_container">
      {boards?.map((board, idx) => (
        <div
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
          key={idx}
          className="section_container_item"
        >
          {!board.items.length && (
            <h5
              className={`"not_todos" ${
                board?.title !== activeSection
                  ? "display_none"
                  : "display_block"
              }`}
            >
              No tasks yet
            </h5>
          )}
          <div
            className={`"section_item_container" ${
              board?.title !== activeSection ? "display_none" : "display_block"
            }`}
          >
            {filterTodos(board?.items, search).map((item, idx) => (
              <div
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
                key={idx}
              >
                <TodoItem key={item?.id} todo={item} projectId={projectId} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoListContent;
