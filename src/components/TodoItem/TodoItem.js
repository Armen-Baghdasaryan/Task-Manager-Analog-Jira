import React from "react";
import { Link } from "react-router-dom";
import "./TodoItem.scss";
import emptyPhoto from "../../assets/emptyphoto.png";

const TodoItem = ({ todo, name }) => {
  
  return (
    <div className="todo_item_container">
      <div className="title_section">
        <div>
          <input type="checkbox" className="chbox_item" />
        </div>
        <span className="todo_title">{todo?.title}</span>
        <img alt="img" src={todo?.imgUrl || emptyPhoto} width={30} height={30} />
      </div>
      <span className="todo_description">{todo?.description}</span>
      <div className="buttons_section">
       <Link to={`/todoitem/${todo?.id}/${name}`}><button className="btn_content">More...</button></Link>
        <button className="btn_content btn_margin">Edit</button>
        <button className="btn_content">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
