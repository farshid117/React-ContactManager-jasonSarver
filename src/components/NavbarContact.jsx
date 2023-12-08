import { useLocation } from "react-router-dom";

import { SearchContact } from ".";

import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas, } from "react-bootstrap";

import "./Navbar.css"

const NavbarContact = () => {
  const location = useLocation();
  let expand = "lg"
  return (
    <div>
    {/* 
      <nav className='navbar navbar-expand-md fixed-top navbar-light bg-light shadow-lg '>
        <div className='container-md'>
          <div className='row justify-content-between gy-3 align-items-center w-100'>
            <div className='col-12 col-md-8'>
              <img
                src={require("../assets/img/logo2.png")}
                className='img-fluid'
                alt='logo'
                style={{ width: 100, height: 50, marginLeft: 20, display: "inline-block" }}
              />
              <span className='' style={{ color: "#000" }}>
                سامانه صدور آنلاین{" "}
                <span
                  className=' '
                  style={{
                    marginRight: "",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}>
                  بیمه‌نامه
                </span>
              </span>

            </div>

            {
              location.pathname === "/contacts" ? <SearchContact /> : null
            }
          </div>
        </div>
      </nav>

 */}

      <Navbar expand={expand} className="bg-light mb-3 fixed-top">
        <Container fluid={"lg"}>
          <Navbar.Brand href="#">
            <img
              src={require("../assets/img/logo2.png")}
              className='img-fluid'
              alt='logo'
              style={{ width: 100, height: 50, marginLeft: 20, display: "inline-block" }}
            /> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            style={{ background: "#"}}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>       
                <span className='' style={{ color: "#000" }}>
                 سیستم مدیریت{" "}
                  <span
                    className=' '
                    style={{
                      marginRight: "",
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}>
                    مخاطبین
                  </span>
                </span>
              </Offcanvas.Title>
            </Offcanvas.Header>
              <hr className="d-block d-lg-none" style={{color:"#000"}} />
            <Offcanvas.Body>
              <Nav className="justify-content-start d-block d-lg-none flex-grow-1 pe-3 mb-3 mb-lg-0">
                <Nav.Link href="#action1">خانه</Nav.Link>
                <Nav.Link href="#action2">درباره ما</Nav.Link>
                <Nav.Link href="#action2">تماس با‌ما</Nav.Link>
              </Nav>
              <span className='d-none d-lg-inline-block flex-grow-1 fw-bold' style={{ color: "#000" }}>
                سیستم مدیریت{" "}
                <span
                  className=' '
                  style={{
                    marginRight: "",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}>
                  مخاطبین
                </span>
              </span>
              {
                location.pathname === "/contacts" ? <SearchContact /> : null
              }
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </div>);
};

export default NavbarContact;
