export class Usuario {
    constructor(_id= '', username= '', password= '', role= '', createdAt= '', updatedAt= '') {
      this._id = _id;
      this.username = username;
      this.password = password;
      this.role = role;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
    _id: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
