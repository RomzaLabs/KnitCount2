class Image {
  constructor(id, projectId, imageUri) {
    this.id = id;
    this.projectId = projectId;
    this.imageUri = imageUri;
    this.dateAdded = +new Date();
  }
}

export default Image;
