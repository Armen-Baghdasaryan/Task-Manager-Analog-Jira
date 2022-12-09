import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ubdateTodo } from "../../redux/actions/actionCreator";
import useAppDispatch from "../../hooks/useAppDispatch";
import DeleteModal from "../Modals/DeleteModal";
import "./SubTask.scss";

const SubTask = ({ task, currentTodo, isUbdate, setIsUbdate, handleEdit }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    setOpenDeleteModal(true);
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
      <DeleteModal
        props={{
          open: openDeleteModal,
          setOpen: setOpenDeleteModal,
          deleteItem: currentTodo,
          itemId: task?.id,
          deleteText: null,
          isUbdate,
          setIsUbdate,
          deleteType: "Subtask",
          type: "DelSubtask",
        }}
      />
    </div>
  );
};

export default SubTask;