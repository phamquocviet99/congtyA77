import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function NavbarAdmin() {
  const navigate = useNavigate();
  const listItem = [
    {
      id: 1,
      name: "DANH MỤC SP",
      link: "/admin/category-product.html",
    },

    {
      id: 2,
      name: "DÒNG SP",
      link: "/admin/brand.html",
    },
    {
      id: 3,
      name: "SẢN PHẨM",
      link: "/admin/product.html",
    },
    {
      id: 4,
      name: "DANH MỤC CHUYÊN GIA",
      link: "/admin/category-expert.html",
    },
    {
      id: 5,
      name: " CHUYÊN GIA",
      link: "/admin/expert.html",
    },
    {
      id: 6,
      name: "LĨNH VỰC HĐ",
      link: "/admin/category-activity.html",
    },
    {
      id: 7,
      name: "HOẠT ĐỘNG",
      link: "/admin/activity.html",
    },
    {
      id: 8,
      name: "ĐỐI TÁC",
      link: "/admin/supplier.html",
    },
    ,
    {
      id: 9,
      name: "NGƯỜI DÙNG",
      link: "/admin/user.html",
    },
  ];
  function LogOut() {
    localStorage.removeItem("access_token");
    navigate("/admin/login.html");
  }
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 150) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  return (
    <Navbar
      bg={!colorChange ? "myColor-2" : "myColor-1"}
      fixed="top"
      expand="lg"
      collapseOnSelect
      className="border"
    >
      <div style={{ display: "flex", margin: "10px 70px" }}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-center" style={{ width: "100%" }}>
            {listItem.map((item) => (
              <Nav.Link className="nav-links" href={item.link} key={item.id}>
                <span className="text" style={{fontSize:"15px"}}>{item.name} </span>
              </Nav.Link>
            ))}
            <button style={{marginLeft:"30px" }} className="btn btn-success" onClick={LogOut}>
              Đăng xuất
            </button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarAdmin;
