import React, { useState } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import OrganizationList from "./Organization";
import UserList from "./UserList";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import moment from "moment";
import CountryComponent from "./components/CountryComponent";
import StateComponent from "./components/StateComponent";

function AddOrganization() {
  const [isHome, setHome] = useState(false);
  const [isUser, setUser] = useState(false);
  const [isOrganization, setOrganization] = useState(false);
  const [isAddOrg, setAddOrg] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();
  var message = "{Message}"; // this var is to wrap the Message work with curly braces

  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  const moveToHome = () => {
    setAddOrg(false);
    setHome(true);
    setOrganization(false);
    setUser(false);
  };

  const moveToOrganization = () => {
    setOrganization(true);
    setUser(false);
    setHome(false);
    setAddOrg(false);
  };

  const logOff = () => {
    setAddOrg(false);
    setHome(false);
    setOrganization(false);
    setUser(false);
    setLogin(true);
  };

  const moveToUser = () => {
    setAddOrg(false);
    setHome(false);
    setOrganization(false);
    setUser(true);
  };

  const handleCountryChange = (id) => {
    setCountryId(id);
  };

  const handleStateChange = (id) => {
    setStateId(id);
  };

  const addOrganization = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Get current date and time
      const currentDate = new Date();

      // Format the date and time using moment.js
      const formattedDate = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

      const form = document.getElementById("addOrganization");
      const formData = new FormData(form);

      formData.append("name", event.target.name.value);
      formData.append("address1", event.target.address1.value);
      formData.append("address2", event.target.address2.value);
      formData.append("address3", event.target.address3.value);
      formData.append("city", event.target.city.value);
      formData.append("postalCode", event.target.postalCode.value);
      formData.append("firstName", event.target.firstName.value);
      formData.append("middleName", event.target.middleName.value);
      formData.append("lastName", event.target.lastName.value);
      formData.append("mobilePhone", event.target.mobilePhone.value);
      formData.append("workPhone", event.target.workPhone.value);
      formData.append("homePhone", event.target.homePhone.value);
      formData.append("email", event.target.email.value);
      formData.append("countryId", countryId);
      formData.append("stateId", stateId);
      formData.append("createdOn", formattedDate);
      formData.append("modifiedOn", formattedDate);
      formData.append("createdBy", 1);
      formData.append("modifiedBy", 1);
      formData.append("rowVersion", 1);
      formData.append("statusId", 1);

      const formDataObj = Object.fromEntries(formData);
      const formDataJson = JSON.stringify(formDataObj);

      axios.post("http://localhost:8080/api/v1/org/add", formDataJson, {
        headers: { "Content-Type": "application/json" }
      });

      // call API to add organization
      // Note: Once the API is added - we should add onClick={handleSubmit} within the (save) button

      // if successful, redirect to organization list page
      const isFormSubmittedSuccessfully = true; // replace with your API call to add organization
      if (isFormSubmittedSuccessfully) {
        alert("Information submitted successfully!");

        setAddOrg(false);
        setOrganization(true);
        // window.location.href = "/organization-list"; // replace with your organization list page URL
      } else {
        // if error, display message and set focus on Name textbox
        const nameInput = document.getElementById("name");
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
                <h1
                  className="display-6 text-center text-black text-nowrap"
                  style={{ fontSize: "1.5rem" }}
                >
                  Property Assessment Pro (PAP) - Add Organization
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
            className="col-3 bg-secondary border border-1 border-dark border-top-0 border-bottom-1"
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
            style={{ marginTop: "-2.5rem" }}
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
              onSubmit={handleSubmit}
              className="d-inline"
              id="addOrganization"
              method="get"
              action="./somewhere"
            >
              <div className="row ">
                <div className="col">
                  <label htmlFor="Name" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Name
                  </label>
                  <input
                    autocomplete="off"
                    type="text"
                    className="form-control"
                    aria-label="Organization Name"
                    id="name"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="address1" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    Address 1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    className="form-control"
                    aria-label="Address 1"
                    required
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label htmlFor="address2" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Address 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    className="form-control"
                    aria-label="Address 2"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="address3" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Address 3
                  </label>
                  <input
                    type="text"
                    id="address3"
                    className="form-control"
                    aria-label="Address 3"
                    required
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="state" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>State
                  </label>
                  <StateComponent onStateChange={handleStateChange} />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label htmlFor="workCode" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className="form-control"
                    aria-label="PostalCode"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="workPhone" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="First name"
                    id="firstName"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="homeCode" className="form-label fw-bold">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Middle name"
                    id="middleName"
                  />
                </div>
                <div className="col">
                  <label htmlFor="workPhone" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Last name"
                    id="lastName"
                    required
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col">
                  <label htmlFor="CountryCode" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>Country Code
                  </label>
                  <CountryComponent onCountryChange={handleCountryChange} />
                </div>

                <div className="col">
                  <label htmlFor="mobilePhone" className="form-label fw-bold">
                    <span className="text-danger fw-bold">*</span>
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="mobilePhone"
                    className="form-control"
                    aria-label="Mobile Phone"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="workPhone" className="form-label fw-bold">
                    Work Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="workPhone"
                    className="form-control"
                    aria-label="Mobile Phone"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="HomePhone" className="form-label fw-bold">
                    Home Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="homePhone"
                    className="form-control"
                    aria-label="Home Phone"
                  />
                </div>
              </div>
              {/* <div className="row">
                <div className="col">
                  <label
                    htmlFor="homePhoneCountryCode"
                    className="form-label fw-bold"
                  >
                    {" "}
                    Home Phone Country Code
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
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
                className="row border border-dark border-1 border-start-0 border-end-0"
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
                    onClick={moveToOrganization}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            <div className="row justify-content-center">
              <div className="col-12 bg-white border border-1 border-dark border-top-0 border-start-0 border-end-0">
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
      {isOrganization && <OrganizationList />}
      {isUser && <UserList />}
      {isAddOrg && addOrganization()}
    </>
  );
}

export default AddOrganization;
