const initialState = {
  isLoadingProjects: false,
  isLoadingTodos: false,
  isSuccess: false,
  ubdateProjects: false,
  ubdateTodos: false,
  isError: "",
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
    default:
      return state;
  }
};

export default loaderReducer;
