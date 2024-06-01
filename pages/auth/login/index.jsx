import React from "react";
import LoginForm from "@/components/Auth/Login";
const Login = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="p-3 bg-shadow df-radius">
            <h6>Login to your account</h6>
            <hr />
            <LoginForm from="page" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
