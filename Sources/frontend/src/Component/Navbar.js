import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {

  const listItem = [
    {
      id: 1,
      name: "TRANG CHỦ",
      link: "/home.html",
    },
    {
      id: 2,
      name: "LĨNH VỰC HOẠT ĐỘNG",
      link: "/activity.html",
    },
    {
      id: 3,
      name: "SẢN PHẨM",
      link: "/product.html",
    },
    {
      id: 4,
      name: "CHUYÊN GIA",
      link: "/expert.html",
    },
    {
      id: 5,
      name: "ĐỐI TÁC",
      link: "/supplier.html",
    },
  ];
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
     if(window.scrollY >= 150){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };
  window.addEventListener('scroll', changeNavbarColor);
  return (
    <Navbar bg={!colorChange ? 'myColor-2' : 'myColor-1'} fixed="top" expand="lg" collapseOnSelect className="border">
      <div className="container">
        <Navbar.Brand href="/">
          <img
            className="img-logo-navbar"
            src={require("./logo/png-03 - Copy.png")}
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-center" style={{ width: "100%" }}>
            {listItem.map((item) => (
              <Nav.Link
                className="nav-links"
                href={item.link}
                key={item.id}
               
              >
                <span className= "text">
                  {item.name}
                </span>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
       
      </div>
    </Navbar>
  );
}

export default NavBar;
