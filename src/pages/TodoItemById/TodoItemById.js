import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TodoItemById.scss";
import emptyPhoto from "../../assets/emptyphoto.png";

const TodoItemById = () => {
  const [currentTodo, setCurrentTodo] = useState({});
  const { id, name } = useParams();

  const [todos, setTodos] = useState([
    {
      id: "1",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Low",
      imgUrl: "",
      status: "Queue",
    },
    {
      id: "2",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee go to hom",
      description:
        "Drink Coffee go to hom e and executive menegmant by togo lost Drink Coffee go to hom e and how to menegmant by togo lost",
      createdAt: Date.now(),
      priority: "Normal",
      imgUrl: "",
      status: "Development",
    },
    {
      id: "3",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Highest",
      imgUrl: "",
      status: "Done",
    },
    {
      id: "4",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Low",
      imgUrl: "",
      status: "Queue",
    },
    {
      id: "5",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Highest",
      imgUrl: "",
      status: "Development",
    },
    {
      id: "6",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Highest",
      imgUrl: "",
      status: "Done",
    },
    {
      id: "7",
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "High",
      imgUrl: "",
      status: "Queue",
    },
  ]);

  console.log(setTodos);

  useEffect(() => {
    todos?.map((todo) => todo.id === id && setCurrentTodo(todo));
  }, [id, todos]);

  const { number, title, description, createdAt, priority, status, imgUrl } =
    currentTodo && currentTodo;

  return (
    <div className="todo_id_container">
      <div className="todo_id_content">
        <section className="item_info_section">
          <Link to={`/todolist/${name}`}>
            <button className="btn_content">Back</button>
          </Link>
          <div>
            Task Number - <span>{number}</span>
          </div>
          <div>
            Title - <span>{title}</span>
          </div>
          <div>
            Description - <span>{description}</span>
          </div>
          <div>
            Created Date - <span>{createdAt}</span>
          </div>
          <div>
            Time at work - <span>{"6 hour 15 minute"}</span>
          </div>
          <div>
            Finih date - <span>{"24/12/18"}</span>
          </div>
          <div>
            Priority - <span className={`${priority}`}>{priority}</span>
          </div>
          <div>
            Status - <span>{status}</span>
          </div>
        </section>

        <section className="item_img_section">
          <img
            alt="img"
            src={imgUrl ? imgUrl : emptyPhoto}
            width={350}
            height={480}
          />
        </section>
      </div>
    </div>
  );
};

export default TodoItemById;
