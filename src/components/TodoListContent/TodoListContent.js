import React from "react";
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
          {JSON.stringify(board?.items) === "[]" && (
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
            {board?.items
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search) ||
                      item.number.includes(search) ||
                      (
                        item.title.charAt(0).toUpperCase() + item.title.slice(1)
                      ).includes(search) ||
                      item.title.toUpperCase().includes(search);
              })
              .map((item, idx) => (
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
