export default class User {
  constructor(payload) {
    this.id = payload.UserId;
    this.email = payload.Email;
    this.phone = payload.NoHP;
    this.role = payload.Role;
  }
}
