import React, { useState } from "react";
import Homepage from "./Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault(); // prevent form submission
    // TODO: Perform login logic here
    if (isAuthenticated) {
      setLoggedIn(true);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div
              className="col-8 bg-secondary border border-2 border-dark"
              style={{ "--bs-bg-opacity": ".5" }}
            >
              <h1 className="display-6 text-center text-black">
                Property Assessment Pro
              </h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 bg-white border border-top-0 border-bottom-0 border-2 border-dark">
              <form onSubmit={handleLogin}>
                <div className="row">
                  <div className="input-group col justify-content-center ">
                    <div className="m-5 mb-2">
                      <h3 className="text-black fw-semibold ">
                        Welcome to PAP.
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group justify-content-center ">
                    <div className="mb-4 mx-5 "></div>
                  </div>
                </div>
                {!isAuthenticated && (
                  <div className="d-grid gap-2 col-4 mx-auto mb-5">
                    <button
                      onClick={loginWithRedirect}
                      type="submit"
                      className="btn btn-primary fw-semibold font"
                    >
                      LOGIN
                    </button>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="d-grid gap-2 col-4 mx-auto mb-5">
                    <button
                      type="submit"
                      className="btn btn-primary fw-semibold font"
                    >
                      CONTINUE TO HOME
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 bg-white border border-2 border-dark">
              <h2 className=" text-start fs-6 fw-light  ">
                Copyright © 2023 PAP. All rights reserved.
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* <h3 className=" text-center">
              User is {isAuthenticated ? "Logged in" : "Not Logged in"}
            </h3>
            {isAuthenticated && (
              <pre style={{ textAlign: "center" }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            )} */}
          </div>
        </div>
      ) : (
        <Homepage />
      )}
    </>
  );
}

export default Login;
