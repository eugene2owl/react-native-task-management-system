import { ProjectLimitedModel } from "../common/project-limited-model";
import { IdentifiableModel } from "../common/identifiable-model";
import { TimeLoggableModel } from "../common/time-loggable-model";
import { TeamListItemMember } from "./team-list";
import { ErrorAbleResponse } from "../common/error-able-response";

export interface TeamCreateRequest extends ProjectLimitedModel {
  name: string;
  leader: number;
  members: number[];
}

export interface TeamCreateResponse extends IdentifiableModel, TimeLoggableModel, ProjectLimitedModel, ErrorAbleResponse {
  name: string;
  members: TeamListItemMember[];
}
