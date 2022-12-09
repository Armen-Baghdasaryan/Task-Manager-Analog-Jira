import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./TodoLIstHeader.scss";

const TodoLIstHeader = ({ props }) => {
  const {
    parentProject,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    setShowTodoModal,
  } = props;

  return (
    <div className="project_header">
      <span className="project_name_text">{parentProject?.name}</span>
      <div className="btn_container">
        <div className={showSearch ? "search_container" : null}>
          {!showSearch ? (
            <SearchIcon
              onClick={() => setShowSearch(true)}
              className="search_icon"
            />
          ) : (
            <TextField
              size="small"
              color="info"
              id="outlined-basic"
              label="Search by title or number"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={(e) => e.isTrusted && setShowSearch(false)}
            />
          )}
        </div>
        <button
          className="btn_content btn_margin"
          onClick={() => setShowTodoModal(true)}
        >
          Add Todo
        </button>
        <Link to={"/"}>
          <button className="btn_content">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default TodoLIstHeader;
