import React from "react";
import { Link, useParams } from "react-router-dom";
import TodoItem from "../../components/TodoItem/TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const { name } = useParams();

  const todos = [
    {
      id: 1,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Low",
      imgUrl: "",
      status: "Queue",
    },
    {
      id: 2,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee go to hom e and executive menegmant by togo lost",
      description:
        "Drink Coffee go to hom e and executive menegmant by togo lost Drink Coffee go to hom e and how to menegmant by togo lost",
      createdAt: Date.now(),
      priority: "Normal",
      imgUrl: "",
      status: "Development",
    },
    {
      id: 3,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Highest",
      imgUrl: "",
      status: "Done",
    },
    {
      id: 4,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Low",
      imgUrl: "",
      status: "Queue",
    },
    {
      id: 5,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Normal",
      imgUrl: "",
      status: "Development",
    },
    {
      id: 6,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Highest",
      imgUrl: "",
      status: "Done",
    },
    {
      id: 7,
      number: Math.floor(Math.random() * 1000),
      title: "Drink Coffee",
      description: "Drinc any coffee for morning",
      createdAt: Date.now(),
      priority: "Normal",
      imgUrl: "",
      status: "Queue",
    },
  ];

  return (
    <div className="todolist_container">
      <div className="todolist_content">
        <Link to={"/"}>
          <button className="btn_content">Back</button>
        </Link>
        <h3>{name}</h3>
        <div className="sections_container">
          <section>
            <span className="text_status">Queue</span>
            {todos?.map(
              (todo) =>
                todo?.status === "Queue" && (
                  <TodoItem key={todo?.id} todo={todo} name={name} />
                )
            )}
          </section>
          <section>
            <span className="text_status">Development</span>
            {todos?.map(
              (todo) =>
                todo?.status === "Development" && (
                  <TodoItem key={todo?.id} todo={todo} name={name} />
                )
            )}
          </section>
          <section>
            <span className="text_status">Done</span>
            {todos?.map(
              (todo) =>
                todo?.status === "Done" && (
                  <TodoItem key={todo?.id} todo={todo} name={name} />
                )
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
