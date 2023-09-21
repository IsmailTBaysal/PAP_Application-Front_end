import React from "react";
import UserService from "../services/UserService";
import RoleService from "../services/RoleService";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: {}
    };
  }

  componentDidMount() {
    UserService.getUsers().then((response) => {
      RoleService.getRoles().then((roleResponse) => {
        const roles = {};
        roleResponse.data.forEach((role) => {
          roles[role.id] = role.name;
        });
        const users = response.data.map((user) => ({
          ...user,
          middleName: user.middleName ? user.middleName : "N/A",
          roleName: roles[user.roleId]
        }));
        this.setState({ users, roles });
      });
    });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td className="col text-center text-black fw-bold">First Name</td>
              <td className="col text-center text-black fw-bold">
                Middle Name
              </td>
              <td className="col text-center text-black fw-bold">Last Name</td>
              <td className="col text-center text-black fw-bold">Role</td>
              <td className="col text-center text-black fw-bold">Status</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td className="col text-center text-black fw-normal">
                  {user.firstName}
                </td>
                <td className="col text-center text-black">
                  {user.middleName}
                </td>
                <td className="col text-center text-black">{user.lastName}</td>
                <td className="col text-center text-black">{user.roleName}</td>
                <td className="col text-center text-black">
                  {user.statusId === 1 ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserComponent;
