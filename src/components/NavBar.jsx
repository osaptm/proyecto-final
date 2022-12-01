import { useState } from "react";
import { Nav, Button, Offcanvas, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../pages/cart/Cart";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            E-COMMERCE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <Nav.Link as={Link} to="/login">
                <div className="navbar__links">
                  <i className="fa-regular fa-user"></i>
                  <p>Login</p>
                </div>
              </Nav.Link>

              <Nav.Link as={Link} onClick={handleShow} className="navbar__links">
                <div className="navbar__links">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p>Cart</p>
                </div>
              </Nav.Link>{" "}

              <Nav.Link as={Link} to="/purchases" className="navbar__links">
                <div className="navbar__links">
                  <i className="fa-solid fa-store"></i>
                  <p>Purchases</p>
                </div>
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/purchases" className="navbar__links">
                <div className="navbar__links">
                  <i className="fa-solid fa-arrow-right-from-bracket items__logOut"></i>
                  <p className="items__logOut">Logout.</p>
                </div>
              </Nav.Link>{" "}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleShow={handleShow} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
