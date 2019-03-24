import { Endpoint } from "../../api/endpoints-constant";
import { BaseHttpService } from "../common/base-http-service";
import { TeamCreateRequest } from "../../../models/team/team-create";

class UserService extends BaseHttpService {

  getAll = (projectId: number) => this.get(Endpoint.USERS.baseByProjectId(projectId));
}

const userService = new UserService();

export { userService }
