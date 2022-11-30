import { Navigate, Route, Routes } from "react-router-dom";
import TodoItemById from "./pages/TodoItemById/TodoItemById";
import MainPage from "./pages/MainPage/MainPage";
import TodoList from "./pages/TodoList/TodoList";

const App = () => {
  return (
    <>
           <h1>hhhhh</h1>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="todolist/:name" element={<TodoList />} />
        <Route path="todoitem/:id/:name" element={<TodoItemById />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
