import React from "react";
import { Link } from "react-router-dom";
import "./ProjectItem.scss";

const ProjectItem = ({ project, handleEdit, handleDelete }) => {
  return (
    <>
      <div className="project_item_container">
        <span className="project_name">{project.name}</span>
        <span className="project_info">{project.description}</span>
        <div>
          <Link to={`/todolist/${project?.projectId}`}>
            <button className="btn_content">More...</button>
          </Link>
          <button
            className="btn_content btn_margin"
            onClick={() => handleEdit(project)}
          >
            Edit
          </button>
          <button className="btn_content" onClick={() => handleDelete(project)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
