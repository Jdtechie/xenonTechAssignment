import React, { useEffect, useState } from "react";
import "../Container/container.css";
import { Header } from "../Components";
import { Row, Col, Button, Card } from "react-bootstrap";
import Layout from "./Layout";

function Theme() {
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    setStatus(true);
  };
  return (
    <div className="Theme">
 <Header status={status} />      
       <Button variant="primary" onClick={changeStatus}>Primary</Button>{' '}

    </div>
    
  );
}

export default Theme;
