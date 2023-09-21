import axios from "axios";

const ROLES_REST_API_URL = "http://localhost:8080/api/v1/role/all";

class RoleService {
  getRoles() {
    return axios.get(ROLES_REST_API_URL);
  }
}

export default new RoleService();
