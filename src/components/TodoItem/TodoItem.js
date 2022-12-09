import React from "react";
import { Link } from "react-router-dom";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { ArrowForward } from "@mui/icons-material";
import emptyPhoto from "../../assets/emptyphoto.png";
import "./TodoItem.scss";

const TodoItem = ({ todo, projectId }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    dispatch(
      ubdateTodo({
        ...todo,
        completed: e.target.checked,
      })
    );
  };

  const handleBack = () => {
    todo?.status === "Development"
      ? dispatch(ubdateTodo({ ...todo, status: "Queue" }))
      : dispatch(ubdateTodo({ ...todo, status: "Development" }));
  };

  const handleGo = () => {
    todo?.status === "Queue"
      ? dispatch(ubdateTodo({ ...todo, status: "Development" }))
      : dispatch(ubdateTodo({ ...todo, status: "Done" }));
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
          src={todo?.files[0]?.imgUrl || emptyPhoto}
          width={30}
          height={30}
        />
      </div>
      <span className="todo_title">{todo?.title}</span>
      <div className="arrow_container">
        <Button
          onClick={handleBack}
          startIcon={<ArrowBack />}
          className={`btn_content ${
            todo?.status === "Queue" ? "btn_hidden" : null
          }`}
        ></Button>
        <Button
          onClick={handleGo}
          startIcon={<ArrowForward />}
          className={`btn_content ${
            todo?.status === "Done" ? "btn_hidden" : null
          }`}
        ></Button>
      </div>
      <div className="buttons_section">
        <Link to={`/todoitem/${projectId}/${todo?.id}`}>
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