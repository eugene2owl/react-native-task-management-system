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

export class Endpoint {

  static readonly AUTH = Auth;
  static readonly TEAMS = Teams;
  static readonly USERS = Users;
}
