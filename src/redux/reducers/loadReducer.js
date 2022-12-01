const initialState = {
  isLoadingProjects: false,
  isSuccessProject: false,
  ubdateProjects: false,
  isLoadingTodos: false,
  isSuccessTodo: false,
  ubdateTodos: false,
  isErrorProject: "",
  isErrorTodo: "",
};

const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING_DATA_PROJECTS":
      return {
        ...state,
        isLoadingProjects: payload,
      };
    case "LOADING_DATA_TODOS":
      return {
        ...state,
        isLoadingTodos: payload,
      };
    case "UBDATE_PROJECTS":
      return {
        ...state,
        ubdateProjects: !state.ubdateProjects,
      };
    case "UBDATE_TODOS":
      return {
        ...state,
        ubdateTodos: !state.ubdateTodos,
      };
    case "SUCCESS_TODOS":
      return {
        ...state,
        isSuccessTodo: payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
