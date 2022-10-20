import React from "react";
import { Header, Footer, Sidebar } from "../Components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./contact.css";
import { useForm } from "react-hook-form";
function Contact() {


  const manageContact = (data, e) => {
    console.log(`FIRST STEP (DISPATCHED)::`, data);
  };
  const {
    register: contactValidation,
    setError,
    formState: { errors: signUpErrors },
    handleSubmit: handleSubmitContact,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  return (
    <>
      {/* <div className="Theme"> */}
      <Header />

      <div className="contactus">
        <h4>Contact Us</h4>
        <Form onSubmit={handleSubmitContact(manageContact)}>
          <Form.Group className="mb-3" Id="formBasicFName">
            <Form.Control
              {...contactValidation("firstName", { required: true })}
              type="text"
placeholder="First Name"
            />
            <p className="errors">
              {signUpErrors.firstName ? "First Name is required" : ""}
            </p>
          </Form.Group>
          <Form.Group className="mb-3" Id="formBasicName">
            <Form.Control
              {...contactValidation("lastName")}
              type="text"
              placeholder="Last Name"
            />
            <p className="errors">
            {signUpErrors.lastName ? "Last Name is required" : ""}
            </p>
          </Form.Group>
          <Form.Group className="mb-3" Id="formBasicEmail">
            <Form.Control
              {...contactValidation("email", { required: true })}
              id="email"
              type="email"
              placeholder="Email"
            />
            <p className="errors">
              {signUpErrors.email ? "Email is required" : ""}
            </p>
          </Form.Group>
<Form.Group className="mb-3" id="exampleForm.ControlTextarea1">
            <Form.Label>Enter Messge</Form.Label>
            <Form.Control
              {...contactValidation("message", { required: true })}
              as="textarea"
              rows={3}
            />
            <p className="errors">
              {signUpErrors.message ? "message is required" : ""}
            </p>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            >
            Submit
          </Button>
        </Form>
      </div>

      <Footer />
      {/* </div> */}
    </>
  );
}

export default Contact;