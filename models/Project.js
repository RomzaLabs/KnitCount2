import {ProjectStatus} from "./ProjectStatus";

class Project {
  constructor(
    id,
    name,
    status = ProjectStatus.WIP,
    counters = [],
    notes = "",
    imageUris = [],
    startDate = new Date(),
    modifiedDate = null,
    endDate = null
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.counters = counters;
    this.notes = notes;
    this.imageUris = imageUris;
    this.startDate = startDate;
    this.modifiedDate = modifiedDate;
    this.endDate = endDate;
  }
}

export default Project;
