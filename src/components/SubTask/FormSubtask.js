import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import "./SubTask.scss";

const FormSubtask = ({
  currentTodo,
  isUbdate,
  setIsUbdate,
  title,
  setTitle,
  visiable,
  currentTask,
  handleVisiable,
  description,
  setDescription,
  setVisiable,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentTask && setTitle(currentTask?.title);
    currentTask && setDescription(currentTask?.description);
  }, [currentTask, setDescription, setTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
      if (currentTask) {
        dispatch(
          ubdateTodo({
            ...currentTodo,
            subTodos: [
              ...currentTodo?.subTodos?.map((item) =>
                item?.id === currentTask?.id
                  ? { ...item, title: title, description: description }
                  : { ...item }
              ),
            ],
          })
        );

        setTitle("");
        setDescription("");
        setVisiable(false);
        setTimeout(() => {
          setIsUbdate(!isUbdate);
        }, 1000);
      } else {
        dispatch(
          ubdateTodo({
            ...currentTodo,
            subTodos: [
              ...currentTodo?.subTodos,
              {
                id: Math.random().toString(36).substr(2, 9),
                parentId: currentTodo?.id,
                completed: false,
                createdAt: new Date().toISOString(),
                title,
                description,
              },
            ],
          })
        );

        setTitle("");
        setDescription("");
        setVisiable(false);
        setTimeout(() => {
          setIsUbdate(!isUbdate);
        }, 1000);
      }
    } else {
      toast("All fields is required");
    }
  };

  return (
    <div>
      <div className="subTask_btn_container">
        <button className="btn_content" onClick={handleVisiable}>
          {!visiable ? "Add Task" : "Cancel"}
        </button>
      </div>
      {visiable && (
        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-form-textarea subtask_title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="comment-form-textarea"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="btn_add_container">
            <button type="submit" className="btn_content">
              {!currentTask ? "Add" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormSubtask;
