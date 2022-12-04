import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import { toast } from "react-toastify";
import useAppDispatch from "../../hooks/useAppDispatch";
import "./SubTask.scss";

const SubTask = ({ task, currentTodo, isUbdate, setIsUbdate, handleEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(
      ubdateTodo({
        ...currentTodo,
        subTodos: [
          ...currentTodo?.subTodos?.filter((item) => item?.id !== task.id),
        ],
      })
    );
    setTimeout(() => {
      setIsUbdate(!isUbdate);
      toast("Task was deleted");
    }, 1000);
  };

  const handleComplete = (e) => {
    dispatch(
      ubdateTodo({
        ...currentTodo,
        subTodos: [
          ...currentTodo?.subTodos?.map((item) =>
            item?.id === task?.id
              ? { ...item, completed: e.target.checked }
              : { ...item }
          ),
        ],
      })
    );
    setTimeout(() => {
      setIsUbdate(!isUbdate);
    }, 1000);
  };

  return (
    <div>
      <div
        className={`subtask_container ${
          task.completed ? "subtask_completed" : null
        }`}
      >
        <div>
          <input
            className="chbox_item_subtask"
            type="checkbox"
            checked={task.completed}
            onChange={(e) => handleComplete(e)}
          />
          <span>{task?.title}</span>
        </div>
        <div className="subtask_description">{task?.description}</div>
        <div className="subtask_btn_container">
          <EditIcon
            onClick={() => handleEdit(task)}
            color="primary"
            className="btn_margin hoverPointer"
          />
          <DeleteOutlineIcon
            onClick={handleDelete}
            color="error"
            className="hoverPointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SubTask;
