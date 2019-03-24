import { ProjectLimitedModel } from "../common/project-limited-model";
import { IdentifiableModel } from "../common/identifiable-model";
import { TimeLoggableModel } from "../common/time-loggable-model";
import { ErrorAbleResponse } from "../common/error-able-response";

export interface TeamListItem extends IdentifiableModel, ProjectLimitedModel, TimeLoggableModel, ErrorAbleResponse {
  name: string;
  members: TeamListItemMember[]
}

export interface TeamListItemMember extends IdentifiableModel, TimeLoggableModel {
  username: string;
  isTeamLeader: boolean;
  role: string;
}
