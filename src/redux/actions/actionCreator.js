// POSTS
export const createProject = (props) => {
  return {
    type: "CREATE_PROJECT",
    props,
  };
};

export const getProjects = () => {
  return {
    type: "GET_PROJECTS",
  };
};

export const setProjects = (payload) => {
  return {
    type: "SET_PROJECTS",
    payload,
  };
};

export const editProject = (props) => {
  return {
    type: "EDIT_PROJECT",
    props,
  };
};

export const deleteProject = (id) => {
  return {
    type: "DELETE_PROJECT",
    id,
  };
};

// TODOS
export const createTodo = (props) => {
  return {
    type: "CREATE_TODO",
    props,
  };
};

export const getTodos = () => {
  return {
    type: "GET_TODOS",
  };
};

export const setTodos = (payload) => {
  return {
    type: "SET_TODOS",
    payload,
  };
};

export const editTodos = (props) => {
  return {
    type: "EDIT_TODO",
    props,
  };
};

export const ubdateTodo = (props) => {
  return {
    type: "UBDATE_TODO",
    props,
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

// LOAD STATE
export const loadStateProjects = (payload) => {
  return { type: "LOADING_DATA_PROJECTS", payload };
};

export const loadStateTodos = (payload) => {
  return { type: "LOADING_DATA_TODOS", payload };
};

export const successTodos = (payload) => {
  return { type: "SUCCESS_TODOS", payload };
};

export const ubdateProjects = () => {
  return { type: "UBDATE_PROJECTS" };
};

export const ubdateTodos = () => {
  return { type: "UBDATE_TODOS" };
};
