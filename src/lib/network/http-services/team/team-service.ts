import { Endpoint } from "../../api/endpoints-constant";
import { BaseHttpService } from "../common/base-http-service";

class TeamService extends BaseHttpService {

  getAll = (projectId: number) => this.get(Endpoint.TEAMS.base(projectId))
}

const teamService = new TeamService();

export { teamService }
