import { IdentifiableModel } from "../common/identifiable-model";

export interface UserCandidate extends IdentifiableModel {
  username: string;
  avatar: string;
}
