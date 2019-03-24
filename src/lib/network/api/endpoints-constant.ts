import { EnvironmentType, serverUrl } from "./environment-properties";

const env = EnvironmentType.REMOTE;

class Auth {
  static readonly base = serverUrl(env) + '/auth';
  static readonly login = Auth.base + '/login';
}

class Teams {
  static readonly base = (projectId: number) => serverUrl(env) + '/teams?projectId=' + projectId;
  static readonly create = serverUrl(env) + '/teams/new';
}

export class Endpoint {

  static readonly AUTH = Auth;
  static readonly TEAMS = Teams;
}
