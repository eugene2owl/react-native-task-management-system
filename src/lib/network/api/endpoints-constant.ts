import { EnvironmentType, serverUrl } from "./environment-properties";

const env = EnvironmentType.REMOTE;

class Auth {
  static readonly base = serverUrl(env) + '/auth';
  static readonly login = Auth.base + '/login';
}

export class Endpoint {

  // Auth
  static readonly AUTH = Auth;
}
