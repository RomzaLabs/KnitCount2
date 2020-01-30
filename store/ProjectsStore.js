import { observable, action } from "mobx";

import Project from "../models/Project";
import { insertProject } from "../store/projectsDbHelper";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;
  @observable isProjectModalVisible = false;

  // Computed Props

  // Actions
  @action
  loadProjects = (projects) => {
    // Sort by modifiedDate in descending order, i.e. newest projects at the top
    this.projects = projects.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
  };

  @action
  setSelectedProject = (project) => {
    this.selectedProject = project;
  };

  @action
  createNewProject = (project) => {
    this.persistProject(project);
    this.projects = [...this.projects, project].sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
    this.setSelectedProject(project);
  };

  @action
  toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  };

  persistProject = (project) => {
    insertProject(project);
  };

}

export default new ProjectsStore();
