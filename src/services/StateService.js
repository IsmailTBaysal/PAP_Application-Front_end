import axios from "axios";

const STATES_REST_API_URL = "http://localhost:8080/api/v1/state/all";

class StateService {
  getStates() {
    return axios.get(STATES_REST_API_URL);
  }
}

export default new StateService();
