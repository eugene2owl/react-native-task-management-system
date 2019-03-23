import { ProjectLimitedModel } from "../common/project-limited-model";
import { IdentifiableModel } from "../common/identifiable-model";
import { TimeLoggableModel } from "./time-loggable-model";

export interface TeamListItem extends IdentifiableModel, ProjectLimitedModel, TimeLoggableModel {
  name: string;
  members: TeamListItemMember[]
}

interface TeamListItemMember extends IdentifiableModel, TimeLoggableModel {
  username: string;
  isTeamLeader: boolean;
  role: string;
}
