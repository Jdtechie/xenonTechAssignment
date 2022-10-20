import React from "react";
import "../Components/header.css";
import { Sidebar, Header, Footer } from "../Components";
import { Container, Row, Col } from "react-bootstrap";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="container">
        <Row>
          <Col className="col" sm={3} id="sidebar">
            <Sidebar />
          </Col>

          <Col className="col1" sm={9} id="contentbar">
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
