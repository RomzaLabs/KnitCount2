import { observable, action } from "mobx";

import {insertProject, updateProject} from "../store/projectsDbHelper";
import {ProjectStatus} from "../models/ProjectStatus";

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
  createNewProject = async(project) => {
    this.setSelectedProject(project);
    await this.persistProject(project);
    this.projects = [...this.projects, project].sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
  };

  @action
  toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  };

  @action
  toggleStatusForProject = (projectId) => {
    this.projects = this.projects.map(p => {
      if (p.id === projectId) {
        const project = {...p, status: p.status === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP};
        updateProject(project);
        return project;
      }
      return p;
    });
  };

  persistProject = async(project) => {
    await insertProject(project);
  };

}

export default new ProjectsStore();
