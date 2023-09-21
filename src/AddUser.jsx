import React, { useState } from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import UserList from "./UserList";
import Organization from "./Organization";
import { useAuth0 } from "@auth0/auth0-react";
import CountryComponent from "./components/CountryComponent";
import RoleComponent from "./components/RoleComponent";
import moment from "moment";
import axios from "axios";

function AddUser() {
  const [isHome, setHome] = useState(false);
  const [isUser, setUser] = useState(false);
  const [isOrganization, setOrganization] = useState(false);
  const [isAddUser, setAdd] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();

  var message = "{Message}"; // this var is to wrap the Message work with curly braces

  const [countryId, setCountryId] = useState("");
  const [roleId, setRoleId] = useState("");

  const handleCountryChange = (id) => {
    setCountryId(id);
  };

  const handleRoleChange = (id) => {
    setRoleId(id);
  };

  const moveToHome = () => {
    setAdd(false);
    setOrganization(false);
    setUser(false);
    setHome(true);
    setLogin(false);
  };

  const moveToOrganization = () => {
    setOrganization(true);
    setUser(false);
    setHome(false);
    setAdd(false);
  };

  const moveToUser = () => {
    setAdd(false);
    setHome(false);
    setOrganization(false);
    setUser(true);
  };

  const logOff = () => {
    setAdd(false);
    setOrganization(false);
    setUser(false);
    setHome(false);
    setLogin(true);
  };

  const addUser = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Get current date and time
      const currentDate = new Date();

      // Format the date and time using moment.js
      const formattedDate = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

      const form = document.getElementById("addUser");
      const formData = new FormData(form);
      formData.append("firstName", event.target.firstName.value);
      formData.append("middleName", event.target.middleName.value);
      formData.append("lastName", event.target.lastName.value);
      formData.append("mobilePhone", event.target.mobilePhone.value);
      formData.append("workPhone", event.target.workPhone.value);
      formData.append("homePhone", event.target.homePhone.value);
      formData.append("countryId", countryId);
      formData.append("roleId", roleId);
      formData.append("email", event.target.email.value);
      formData.append("password", "test");
      formData.append("createdOn", formattedDate);
      formData.append("modifiedOn", formattedDate);
      formData.append("createdBy", 1);
      formData.append("modifiedBy", 1);
      formData.append("rowVersion", 1);
      formData.append("statusId", 1);

      const formDataObj = Object.fromEntries(formData);
      const formDataJson = JSON.stringify(formDataObj);

      axios.post("http://localhost:8080/api/v1/user/add", formDataJson, {
        headers: { "Content-Type": "application/json" }
      });

      // call API to add organization
      // Note: Once the API is added - we should add onClick={handleSubmit} within the (save) button

      // if successful, redirect to organization list page
      const isFormSubmittedSuccessfully = true; // replace with your API call to add organization
      if (isFormSubmittedSuccessfully) {
        alert("Information submitted successfully!");

        setAdd(false);
        setUser(true);
        // window.location.href = "/user-list"; // replace with your user list page URL
      } else {
        // if error, display message and set focus on Name textbox
        const nameInput = document.getElementById("firstName");
        nameInput.focus();
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
      }
    };

    return (
      <div className="container mt-5">
        <div className="row align-items-center">
          <div
            className="col-3 bg-secondary border border-1 border-dark border-bottom-0 text-center align-self-start pt-2"
            style={{ "--bs-bg-opacity": ".5" }}
          >
            <a
              className="navbar-brand"
              href="#Goes back to the Homepage"
              onClick={moveToHome}
            >
              <img
                src="https://i.ibb.co/P9hkZY5/mediamodifier-cropped-image.png"
                alt="logo"
                width="125px"
                height="75px"
              />
            </a>
          </div>

          <div
            className="col-9 bg-secondary border border-1 border-dark border-start-0 align-self-start"
            style={{ "--bs-bg-opacity": ".5" }}
          >
            <div className="row align-items-center">
              <div className="col-9">
                <h1 className="display-6 text-center text-black text-nowrap">
                  Property Assessment Pro (PAP) - Add User
                </h1>
              </div>
              <div className="col-2 text-black">
                {isAuthenticated && (user["given_name"] || user["nickname"])}
              </div>
              <div className="col-1">
                <button
                  className="btn btn-primary btn-round"
                  href="#LoginPage"
                  role="button"
                  value="button"
                  style={{
                    "--bs-btn-padding-y": ".5rem",
                    "--bs-btn-padding-x": ".5rem",
                    "--bs-btn-font-size": "1rem"
                  }}
                  onClick={logout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    fill="currentColor"
                    className="bi bi-power"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-3 bg-secondary border border-1 border-dark border-top-0 border-bottom-0"
            style={{ "--bs-bg-opacity": ".5" }}
          >
            <div className="row my-2">
              <span className="userRole text-black">Administration</span>
              <a href="#" className="link-dark px-5" onClick={moveToUser}>
                List User
              </a>
              <a
                href="#"
                className="link-dark px-5 text-nowrap"
                onClick={moveToOrganization}
              >
                List Organization
              </a>
            </div>
          </div>
          <div
            className="col-9 border-end border-1 border-dark"
            style={{ marginTop: "-1.7rem" }}
          >
            <div className="row mt-2 border-bottom border-dark">
              <p className="text-danger">{message}</p>
            </div>
            <div class="row mt-1">
              <p>
                <span class="text-danger fw-bold">* </span>Indicates Required
              </p>
            </div>
            <form
              className="d-inline"
              id="addUser"
              method="get"
              action="./somewhere"
              onSubmit={handleSubmit}
            >
              <div className="row ">
                <div className="col">
                  <label htmlFor="firstName" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="First name"
                    id="firstName"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="middleName" className="form-label fw-bold">
                    Middle name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    className="form-control"
                    aria-label="Middle name"
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label htmlFor="lastName" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    aria-label="Last name"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="role" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Role
                  </label>
                  <RoleComponent onRoleChange={handleRoleChange} />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label htmlFor="mobileCode" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    Country Code
                  </label>
                  <CountryComponent onCountryChange={handleCountryChange} />
                </div>
                <div className="col">
                  <label htmlFor="mobilePhone" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Mobile Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="mobilePhone"
                    className="form-control"
                    aria-label="Last name"
                    required
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label htmlFor="workCode" className="form-label fw-bold">
                    Work Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="workPhone"
                    className="form-control"
                    aria-label="workPhone"
                  />
                </div>

                <div className="col">
                  <label htmlFor="workPhone" className="form-label fw-bold">
                    Home Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="homePhone"
                    className="form-control"
                    aria-label="Last name"
                  />
                </div>
              </div>

              {/* <div className="row">
                <div className="col">
                  <label htmlFor="homeCode" className="form-label fw-bold">
                    {" "}
                    Home Phone Country Code
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="HomePhoneCountryCode"
                    required
                  >
                    <option selected></option>
                    <option value="1">option 1</option>
                    <option value="2">option 2</option>
                    <option value="3">option 3</option>
                  </select>
                </div>

               
              </div> */}

              <div className="row my-2 mb-5 ">
                <div className="col-6">
                  <label htmlFor="email" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    id="email"
                    className="form-control"
                    aria-label="Email Address"
                    required
                  />
                </div>
              </div>
              <div
                className="row border border-dark border-1 border-start-0 border-end-0 "
                style={{ backgroundColor: "lightgray" }}
              >
                <div className="col-12">
                  <button
                    className="btn btn-primary mx-1 mt-1 mb-2"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-primary mx-1 mt-1 mb-2"
                    onClick={moveToUser}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            <div className="row justify-content-center">
              <div className="col-12 bg-white border border-1 border-top-0 border-dark border-start-0 border-end-0">
                <h2 className="text-center fs-6 fw-light">
                  Copyright © 2023 PAP. All rights reserved.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLogin && <Login />}
      {isHome && <Homepage />}
      {isOrganization && <Organization />}
      {isUser && <UserList />}
      {isAddUser && addUser()}
    </>
  );
}

export default AddUser;
