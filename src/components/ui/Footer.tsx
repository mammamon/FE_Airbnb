import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import {GoldOutlined } from "@ant-design/icons";
import cn from "classnames";

export const Footer = () => {
  // const navigate= useNavigate();
  const param = useParams();
  return (
    <Container className="flex flex-col mt-2">
      <div
        className={cn({ hidden: Object.keys(param).length })}
        style={{ padding: "20px 40px" }}
      >
        <div className="w-6/12">
          <h3>Trong thời gian ở</h3>
          <p>We will be available upon request at any time</p>
          <h3 className="mt-4">Alex là một Chủ nhà siêu cấp</h3>
          <p>
            Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao và
            cam kết mang lại kỳ nghỉ tuyệt vời cho khách.
          </p>
        </div>
        <div className="border-t pt-20 mt-20">
          <h3 className="text-20">Những điều cần biết</h3>
          <div className="flex justify-between w-full mt-12">
            <div className="room-rule">
              <h3>Nội quy nhà</h3>
              <ul>
                <li>
                <p><i className="fa-solid fa-clock"></i>Nhận phòng: Sau 14:00</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-clock"></i>Trả phòng: 12:00</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-door-open"></i>Tự nhận phòng bằng bàn phím</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-baby-carriage"></i>Phù hợp với em bé (dưới 2 tuổi)</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-ban-smoking"></i>Không hút thuốc</p>
                </li>
              </ul>
            </div>
            <div className="room-rule">
              <h3>Y tế và an toàn</h3>
              <ul>
                <li>
                  <p>
                  <i className="fa-solid fa-handshake"></i>Đã cam thực hiện vệ sinh tăng cường của Airbnb{" "}
                    <a
                      href="/"
                      style={{ color: "black" }}
                      className="underline font-700"
                    >
                      Tìm hiểu thêm
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                  <i className="fa-solid fa-spray-can"></i>Áp dụng về dãn cách xã hội và các hướng dẫn khác liên quan
                    đến COVID-19 của Airbnb
                  </p>
                </li>
                <li>
                  <p><i className="fa-solid fa-circle-exclamation"></i>Không có máy báo khỏi</p>
                </li>
              </ul>
            </div>
            <div className="room-rule">
              <h3>Chính sách hủy</h3>
              <ul>
                <li>
                  <p>
                    Hủy trước 2:00 PM ngày 16 tháng 4 để được hoàn tiền đầy đủ
                    trừ 30 ngày đầu tiền và phí dịch vụ
                  </p>
                </li>

                <li>
                  <a
                    href="/"
                    style={{ color: "black" }}
                    className="underline font-700"
                  >
                    Thông tin chi tiết
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <img
        className="w-full"
        src="https://cinestar.com.vn/catalog/view/theme/default/images/line-bg.png"
        alt="..."
      />
      <div className="footer-content">
        <div className="mt-[40px] flex flex-wrap gap-[50px] xl:gap-[100px] lg:flex-col sm:flex-col info">
          <div>
            <p className="font-700 text-20">
              <span>GIỚI THIỆU</span>
            </p>
            <NavLink to="">Phương thức hoạt động của Airbnd</NavLink>
            <NavLink to="">Trang tin tức</NavLink>
            <NavLink to="">Nhà đầu tư</NavLink>
            <NavLink to="">Airbnb Luxe</NavLink>
            <NavLink to="">HotelTonight</NavLink>
            <NavLink to="">Airnb for Work</NavLink>
            <NavLink to="">Nhờ có Host, mọi điều đều có thể</NavLink>
            <NavLink to="">Cơ hội nghệ nghiệp</NavLink>
            <NavLink to="">Thư của nhà sáng lập</NavLink>
          </div>
          <div>
            <p className="font-700 text-20">
              <span>CỘNG ĐỒNG</span>
            </p>
            <NavLink to="">Sự đa dạng và cảm giác thân thuộc</NavLink>
            <NavLink to="">Tiện nghi phù hợp cho người khuyết tật</NavLink>
            <NavLink to="">Đối tác liên kết Airbnb</NavLink>
            <NavLink to="">Chỗ ở cho tuyến đầu</NavLink>
            <NavLink to="">Lượt giới thiệu của khách</NavLink>
            <NavLink to="">Airbnb.org</NavLink>
          </div>
          <div>
            <p className="font-700 text-20">
              <span>ĐÓN TIẾP KHÁCH</span>
            </p>
            <NavLink to="">Cho thuê nhà</NavLink>
            <NavLink to="">Tổ chức trải nghiệm thực tế</NavLink>
            <NavLink to="">Tổ chức trải nghiệm</NavLink>
            <NavLink to="">Đón tiếp khách có trách nhiệm</NavLink>
            <NavLink to="">Trung tâm tài nguyên</NavLink>
            <NavLink to="">Trung tâm cộng đồng</NavLink>
          </div>
          <div>
            <p className="font-700 text-20">
              <span>HỖ TRỢ</span>
            </p>
            <NavLink to="">
              Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
            </NavLink>
            <NavLink to="">Trung tâm trợ giúp</NavLink>
            <NavLink to="">Các tùy chọn hủy</NavLink>
            <NavLink to="">Hỗ trợ khu dân cư</NavLink>
            <NavLink to="">Tin cậy và an toàn</NavLink>
          </div>
        </div>
        <div className="flex justify-between mt-24 border-t pt-18">
          <div>
            <p className="inline-block">
              &#169; 2021 Airbnb, Inc. All rights reserved
            </p>
                <ul
                  style={{
                    listStyleType: "disc",
                    display: "inline-flex",
                    width: "fit-content",
                  }}
                >
                  <li className="ml-4"><p>Quyền riêng tư</p></li>
                  <li className="ml-4"><p>Điều khoản</p></li>
                  <li className="ml-4"><p>Sơ đồ trang web</p></li>
                </ul>
              
          </div>
          <div className="flex justify-between  w-3/12">
            <div className="flex justify-between w-8/12">
              <p>
                <GoldOutlined className="mr-2" />
                <span className="underline">Tiếng Việt (VN)</span>
              </p>
              <p>
                $ <span className="underline ml-2">USD</span>
              </p>
            </div>
            <div className="flex justify-between w-3/12">
              <NavLink to="https://www.facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </NavLink>
              <NavLink to="https://www.twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </NavLink>
              <NavLink to="https://www.instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  .room-rule{
    width:30%;
    h3{
      margin-bottom:8px
    }
  }
  .footer-content {
    max-width: var(--max-width);
    margin: auto;
    padding: 20px 40px;
    background: #71717112;
    .social {
      font-size: 26px;
      color: #111;
      display: flex;
      gap: 15px;
      i {
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .info {
      a {
        transition: all 0.3s ease-in-out;
        display: block;
        margin-top: 16px;
        &:hover {
          color: var(--primary-color);
          text-shadow: var(--primary-color) 0 0 1px;
          /* font-weight: 600; */
        }
      }
    }
  }

  @media (min-width: 640px) {
    .info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .info {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
