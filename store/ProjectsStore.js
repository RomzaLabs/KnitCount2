import { observable, action } from "mobx";
import Project from "../models/Project";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;
  @observable isProjectModalVisible = false;

  // Computed Props

  // Actions
  @action
  loadProjects = (jsonProjects) => {
    const projects = jsonProjects.map(p => {
      return new Project(
        p.id,
        p.name,
        p.status,
        p.counters,
        p.notes,
        p.imageUris,
        p.startDate,
        p.modifiedDate,
        p.endDate
      );
    });

    // Sort by modifiedDate in descending order, i.e. newest projects at the top
    this.projects = projects.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
  };

  @action
  setSelectedProject = (project) => {
    this.selectedProject = project;
  };

  @action
  createNewProject = (project) => {
    // TODO: Persistence.
    this.projects = [...this.projects, project].sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
    this.setSelectedProject(project);
  };

  @action
  toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  }

}

export default new ProjectsStore();
