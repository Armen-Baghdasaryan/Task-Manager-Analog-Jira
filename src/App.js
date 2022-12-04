import { Navigate, Route, Routes } from "react-router-dom";
import TodoItemById from "./pages/TodoItemById/TodoItemById";
import MainPage from "./pages/MainPage/MainPage";
import TodoList from "./pages/TodoList/TodoList";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="todolist/:projectId" element={<TodoList />} />
        <Route path="todoitem/:projectId/:id" element={<TodoItemById />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
