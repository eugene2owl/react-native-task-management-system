import { EnvironmentType, serverUrl } from "./environment-properties";

const env = EnvironmentType.REMOTE;

class Auth {
  static readonly base = serverUrl(env) + '/auth';
  static readonly login = Auth.base + '/login';
}

class Teams {
  static readonly base = serverUrl(env) + '/teams';
  static readonly baseByProjectId = (projectId: number) => Teams.base + '?projectId=' + projectId;

  static readonly create = Teams.base + '/new';
  static readonly createByProjectId = (projectId: number) => Teams.create + '?projectId=' + projectId;
}

class Users {
  static readonly base = serverUrl(env) + '/users';
  static readonly baseByProjectId = (projectId: number) => Users.base + '?projectId=' + projectId;

  static readonly create = Users.base + '/new';
  static readonly createByProjectId = (projectId: number) => Users.create + '?projectId=' + projectId;

  static readonly details = (id: number) => Users.base + '/details/' + id;
}

class Tasks {
  static readonly base = serverUrl(env) + '/tasks';
  static readonly baseByProjectId = (projectId: number, search: string, status: number, expiredOnly: boolean) =>
    `${ Tasks.base }?projectId=${ projectId }&pattern=${ search }&taskStatusId=${ status ? status : '' }&expiredOnly=${expiredOnly ? 'true' : ''}`;

  static readonly create = Tasks.base + '/new';
  static readonly createByProjectId = (projectId: number) => Tasks.create + '?projectId=' + projectId;

  static readonly details = (id: number) => Tasks.base + '/details/' + id;

  static readonly timeline = (search: string) => Tasks.base + '/timeline?pattern=' + search;
  static readonly timelog = (id: number) => Tasks.base + '/timelog/' + id;
  static readonly status = (taskId: number, statusId: number, userId: number) =>
    Tasks.base + '/status/' + taskId + '?taskStatusId=' + statusId + '&userId=' + userId;
}

export class Endpoint {

  static readonly AUTH = Auth;
  static readonly TEAMS = Teams;
  static readonly USERS = Users;
  static readonly TASKS = Tasks;
}
