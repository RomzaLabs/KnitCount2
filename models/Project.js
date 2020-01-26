import {ProjectStatus} from "./ProjectStatus";

class Project {
  constructor(
    id = this.uuidv4(),
    name = 'New Project',
    status = ProjectStatus.WIP,
    counters = [],
    notes = "",
    imageUris = [],
    startDate = new Date(),
    modifiedDate = new Date(),
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

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

export default Project;
