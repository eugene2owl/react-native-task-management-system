import { Login } from "../../models/auth/login";
import { Endpoint } from "../api/endpoints-constant";
import { BaseHttpService } from "./common/base-http-service";

class AuthService extends BaseHttpService {

  login = (loginRequest: Login) => this.post(Endpoint.AUTH.login, loginRequest);
}

const authService = new AuthService();

export { authService }
