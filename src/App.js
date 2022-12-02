import { Navigate, Route, Routes } from "react-router-dom";
import TodoItemById from "./pages/TodoItemById/TodoItemById";
import MainPage from "./pages/MainPage/MainPage";
import TodoList from "./pages/TodoList/TodoList";
import NewPage from "./pages/NewPage";
import NewPage2 from "./pages/NewPage2";
import NewPage3 from "./pages/NewPage3";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="todolist/:name" element={<TodoList />} />
        <Route path="todoitem/:id/:name" element={<TodoItemById />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="newpage" element={<NewPage />} />
        <Route path="newpage2" element={<NewPage2 />} />
        <Route path="newpage3" element={<NewPage3 />} />
      </Routes>
    </>
  );
};

export default App;
