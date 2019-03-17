export enum EnvironmentType {
  LOCAL,
  REMOTE
}

export enum ServerUrl {
  LOCAL = 'http://127.0.0.1:3000/api',
  REMOTE = 'https://eugene-api.herokuapp.com/api'
}

const serverUrl = (environmentType: EnvironmentType) =>
  environmentType === EnvironmentType.REMOTE ?
    ServerUrl.REMOTE : ServerUrl.LOCAL;

export { serverUrl }
