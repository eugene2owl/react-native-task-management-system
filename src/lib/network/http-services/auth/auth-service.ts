import { LoginRequest } from "../../../models/auth/login-request";
import { Endpoint } from "../../api/endpoints-constant";
import { BaseHttpService } from "../common/base-http-service";

class AuthService extends BaseHttpService {

  login = (loginRequest: LoginRequest) => this.post(Endpoint.AUTH.login, loginRequest);
}

const authService = new AuthService();

export { authService }
