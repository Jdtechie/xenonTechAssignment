import "../../Container/container.css";
// import Sidebar from '../Components/Sidebar';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
import { Header, Footer, Sidebar } from "../../Components";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  return (
    <div className="Theme">
      <Header />
      <Container className="container">
        <div className="headingsTitle">
          <h3>Welcome to Dashboard</h3>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
