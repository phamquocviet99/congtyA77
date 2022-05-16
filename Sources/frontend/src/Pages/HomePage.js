import React from "react";
import { Carousel, Card } from "react-bootstrap";

import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
function HomePage() {
  return (
    <div>
      <div style={{ height: "50px" }}></div>
      <Carousel fade>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100 img-background"
            src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652497255/A77_Images/BackGround/header-hero_ikxvz4.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <div className="content-img-back-1">
              <p className="font-content-1">ENVIRONMENT</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100 img-background"
            src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652498382/A77_Images/BackGround/binary-code-computer-background-polygon-data-security-protection-abstract-technology-java-coding-many-uses-advertising-book-191129296_mkxn1n.jpg"
            alt="First slide"
          />

          <Carousel.Caption>
            <div className="content-img-back-1">
              <p className="font-content-1">INFORMATION TECHNOLOGY</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100 img-background"
            src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652498389/A77_Images/BackGround/Office-LED-Panel-Light_04_tno97h.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <div className="content-img-back-1">
              <p className="font-content-1">LIGHTING SYSTEMS</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container container-about">
        <div className="content-about">
          <h2 className="font-home-1">GIỚI THIỆU</h2>
          <div className="horizontal-line"></div>
        </div>
        <div className="container-name-logo-about">
          <img
            className="format-logo-about"
            src={require("../Component/logo/logo-header.png")}
          ></img>

          <div className="right-about">
            <div className="display-block">
              <p className="font-1-about">MÔI TRƯỜNG</p>
              <p className="font-1-about">CÔNG NGHỆ</p>
            </div>
            <div className="vertical-line"></div>
            <div className="display-block">
              <p className="font-1-about">CẢNH QUANG</p>
              <p className="font-1-about">ÁNH SÁNG</p>
            </div>
          </div>
        </div>
        <div className="content-about">
          <p className="font-2-about">
            <b>Công ty TNHH A77</b> là một đơn vị được thành lập nhờ sự nhiệt
            huyết của những người bạn xa quê mong muốn góp một phần công sức,
            kinh nghiệm và tình yêu quê hương. Để mang lại sự thịnh vượng và làm
            đẹp thêm cho quê hương.
          </p>
          <p className="font-2-about">
            <b>Công ty TNHH A77</b> đã liên kết hoạt động với các công ty có
            lĩnh vực và kinh nghiệm về các lĩnh vực hoạt động như: Công ty TNHH
            Bách Việt Đồng Nai (VIMCERTS 045), Công ty HBB Tech, Công ty TVTKKT
            Cảnh Quang Hồ Vương, Công ty ZamLed Việt Nam, Công ty SAPAI …
          </p>
          <p className="font-2-about">
            Bên cạnh đó, đội ngũ luôn sẵn sàng cung cấp thông tin tư vấn các
            lĩnh vực kinh doanh để Quý khách hàng thuận lợi tham khảo và lựa
            chọn dịch vụ hoàn hảo nhất.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652667937/A77_Images/BackGround/cntt_l9xfjz.png"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />

            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652668181/A77_Images/BackGround/iStock-937843262_cu7gsf.png"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Wintry Mountain Landscape"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652668233/A77_Images/BackGround/9003-15658435_lgw0iv.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Mountains in the Clouds"
            />

            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652668003/A77_Images/BackGround/rwaL3gvh5RDEc3Q9upvF_crrruu.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652668422/A77_Images/BackGround/cac-loai-cay-trong-thiet-ke-canh-quan-1_cwuphz.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Waves at Sea"
            />

            <img
              src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652667705/A77_Images/BackGround/iStock-531251998-scaled_dmk5rt.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Yosemite National Park"
            />
          </div>
        </div>
      </div>
      <div className="container-activity">
        <div className="container">
          <div className="content-activity">
            <h2
              className="font-home-1"
              style={{ textAlign: "end", color: "white" }}
            >
              LĨNH VỰC HOẠT ĐỘNG
            </h2>
            <div
              className="horizontal-line"
              style={{ backgroundColor: "white" }}
            ></div>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="ac-left">
                    <p className="title-activity-1-left">
                      TƯ VẤN VÀ PHÂN TÍCH MÔI TRƯỜNG
                    </p>
                    <p className="title-activity-2-left">
                      ENVIRONMENTAL CONSULTING AND ANALYSIS
                    </p>
                    <p className="font-activity-left">
                      Chúng tôi có đội ngũ chuyên tư vấn các giải pháp và cung
                      cấp dịch vụ toàn diện trong lĩnh vực bảo vệ môi trường cho
                      các Doanh nghiệp
                    </p>
                    <p className="font-activity-left">
                      Công ty TNHH A77 có các chức năng về lĩnh vực tư vấn và
                      phân tích các môi trường nước, không khí, đất... có khả
                      năng đo đạc, phân tích hầu hết các mẫu theo quy chuẩn quy
                      định hiện hành.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ac-right">
                    <img
                      src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652672209/A77_Images/BackGround/nitrogen-generators-laboratory-environment_wfrmay.jpg"
                      className="rounded-circle img-activity-right"
                      alt="Cinque Terre"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="ac-left">
                    <img
                      src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652675445/A77_Images/BackGround/den-panel-light_n2cpse.webp"
                      className="rounded-circle img-activity-left"
                      alt="Cinque Terre"
                    ></img>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ac-right">
                    <p className="title-activity-1-right">
                      TƯ VẤN VÀ LẮP ĐẶT HỆ THỐNG CHIẾU SÁNG
                    </p>
                    <p className="title-activity-2-right">
                      CONSULTING AND INSTALLATION OF LIGHTING SYSTEM
                    </p>

                    <p className="font-activity-right">
                      Với sự lớn mạnh quá trình đô thị hóa đang diễn ra tại các
                      thành phố lớn và những khu công nghiệp công nghệ cao, nhu
                      cầu về lắp đặt thiết bị chiếu sáng cũng vì đó mà tăng
                      theo.
                    </p>
                    <p className="font-activity-right">
                      Với các nhà cung cấp uy tín mà chúng tôi hợp tác, chúng
                      tôi cung cấp các giải pháp chuyên nghiệp, văn minh, hiện
                      đại nhất.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="ac-left">
                    <p className="title-activity-1-left">
                      TƯ VẤN VÀ THIẾT KẾ CẢNH QUAN
                    </p>
                    <p className="title-activity-2-left">
                      LANDSCAPE CONSULTING AND DESIGN
                    </p>
                    <p className="font-activity-left">
                      Đến với công ty chúng tôi, quý khách sẽ luôn được tiếp đón
                      tận tình và được làm việc với quy trình chuyên nghiệp,
                      chúng tôi cung cấp các dịch vụ thiết kế các công trình
                      cảnh quan nhà ở, công nghiệp...
                    </p>
                    <p className="font-activity-left">
                      Chúng tôi có nhiều phong cách thiết kế khác nhau. Mỗi
                      phong các và yêu cầu độ cầu kỳ của canh quan sẽ được tính
                      toán chi tiết, chặt chẽ để đưa ra thiết kế phù hợp.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ac-right">
                    <img
                      src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652675486/A77_Images/BackGround/thiet-ke-canh-quan-san-vuon-3-san-vuon-a-dong_aiks9w.jpg"
                      className="rounded-circle img-activity-right"
                      alt="Cinque Terre"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="ac-left">
                    <img
                      src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652675606/A77_Images/BackGround/consultant-presenting-tag-cloud-information-technology-227624274_w5zfrv.jpg"
                      className="rounded-circle img-activity-left"
                      alt="Cinque Terre"
                    ></img>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ac-right">
                    <p className="title-activity-1-right">
                      TƯ VẤN VÀ CUNG CẤP GIẢI PHÁP CNTT
                    </p>
                    <p className="title-activity-2-right">
                      CONSULTING AND SUPPLYING IT SOLUTION
                    </p>
                    <p className="font-activity-right">
                      Với tầm nhìn của các chuyên gia công nghệ thông tin, chúng
                      tôi có các dịch vụ tư vấn, cung cấp giải pháp về công nghệ
                      cho doanh nghiệp...
                    </p>
                    <p className="font-activity-right">
                      Các sản phẩm của chúng tôi cung cấp như phần mềm cho doanh
                      nghiệp, lập các trang website hiện đại, lập trình ứng dụng
                      mobile, cung cấp giải pháp trí tuệ nhân tạo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-product-home">
        <div className="container">
          <h2 className="font-home-1">SẢN PHẨM CỦA CHÚNG TÔI</h2>
          <div className="horizontal-line"></div>
          <div className="list-card-product">
            <div className="row">
              <div className="col-md-4">
                <Card className="card-product">
                  <Card.Img
                    variant="top"
                    src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652698953/A77_Images/BackGround/den_led_panel_la_gi_1_yczlla.jpg"
                  />
                  <Card.Body>
                    <Card.Title>Sản phẩm Đèn Panel</Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-md-4">
                <Card className="card-product">
                  <Card.Img
                    variant="top"
                    src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652698944/A77_Images/BackGround/40w-600x375_jkgae7.jpg"
                  />
                  <Card.Body>
                    <Card.Title>Sản phẩm Trần Panel</Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div class="col-md-4">
                <Card className="card-product">
                  <Card.Img
                    variant="top"
                    src="https://res.cloudinary.com/dwgo7yiow/image/upload/v1652698967/A77_Images/BackGround/IMG_7160-1-724x500_iwiuy0.jpg"
                  />
                  <Card.Body>
                    <Card.Title>
                     Sản phẩm Cây xanh cảnh quan
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
