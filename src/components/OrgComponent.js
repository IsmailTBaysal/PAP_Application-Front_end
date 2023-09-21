import React from "react";
import OrgService from "../services/OrgService";
import StateService from "../services/StateService";

class OrgComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      states: {}
    };
  }

  componentDidMount() {
    OrgService.getOrgs().then((response) => {
      StateService.getStates().then((stateResponse) => {
        const states = {};
        stateResponse.data.forEach((state) => {
          states[state.id] = state.state;
        });
        const orgs = response.data.map((org) => ({
          ...org,
          stateName: states[org.stateId]
        }));
        this.setState({ orgs, states });
      });
    });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td className="col text-center text-black fw-bold">HOA</td>
              <td className="col text-center text-black fw-bold">City</td>
              <td className="col text-center text-black fw-bold">State ID</td>
              <td className="col text-center text-black fw-bold">Zip Code</td>
              <td className="col text-center text-black fw-bold">Status</td>
            </tr>
          </thead>
          <tbody>
            {this.state.orgs.map((org) => (
              <tr key={org.id}>
                <td className="col text-center text-black">{org.name}</td>
                <td className="col text-center text-black">{org.city}</td>
                <td className="col text-center text-black">{org.stateName}</td>
                <td className="col text-center text-black">{org.postalCode}</td>
                <td className="col text-center text-black">
                  {org.statusId === 1 ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrgComponent;
