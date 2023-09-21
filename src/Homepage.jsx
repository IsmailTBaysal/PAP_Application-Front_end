import React, { useState } from "react";
import Login from "./Login";
import OrganizationList from "./Organization";
import UserList from "./UserList";
import { useAuth0 } from "@auth0/auth0-react";
import SimpleMapComponent from "./components/SimpleMapComponent";

function Homepage() {
  const [inHome, setHome] = useState(true);
  const [isUser, setUser] = useState(false);
  const [isOrganization, setOrganization] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();

  const moveToUser = () => {
    setUser(true);
  };

  const moveToOrganization = () => {
    setOrganization(true);
  };

  const home = () => {
    return (
      <div className="container mt-5">
        <div className="row align-items-center">
          <div
            className="col-3 bg-secondary border border-1 border-dark border-bottom-0 text-center align-self-start pb-2 pt-2"
            style={{ "--bs-bg-opacity": ".5" }}
          >
            <a className="navbar-brand" href="#Goes back to the Homepage">
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
                <h1 className="display-6 text-center text-black">
                  Property Assessment Pro
                </h1>
              </div>
              <div className="col-2 text-black">
                {isAuthenticated && (user["given_name"] || user["nickname"])}
              </div>
              <div className="col-1">
                <button
                  className="btn btn-primary btn-rou"
                  href="#Login Page"
                  role="button"
                  type="button"
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
            {/* <span className="userRole text-black">#userRole</span>
              <div className="row ">
                <a href="#" className="link-dark px-5">
                  List User
                </a>
                <a href="#" className="link-dark px-5 text-nowrap">
                  List Organization
                </a>
              </div> */}
            <div className="row my-0">
              <span className="userRole text-black">Administration</span>
              <div className="row ">
                <a href="#" className="link-dark px-5" onClick={moveToUser}>
                  List User
                </a>
                <a
                  href="#"
                  className="link-dark px-5 text-nowrap"
                  onClick={moveToOrganization}
                >
                  {" "}
                  List Organization
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-9 border-end-1"
            style={{
              height: "50vh",
              marginTop: "-2.2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "0px",
              paddingRight: "0px",
              borderRight: "solid 1px"
            }}
          >
            <SimpleMapComponent />
          </div>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-3 bg-secondary border border-1 border-dark border-top-0"
            style={{ "--bs-bg-opacity": ".5" }}
          ></div>
          <div className="col-9 bg-white border border-1 border-dark border-start-0">
            <h2 className="text-center fs-6 fw-light">
              Copyright © 2023 PAP. All rights reserved.
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isUser ? (
        <UserList />
      ) : isOrganization ? (
        <OrganizationList />
      ) : inHome ? (
        home()
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Homepage;
