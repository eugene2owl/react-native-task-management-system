import { Endpoint } from "../api/endpoints-constant";
import { BaseHttpService } from "./common/base-http-service";
import { UserCreateRequest } from "../../models/user/user";

class UserService extends BaseHttpService {

  getAll = (projectId: number) => this.get(Endpoint.USERS.baseByProjectId(projectId));

  create = (createRequest: UserCreateRequest) => this.post(Endpoint.USERS.create, createRequest);

  getPreCreateData = (projectId: number) => this.get(Endpoint.USERS.createByProjectId(projectId));

  getDetails = (id: number) => this.get(Endpoint.USERS.details(id));
}

const userService = new UserService();

export { userService }
