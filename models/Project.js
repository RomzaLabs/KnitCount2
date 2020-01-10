class Project {
  constructor(id, name, counters = [], notes = "", imageUris = [], startDate = new Date(), modifiedDate = null, endDate = null) {
    this.id = id;
    this.name = name;
    this.counters = counters;
    this.notes = notes;
    this.imageUris = imageUris;
    this.startDate = startDate;
    this.modifiedDate = modifiedDate;
    this.endDate = endDate;
  }
}

export default Project;
