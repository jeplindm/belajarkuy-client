export default class Course {
  constructor(payload) {
    this.id = payload.id;
    this.title = payload.title;
    this.description = payload.description;
    this.subject = payload.subject;
    this.file = payload.file;
    this.urlVideo = payload.urlVideo;
    this.status = payload.status;
  }
}
