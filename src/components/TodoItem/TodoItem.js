import React from "react";
import { Link } from "react-router-dom";
import "./TodoItem.scss";
import emptyPhoto from "../../assets/emptyphoto.png";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ubdateTodo } from "../../redux/actions/actionCreator";

const TodoItem = ({ todo, name }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    dispatch(
      ubdateTodo({
        ...todo,
        completed: e.target.checked,
      })
    );
  };

  return (
    <div className="todo_item_container">
      <div className="title_section">
        <div>
          {todo?.status === "Development" && (
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleChange(e, todo.id)}
              className="chbox_item"
            />
          )}
        </div>
        <span className="todo_number">No - {todo?.number}</span>
        <img
          alt="img"
          src={todo?.imgUrl || emptyPhoto}
          width={30}
          height={30}
        />
      </div>
      <span className="todo_title">{todo?.title}</span>
      <div className="buttons_section">
        <Link to={`/todoitem/${todo?.id}/${name}`}>
          <button className="btn_content">More...</button>
        </Link>
        <div className="icon_container">
          <ChatOutlinedIcon fontSize="string" color="string" />
          <span>: {todo?.comments?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
