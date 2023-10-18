import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Button, Popover, Search } from "components";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { useAppDispatch } from "store";
import { authManagementActions } from "store/AuthStore";
import { useState, useEffect } from "react";
import cn from "classnames";
import { Badge } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { getLocalStorage } from "utils";
// import { getLocalStorage } from "utils";

export const Header = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { accessToken,user} = useAuth();
  const dispatch = useAppDispatch();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  // const [localChoose,setLocalChoose] = useState( {...getLocalStorage("local")})
  const isChooseLocal= Object.keys(param).length?true:false
  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }; 
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSmallScreen(true);
      setIsHeaderVisible(false);
    } else {
      setIsSmallScreen(false);
      setIsHeaderVisible(true);
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible); 
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen && (
        <ToggleButton onClick={toggleHeader}>
          <i className={`fa ${isHeaderVisible ? "fa-times" : "fa-bars"}`}></i>
        </ToggleButton>
      )}
      <Container
        className={cn({
          "header-fixed": scroll,
          "header-hidden": !isHeaderVisible && isSmallScreen,
          "header-local":isChooseLocal,
        })}
      >
        <div className="header-content">
          <img
            className="brand"
            onClick={() => navigate("/")}
            src="/images/airbnb.svg"
            alt="logo"
          />  
          {!isChooseLocal&&<nav>
            <NavLink to="">Nơi ở</NavLink>
            <NavLink to="">Trải nghiệm</NavLink>
            <NavLink to="">Trải nghiệm thực tế</NavLink>
          </nav>}
          <Search/>
          <div className="header-user">
            <nav>
              <NavLink to="">
                Đón tiếp khách
              </NavLink>
            </nav>
            <GlobalOutlined type="button" />
            
            {!accessToken && (
              <Badge count={0} showZero offset={[-10,3]} size="small">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                  <NavLink to="">
                  <i className="fa-solid fa-bag-shopping"></i>
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className=" dropdown-item cursor-pointer hover:text-[var(--primary-color)]"
                      onClick={() => navigate(PATH.login)}
                    >
                      Đăng nhập
                    </a>
                    <a
                      className="dropdown-item cursor-pointer hover:text-[var(--primary-color)]"
                      onClick={() => navigate(PATH.register)}
                    >
                      Đăng ký
                    </a>
                  </div>
                </div>
            </Badge>
            )}
            {!!accessToken && (
              <Popover
                content={
                  <div className="p-10 w-auto !inset-[ 50px 0px 0px 0px]">
                    <p className="font-600 text-16">{user?.user.name}</p>
                    <hr className="my-16" />
                    <p
                      className="text-16 cursor-pointer"
                      onClick={() => navigate(PATH.account)}
                    >
                      Thông tin tài khoản
                    </p>
                    <hr className="my-16" />
                    <Button
                      className="!h-[46px]"
                      type="primary"
                      onClick={() => {
                        dispatch(authManagementActions.logOut("abc"));
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-16"></i>
                      <span className="ml-10 font-500 text-16">Đăng xuất</span>
                    </Button>
                  </div>
                }
                trigger="click"
              >
                {isSmallScreen ? (
                  <p className="!bg-transparent cursor-pointer text-[17px]">
                    TÀI KHOẢN
                  </p>
                ) : (
                  <Avatar
                    size="large"
                    className="!bg-[var(--primary-color)] cursor-pointer"
                  >
                    <i className="fa-regular fa-user text-20"></i>
                  </Avatar>
                )}
              </Popover>
            )}
          </div>
        </div>
        {/* {isInputVisible  && (
          
        )} */}

      </Container>
    </>
  );
};

const Container = styled.header`
  height: 150px;
  padding-bottom:50px;
  box-shadow: 0px 16px 10px -5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: #fff;
  font-family: "Circular-bold";
  
  @media (max-width: 768px) {
    height: 280px;
    position: fixed;
    z-index: 999;
    // box-shadow: none;
    background: transparent;
  }
  &.header-local{
    padding-bottom:0px!important;
    height: 100px;
  }

  &.header-fixed {
    position: fixed;
    width: 100%;
    z-index: 999;
  }

  &.header-hidden {
    transform: translateX(-300px);
    max-width: 300px;
  }

  .header-content {
    padding: 0 60px;
    max-width: var(--max-width);
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 0 20px;
      flex-direction: column;
      align-items: flex-start;
      max-width: 180px !important;
      margin: 0;
      background-color: #efefef;
    }

    .brand {
      width: 150px;
      &:hover {
        cursor: pointer;
      }

      @media (max-width: 1080px) {
        font-size: 22px;
      }
      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    nav {
      display: flex;
      gap: 60px;
      font-size: 16px;

      @media (max-width: 1200px) {
        gap: 30px;
        font-size: 17px;
      }

      @media (max-width: 900px) {
        gap: 20px;
      }
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
      }

      a {
        font-weight: 500;
        &::after {
          content: "";
          display: block;
          height: 3px;
          background: var(--primary-color);
          width: 0;
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }
    }

    .header-user {
      width:250px;
      display: flex;
      align-items: center;
      justify-content:space-around;
      .dropdown{
        padding:5px 20px;
        color: var(--secondary-color);
        background-color:white;
        border: 2px solid var(--primary-color);
        border-radius:20px;
        .btn{
          padding:0;
          margin-right:5px;
        }
        .dropdown-menu{
          &.show{
            top:5px!important;
            left:-25%!important;
            min-width:0px;
            width:auto;
          }
        }
        .svg-inline--fa {
          color: var(--secondary-color);
        }
      }
    }

    .search {
      display: flex;
      align-items: center;
      border-radius: 8px;
      height: 40px;
      overflow: hidden;
      max-width: 200px;

      button {
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
        cursor: pointer;
        outline: none;
        color: #fff;

        &:hover {
          color: var(--primary-color) !important;
        }

        i {
          font-size: 20px;
          line-height: 40px;
        }

        @media (max-width: 768px) {
          scale: 0.7;
        }
      }

      @media (max-width: 768px) {
        &:before {
          content: "TÌM PHIM";
          margin-right: 4px;
          font-size: 17px;
          cursor: pointer;
        }
      }
    }
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  background: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  z-index: 1000;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  i {
    font-size: 20px;
    color: #e50914;
  }

  @media (max-width: 768px) {
    left: 85%;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
