import React, { useState, useEffect } from "react";
import "./header.css";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Toastify from "./Toastify";
const logo = require("../logo4.png");
// import { useNavigate } from "react-router-dom";

function Header(props) {
  const {
    register: signUpValidation,
    setError,
    formState: { errors: signUpErrors },
    handleSubmit: handleSubmitSignup,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // clearError() need to invoked manually to remove that custom error

  console.log(`ERRORS::`, signUpErrors);
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    setStatus(true);
  };

  // const {
  //   register: register2,
  //   formState: { errors: errors2 },
  //   handleSubmit: handleSubmit2,
  // } = useForm({
  //   mode: 'onBlur',
  // });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRow = useSelector((row) => row);
  console.log(
    "FOURTH STEP (GETTING USER DATA):::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::",
    userRow
  );
  async function manageDashboard() {}

  async function manageLogout() {
    localStorage.clear();
    window.localStorage.clear();
    window.location.href = "/";
  }
  async function manageLogin(event) {
    console.log(`FIRST STEP (DISPATCHED)::`);
    const payload = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const customizePayload = await actions.login(payload);
    console.log(`CUSTOM PAYLOAD::`, customizePayload);
    dispatch(customizePayload);
    loginModelClose();

    setTimeout(() => {
      // if (userRow.user.isLoggedIn) {
      console.log("firse chala ye dekho::::::::::::::::::::::::::::::::");
      navigate("/dashboard");
      // }
    }, 500);
  }

  async function manageSignUp(event) {
    console.log(`FIRST STEP (DISPATCHED)::`, event);
    const payload = {
      firstName: document.getElementById("formBasicFName").value,
      lastName: document.getElementById("formBasicName").value,
      email: document.getElementById("formBasicEmail").value,
      password: document.getElementById("formBasicPassword").value,
      confirmPassword: document.getElementById("formBasicCpassword").value,
    };
    if (payload.password === payload.confirmPassword) {
      const customizePayload = actions.signUp(payload);
      // console.log(payload, 'signup successfully');
      dispatch(customizePayload);
      signupModelClose();
    } else {
      alert("PASSWORD MISMATCHED   !please enter correct password");
    }
  }

  const [toggleLoginModel, settoggleLoginModel] = useState(false);
  const [toggleSignupModel, settoggleSignupModel] = useState(false);
  const [toggleForgotPassword, setForgotPassword] = useState(false);

  const loginModelOpen = () => settoggleLoginModel(true);
  const loginModelClose = () => settoggleLoginModel(false);

  const signupModelOpen = () => settoggleSignupModel(true);
  const signupModelClose = () => settoggleSignupModel(false);

  const forgotPasswordModelOpen = () => {
    setForgotPassword(true);
    settoggleLoginModel(false);
  };

  // const navigate = useNavigate();
  const navigateContactUs = () => {
    console.log("AAAA gyaaaaa::::::");
    navigate("/contactUs");
  };
  const forgotPasswordModelClose = () => setForgotPassword(false);

  return (
    <div className="headerOuter">
      <div className="headerLeft">
        <div className="logo">
          <Link to="/">
            <img src={logo} width="100%" height="100%"></img>
          </Link>
        </div>
      </div>
      <div className="headerRight">
        {userRow?.user.isLoggedIn ? (
          <p className="loginSignup">
            <a onClick={navigateContactUs}>Contact Us</a> <span>|</span>
            <a onClick={manageDashboard}>Dashboard</a> <span>|</span>
            <a onClick={manageLogout}>Logout</a>
          </p>
        ) : (
          <p className="loginSignup">
            <a onClick={navigateContactUs}>Contact Us</a> <span>|</span>
            <a onClick={loginModelOpen}>Login</a> <span>|</span>
            <a onClick={signupModelOpen}>SignUp</a>
          </p>
        )}
      </div>
      {/* <Toastify message="welcome to dashboard" /> */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleLoginModel}
        onHide={loginModelClose}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control id="email" type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
              />
              <div className="forgotPassword">
                <a onClick={forgotPasswordModelOpen}>Forgot Password?</a>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="button"
              onClick={(e) => {
                manageLogin(e);
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleSignupModel}
        onHide={signupModelClose}
      >
        <Form onSubmit={handleSubmitSignup(manageSignUp)}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicFName">
              <Form.Control
                {...signUpValidation("firstName", { required: true })}
                type="text"
                placeholder="First Name"
              />
              <p className="errors">
                {signUpErrors.firstName ? "First Name is required" : ""}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                {...signUpValidation("lastName")}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                {...signUpValidation("email")}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                {...signUpValidation("password")}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCpassword">
              <Form.Control
                {...signUpValidation("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              // type="submit"
              type="button"
              onClick={(e) => {
                manageSignUp(e);
              }}
            >
              SignUp
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleForgotPassword}
        onHide={forgotPasswordModelClose}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Header;
