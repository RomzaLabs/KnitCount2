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
  deleteCounter,
  deleteCountersForProject,
  deleteImagesForProject,
  fetchProjects,
  fetchCountersForProject,
  fetchImagesForProject
} from "../store/projectsDbHelper";
import {ProjectStatus} from "../models/ProjectStatus";
import Counter from "../models/Counter";
import Image from "../models/Image";
import Project from "../models/Project";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;
  @observable isProjectModalVisible = false;

  // Computed Props

  // Actions
  @action loadProjects = (projects) => {
    if (this.projects.length) {
      this.projects = [...this.projects, projects];
    } else {
      this.projects = projects;
    }
  };

  @action setSelectedProject = (project) => {
    this.selectedProject = project;
    this.updateSelectedProjectInProjects();
  };

  @action createNewProject = async(project) => {
    const dbResult = await insertProject(project);
    project.id = dbResult.insertId;
    this.setSelectedProject(project);
  };

  @action toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  };

  @action toggleStatusForProject = (projectId) => {
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

  @action deleteProjectById = (projectId) => {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.selectedProject = null;
    deleteProject(projectId);
    deleteCountersForProject(projectId);
    deleteImagesForProject(projectId);
  };

  @action deleteImageFromProjectById = (projectId, imageId) => {
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
      const modifiedDate = +new Date();
      this.selectedProject = {...this.selectedProject, modifiedDate};
      const exists = this.projects.find(p => p.id === this.selectedProject.id);
      if (exists) {
        this.projects = this.projects
          .map(p => {
            if (p.id === this.selectedProject.id) return this.selectedProject;
            return p;
          })
          .sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
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
    return insertImage(projectId, image);
  };

  @action saveCounter = (projectId, counter) => {
    return insertCounter(projectId, counter);
  };

  // Helpers
  loadProjectsFromDB = _.debounce(async(offset, limit) => {
    const dbResult = await fetchProjects(offset, limit);
    const dbProjects = dbResult.rows._array;

    let projects = [];
    for (const dbProject of dbProjects) {
      const projectId = dbProject.id;

      const dbCountersResult = await fetchCountersForProject(projectId);
      const dbCounters = dbCountersResult.rows._array;
      const counters = dbCounters.map(c => new Counter(c.id, c.project_id, c.label, c.value, c.steps_per_count));

      const dbImagesResult = await fetchImagesForProject(projectId);
      const dbImages = dbImagesResult.rows._array;
      const images = dbImages.map(i => new Image(i.id, i.project_id, i.image_uri, i.date_added));

      const project = new Project(
        projectId,
        dbProject.name,
        dbProject.status,
        counters,
        dbProject.notes,
        images,
        dbProject.start_date,
        dbProject.modified_date,
        dbProject.end_date
      );
      projects.push(project);
    }
    this.loadProjects(projects);
  }, 800, { leading: true, trailing: false });

}

export default new ProjectsStore();
