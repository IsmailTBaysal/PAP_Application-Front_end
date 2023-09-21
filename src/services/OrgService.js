import axios from "axios";

const ORG_REST_API_URL = "http://localhost:8080/api/v1/org/all";

class OrgService {
  getOrgs() {
    return axios.get(ORG_REST_API_URL);
  }
}

export default new OrgService();
