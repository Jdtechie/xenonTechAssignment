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

    </div>
    
  );
}

export default Theme;
