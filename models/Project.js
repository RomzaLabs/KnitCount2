import {ProjectStatus} from "./ProjectStatus";

class Project {
  constructor(
    id = 1,
    name = 'New Project',
    status = ProjectStatus.WIP,
    counters = [],
    notes = "",
    images = [],
    startDate = new Date(),
    modifiedDate = new Date(),
    endDate = null
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.counters = counters;
    this.notes = notes;
    this.images = images;
    this.startDate = startDate;
    this.modifiedDate = modifiedDate;
    this.endDate = endDate;
  }

}

export default Project;
