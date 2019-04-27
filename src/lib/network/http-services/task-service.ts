import { Endpoint } from "../api/endpoints-constant";
import { BaseHttpService } from "./common/base-http-service";
import { TaskCreateRequest } from "../../models/task/task";
import { TaskTimelogRequest } from "../../models/task/task-time-log";

class TaskService extends BaseHttpService {

  getAll = (projectId: number, search: string, status: number, expiredOnly: boolean) =>
    this.get(Endpoint.TASKS.baseByProjectId(projectId, search, status, expiredOnly));

  create = (body: TaskCreateRequest) => this.post(Endpoint.TASKS.create, body);

  getPreCreateData = (projectId: number) => this.get(Endpoint.TASKS.createByProjectId(projectId));

  getDetails = (id: number) => this.get(Endpoint.TASKS.details(id));

  getTimeline = (search: string) => this.get(Endpoint.TASKS.timeline(search));

  getTimelog = (id: number) => this.get(Endpoint.TASKS.timelog(id));

  addTimelog = (id: number, body: TaskTimelogRequest) => this.post(Endpoint.TASKS.timelog(id), body);

  setStatus = (taskId: number, statusId: number, userId: number) => {
    console.log(Endpoint.TASKS.status(taskId, statusId, userId));
    return this.get(Endpoint.TASKS.status(taskId, statusId, userId));
  }

}

const taskService = new TaskService();

export { taskService }
