import _ from "lodash";
import { observable, action } from "mobx";
import {toJS} from "mobx";
import * as Sentry from 'sentry-expo';

import * as DB from "./projectsDbHelper";
import {ProjectStatus} from "../models/ProjectStatus";
import Counter from "../models/Counter";
import Image from "../models/Image";
import Project from "../models/Project";

class ProjectsStore {

  // Observable Props
  @observable projects = [];
  @observable selectedProject = null;
  @observable isProjectModalVisible = false;
  @observable isTutorialModalVisible = false;

  // Computed Props

  // Actions
  @action loadProjects = (projects) => {
    if (this.projects.length) {
      this.projects = this.projects.concat(projects);
    } else {
      this.projects = projects;
    }
  };

  @action setSelectedProject = (project) => {
    this.selectedProject = project;
    this.updateSelectedProjectInProjects();
  };

  @action createNewProject = async(project) => {
    try {
      const dbResult = await DB.insertProject(project);
      project.id = dbResult.insertId;
      this.setSelectedProject(project);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action toggleProjectModalVisible = () => {
    this.isProjectModalVisible = !this.isProjectModalVisible;
  };

  @action toggleTutorialModalVisible = () => {
    this.isTutorialModalVisible = !this.isTutorialModalVisible;
  };

  @action toggleStatusForProject = (projectId) => {
    try {
      this.projects = this.projects.map(p => {
        if (p.id === projectId) {
          const project = {
            ...p,
            status: p.status === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP
          };
          this.selectedProject = project;
          updateProject(project);
          return project;
        }
        return p;
      });
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action deleteProjectById = (projectId) => {
    try {
      this.projects = this.projects.filter(p => p.id !== projectId);
      this.selectedProject = null;
      DB.deleteProject(projectId);
      DB.deleteCountersForProject(projectId);
      DB.deleteImagesForProject(projectId);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action deleteImageFromProjectById = (projectId, imageId) => {
    try {
      DB.deleteImage(imageId);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action updateCounterLabel = (counter, newLabel) => {
    try {
      const updatedCounter = {...counter, label: newLabel};
      DB.updateCounter(updatedCounter);
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
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action deleteCounter = (counter) => {
    try {
      DB.deleteCounter(counter.id);
      const newCounters = this.selectedProject.counters.filter(c => c.id !== counter.id);
      this.setCountersForSelectedProject(newCounters);
    } catch (e) {
      Sentry.captureException(e);
    }
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
    try {
      await DB.updateProject(toJS(this.selectedProject));
      const counters = toJS(this.selectedProject.counters);
      for (const c of counters) {
        await DB.updateCounter(c);
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  }, 800, { trailing: true });

  @action saveImage = (projectId, image) => {
    try {
      return DB.insertImage(projectId, image);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  @action saveCounter = (projectId, counter) => {
    try {
      return DB.insertCounter(projectId, counter);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  // Helpers
  loadProjectsFromDB = async(offset, limit) => {
    try {
      const dbResult = await DB.fetchProjects(offset, limit);
      const dbProjects = dbResult.rows._array;

      let projects = [];
      for (const dbProject of dbProjects) {
        const projectId = dbProject.id;

        const dbCountersResult = await DB.fetchCountersForProject(projectId);
        const dbCounters = dbCountersResult.rows._array;
        const counters = dbCounters.map(c => new Counter(c.id, c.project_id, c.label, c.value, c.steps_per_count));

        const dbImagesResult = await DB.fetchImagesForProject(projectId);
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
    } catch (e) {
      Sentry.captureException(e);
    }
  };

}

export default new ProjectsStore();
