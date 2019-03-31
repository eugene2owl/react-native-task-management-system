import { Endpoint } from "../api/endpoints-constant";
import { BaseHttpService } from "./common/base-http-service";
import { TaskCreateRequest } from "../../models/task/task";

class TaskService extends BaseHttpService {

  getAll = (projectId: number, search: string, status: number, expiredOnly: boolean) =>
    this.get(Endpoint.TASKS.baseByProjectId(projectId, search, status, expiredOnly));

  create = (createRequest: TaskCreateRequest) => this.post(Endpoint.TASKS.create, createRequest);

  getPreCreateData = (projectId: number) => this.get(Endpoint.TASKS.createByProjectId(projectId));

  getDetails = (id: number) => this.get(Endpoint.TASKS.details(id));
}

const taskService = new TaskService();

export { taskService }
