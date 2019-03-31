import { ProjectLimitedModel } from "../common/project-limited-model";
import { IdentifiableModel } from "../common/identifiable-model";
import { Lookup } from "../common/Lookup";
import { ErrorAbleResponse } from "../common/error-able-response";

export interface TaskCreateRequest extends ProjectLimitedModel {
  name: string;
  description?: string;
  deadline?: string;
  parent?: number;
  createdBy: number;
  assignedTo?: number;
}

export interface TaskPreCreateData extends ErrorAbleResponse {
  executors: Lookup[];
  parents: Lookup[];
}

export interface TaskDetails extends IdentifiableModel, ErrorAbleResponse {
  name: string;
  description?: string;
  dateCreated: string;
  timeCreated: string;
  status: string;
  deadline?: string;
  parent?: Lookup;
  children?: Lookup[];
  createdBy: Lookup;
  assignedBy?: Lookup;
  assignedTo?: Lookup;
}
