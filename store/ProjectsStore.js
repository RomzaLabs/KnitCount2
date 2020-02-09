import _ from "lodash";
import { observable, action } from "mobx";

import {
  insertProject,
  updateProject,
  deleteProject,
  insertImage,
  deleteImage,
  updateImage,
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
  loadProjects = (projects) => {
    // Sort by modifiedDate in descending order, i.e. newest projects at the top
    this.projects = projects.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
  };

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

  @action
  updateProjectName = (projectId, newName) => {
    this.projects = this.projects.map(p => {
      if (p.id === projectId) {
        const project = {...p, name: newName};
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
  addImageToProjectById = async(projectId, image) => {
    const dbResult = await insertImage(projectId, image);
    image.id = dbResult.insertId;
    this.projects = this.projects.map(p => {
      if (p.id === projectId) return {...p, images: [image, ...p.images]};
      return p;
    });
  };

  @action
  deleteImageFromProjectById = async(projectId, imageId) => {
    await deleteImage(imageId);
    this.projects = this.projects.map(p => {
      if (p.id === projectId) return {...p, images: p.images.filter(i => i.id !== imageId)};
      return p;
    });
  };

  @action
  markImageAsFavorite = async(image) => {
    const updatedImage = {...image, dateAdded: +new Date()};
    await updateImage(updatedImage);
    this.projects = this.projects.map(p => {
      if (p.id === image.projectId) {
        const images = [updatedImage, ...p.images.filter(i => i.id !== updatedImage.id)];
        return {...p, images};
      }
      return p;
    });
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
    const {id, projectId} = counter;
    deleteCounter(id);
    this.projects = this.projects.map(p => {
      if (p.id === projectId) {
        return {...p, counters: p.counters.filter(c => c.id !== id)};
      }
      return p;
    });
  };

  @action updateCounter = (counter, newCount) => {
    const {id, projectId} = counter;
    const updatedCounter = {...counter, value: newCount};
    updateCounter(updatedCounter);
    this.projects = this.projects.map(p => {
      if (p.id === projectId) {
        const counters = p.counters.map(c => {
          if (c.id === id) return updatedCounter;
          return c;
        });
        const updatedProject = {...p, counters};
        this.selectedProject = updatedProject;
        return updatedProject;
      }
      return p;
    });
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

  @action updateSelectedProjectInProjects = () => {
    this.projects = this.projects.map(p => {
      if (p.id === this.selectedProject.id) return this.selectedProject;
      return p;
    });
  };

  @action saveSelectedProject = _.debounce(() => {
    console.log("saving selected project... ");
    updateProject(this.selectedProject);
  }, 800, { trailing: true });

}

export default new ProjectsStore();
