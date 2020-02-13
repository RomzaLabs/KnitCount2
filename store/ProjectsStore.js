import _ from "lodash";
import { observable, action } from "mobx";
import {toJS} from "mobx";

import {
  insertProject,
  updateProject,
  deleteProject,
  insertImage,
  deleteImage,
  insertCounter,
  updateCounter,
  deleteCounter
} from "../store/projectsDbHelper";
import {ProjectStatus} from "../models/ProjectStatus";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;
  @observable isProjectModalVisible = false;

  // Computed Props

  // Actions
  @action
  loadProjects = (projects) => this.projects = projects;

  @action
  setSelectedProject = (project) => {
    this.selectedProject = project;
    this.updateSelectedProjectInProjects();
  };

  @action
  createNewProject = async(project) => {
    const dbResult = await insertProject(project);
    project.id = dbResult.insertId;
    this.setSelectedProject(project);
  };

  @action
  toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  };

  @action
  toggleStatusForProject = (projectId) => {
    this.projects = this.projects.map(p => {
      if (p.id === projectId) {
        const project = {
          ...p,
          status: p.status === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP
        };
        updateProject(project);
        return project;
      }
      return p;
    });
  };

  @action
  deleteProjectById = (projectId) => {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.selectedProject = null;
    deleteProject(projectId);
  };

  @action
  deleteImageFromProjectById = (projectId, imageId) => {
    deleteImage(imageId);
  };

  @action updateCounterLabel = (counter, newLabel) => {
    const updatedCounter = {...counter, label: newLabel};
    updateCounter(updatedCounter);
    this.projects = this.projects.map(p => {
      if (p.id === counter.projectId) {
        const counters = p.counters.map(c => {
          if (c.id === counter.id) return updatedCounter;
          return c;
        });
        return {...p, counters};
      }
      return p;
    });
  };

  @action deleteCounter = (counter) => {
    deleteCounter(counter.id);
    const newCounters = this.selectedProject.counters.filter(c => c.id !== counter.id);
    this.setCountersForSelectedProject(newCounters);
  };

  @action setImagesForSelectedProject = (images) => {
    if (this.selectedProject) {
      this.selectedProject = {...this.selectedProject, images};
      this.updateSelectedProjectInProjects();
      this.saveSelectedProject();
    }
  };

  @action setNotesForSelectedProject = (notes) => {
    if (this.selectedProject) {
      this.selectedProject = {...this.selectedProject, notes};
      this.updateSelectedProjectInProjects();
      this.saveSelectedProject();
    }
  };

  @action setNameForSelectedProject = (name) => {
    if (this.selectedProject) {
      this.selectedProject = {...this.selectedProject, name};
      this.updateSelectedProjectInProjects();
      this.saveSelectedProject();
    }
  };

  @action setCountersForSelectedProject = (counters) => {
    if (this.selectedProject) {
      this.selectedProject = {...this.selectedProject, counters};
      this.updateSelectedProjectInProjects();
      this.saveSelectedProject();
    }
  };

  @action appendCounterToSelectedProject = (counter) => {
    if (this.selectedProject) {
      this.selectedProject = {...this.selectedProject, counters: [...this.selectedProject.counters, counter]};
      this.updateSelectedProjectInProjects();
      this.saveSelectedProject();
    }
  };

  @action updateSelectedProjectInProjects = () => {
    if (this.selectedProject) {
      const exists = this.projects.find(p => p.id === this.selectedProject.id);
      if (exists) {
        this.projects = this.projects.map(p => {
          if (p.id === this.selectedProject.id) return this.selectedProject;
          return p;
        })
      } else {
        const oldProjects = this.projects.filter(p => p.id !== this.selectedProject.id);
        this.projects = [this.selectedProject, ...oldProjects]
          .sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
      }
    }
  };

  @action saveSelectedProject = _.debounce(async() => {
    await updateProject(toJS(this.selectedProject));
    const counters = toJS(this.selectedProject.counters);
    for (const c of counters) {
      await updateCounter(c);
    }
  }, 800, { trailing: true });

  @action saveImage = (projectId, image) => {
    insertImage(projectId, image);
  };

  @action saveCounter = (projectId, counter) => {
    return insertCounter(projectId, counter);
  };

}

export default new ProjectsStore();
