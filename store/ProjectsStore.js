import { observable, action } from "mobx";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;

  // Computed Props

  // Actions
  @action
  loadProjects = (projects) => {
    this.projects = projects;
  };

  @action
  setSelectedProject = (project) => {
    this.selectedProject = project;
  }

}

export default new ProjectsStore();
