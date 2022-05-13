import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light" stickey="top" expand="lg" collapseOnSelect>
      <div className="container">
        <Navbar.Brand href="/">
          <img 
            className="img-logo-navbar"
            src={require("./logo/logo-header.png")}
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link className="nav-links" href="/home.html"><span className="text">Trang chủ</span></Nav.Link>
            <Nav.Link  className="nav-links" href="/activity.html"><span className="text">Lĩnh vực hoạt động</span></Nav.Link>
            <Nav.Link  className="nav-links" href="/product.html"><span className="text">Sản phẩm</span></Nav.Link>
            <Nav.Link  className="nav-links" href="/expert.html"><span className="text">Chuyên gia</span></Nav.Link>
            <Nav.Link  className="nav-links" href="/supplier.html"><span className="text">Đối tác</span></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
