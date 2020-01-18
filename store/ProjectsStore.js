import { observable, action } from "mobx";
import Project from "../models/Project";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;

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
  }

}

export default new ProjectsStore();
