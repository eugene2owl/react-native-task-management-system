import { Endpoint } from "../api/endpoints-constant";
import { BaseHttpService } from "./common/base-http-service";
import { TeamCreateRequest } from "../../models/team/team-create";

class TeamService extends BaseHttpService {

  getAll = (projectId: number) => this.get(Endpoint.TEAMS.baseByProjectId(projectId));

  create = (createRequest: TeamCreateRequest) => this.post(Endpoint.TEAMS.create, createRequest);

  getPreCreateData = (projectId: number) => this.get(Endpoint.TEAMS.createByProjectId(projectId));
}

const teamService = new TeamService();

export { teamService }
