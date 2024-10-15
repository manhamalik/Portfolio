function updateProjects() {
  const searchTerm = searchBar.value.toLowerCase();
  const sortOption = sortDropdown.value;

  filteredProjects = projects.filter(project => {
    return (
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      project.title.toLowerCase().includes(searchTerm)
    );
  });

  filteredProjects.sort((a, b) => {
    if (sortOption === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  // Rendering logic...
}
