import { IdentifiableModel } from "../common/identifiable-model";
import { Lookup } from "../common/Lookup";
import { ErrorAbleResponse } from "../common/error-able-response";
import { ProjectLimitedModel } from "../common/project-limited-model";

export interface UserCandidate extends IdentifiableModel {
  username: string;
  avatar: string;
}

export interface UserPreCreateData extends ErrorAbleResponse {
  teams: Lookup[];
  roles: Lookup[];
}

export interface UserCreateRequest extends ProjectLimitedModel {
  username: string;
  roleId: number;
  teamId: number;
  password: string;
}

export interface UserListItem extends IdentifiableModel, ErrorAbleResponse {
  username: string;
  avatar: string;
  tasksToPerform: number;
  tasksInProgress: number;
}

export interface UserDetails extends IdentifiableModel, ErrorAbleResponse {
  username: string;
  teams: string[];
  role: string;
  timeLogged: string;
}
