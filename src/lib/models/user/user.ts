import { IdentifiableModel } from "../common/identifiable-model";

export interface UserCandidate extends IdentifiableModel {
  username: string;
  avatar: string;
}

export interface UserListItem extends IdentifiableModel {
  username: string;
  avatar: string;
  tasksToPerform: number;
  tasksInProgress: number;
}
