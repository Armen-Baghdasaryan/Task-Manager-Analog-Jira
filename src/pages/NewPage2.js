import React, { useState } from "react";
import "./NewPage2.scss";

const NewPage2 = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Queue",
      items: [
        { id: 2, title: "Drinck coffee", status: "Queue" },
        { id: 3, title: "Have a lunch", status: "Queue" },
        { id: 4, title: "Drink wiskey", status: "Queue" },
      ],
    },
    {
      id: 5,
      title: "Development",
      items: [
        { id: 6, title: "Play soccer", status: "Development" },
        { id: 7, title: "Play pubg", status: "Development" },
        { id: 8, title: "Play tennis", status: "Development" },
      ],
    },
    {
      id: 9,
      title: "Done",
      items: [
        { id: 10, title: "Learn React", status: "Done" },
        { id: 11, title: "Learn Vue", ststus: "Done" },
        { id: 12, title: "Learn Angular", status: "Done" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === "item_cont")
      e.target.style.boxShadow = "0 4px 3px gray";
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className="ncont">
      {boards.map((board, idx) => (
        <div
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
          className="board_item"
          key={idx}
        >
          <div className="board_header">{board.title}</div>
          {board.items.map((item, idx) => (
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className="item_cont"
              key={idx}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewPage2;
