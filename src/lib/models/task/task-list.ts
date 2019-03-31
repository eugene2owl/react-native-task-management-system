import { IdentifiableModel } from "../common/identifiable-model";
import { Lookup } from "../common/Lookup";

export interface TaskListItem extends IdentifiableModel {
  name: string;
  status: string;
  assignedTo: Lookup;
  deadline: string;
}
