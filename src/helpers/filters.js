export const filterProjects = (arr, searchText) => {
  return arr?.filter((project) => {
    return searchText.toLowerCase() === ""
      ? project
      : project.name.toLowerCase().includes(searchText) ||
          (
            project.name.charAt(0).toUpperCase() + project.name.slice(1)
          ).includes(searchText) ||
          project.name.toUpperCase().includes(searchText);
  });
};

export const filterTodos = (arr, searchText) => {
  return arr?.filter((item) => {
    return searchText.toLowerCase() === ""
      ? item
      : item.title.toLowerCase().includes(searchText) ||
          item.number.includes(searchText) ||
          (item.title.charAt(0).toUpperCase() + item.title.slice(1)).includes(
            searchText
          ) ||
          item.title.toUpperCase().includes(searchText);
  });
};
