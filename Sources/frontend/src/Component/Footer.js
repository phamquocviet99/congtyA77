import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";

function Footer() {
  return (
    <div className="content-footer">
      <div className="header-footer-name">
        <h5 className="text-center color-1">
            CONTACT US
        </h5>
      </div>
      <div className="container-contact">

        <div className="container pading-footer">
        <h5 className="">LIÊN HỆ VỚI CHÚNG TÔI</h5>
          <div className="row">
            <div className="col-sm-6">
              <input placeholder="Tên của bạn" type="text" className="form-control  input-footer" />
              <input placeholder="Địa chỉ email" type="text" className="form-control  input-footer" />
              <textarea placeholder="Tin nhắn" type="text" className="form-control  input-footer text-area" />
              <button type="button" className="btn btn-outline-success btn-lg btn-block input-footer">Gửi thư</button>
            </div>
            <div className="col-sm-6">
              <div className="nenhong">
              <ul className="font-2">
              <li>Điện thoại : 12121212121212</li>
              <li>Email : 45464645445454</li>
              <li>Website :DDDDDDDD</li>
              <li style={{width:"300px"}}>Địa chỉ :FGFGFGFGFFGFGFGFGFGFG</li>
            </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
