import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Button, Input, Popover } from 'components';
import { PATH } from 'constant';
import { useAuth } from 'hooks';
import {  useAppDispatch } from 'store';
import { authManagementActions } from 'store/AuthStore';
import {useState,useEffect} from "react"
import cn from 'classnames'

export const Header = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const dispatch = useAppDispatch();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isInputVisible, setInputVisible] = useState(true);
  const {bookingId} = useParams()
  const toggleInputVisibility = () => setInputVisible(!isInputVisible);

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
      setInputVisible(false);
    } else {
      setIsSmallScreen(false);
      setIsHeaderVisible(true);
      setInputVisible(false);
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen && (
        <ToggleButton onClick={toggleHeader}>
          <i className={`fa ${isHeaderVisible ? 'fa-times' : 'fa-bars'}`}></i>
        </ToggleButton>
      )}
      <Container
        className={cn({
          'header-fixed': scroll,
          'header-hidden': !isHeaderVisible && isSmallScreen,
        })}
      >
        <div className="header-content">
          <h1 className="brand"   onClick={() => navigate("/")}>
            <span className="text-[var(--primary-color)]">CYBER</span>MOVIE
          </h1>
          <nav>
            <NavLink to="">LỊCH CHIẾU</NavLink>
            <NavLink to="">PHIM</NavLink>
            <NavLink to="">RẠP</NavLink>
            <NavLink to="">TIN TỨC</NavLink>
          </nav>
          <div className="search">
            <Button onClick={toggleInputVisibility}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </div>
          <div>
            {!accessToken && (
              <p className="flex items-center font-600">
                <i className="fa-solid fa-user text-20"></i>
                <span
                  className="ml-10 cursor-pointer hover:text-[var(--primary-color)]"
                  onClick={() => navigate(PATH.login)}
                >
                  Đăng nhập
                </span>
                <span className="inline-block h-[24px] w-[2px] bg-black mx-6"></span>
                <span
                  className="cursor-pointer hover:text-[var(--primary-color)]"
                  onClick={() => navigate(PATH.register)}
                >
                  Đăng ký
                </span>
              </p>
            )}
            {!!accessToken && (
              <Popover
                content={
                  <div className="p-10">
                    <p className="font-600 text-16">{user?.hoTen}</p>
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
                      onClick={() =>{
                        dispatch(authManagementActions.logOut('abc'))
                        if(bookingId){
                          if(!localStorage.getItem("bookingId")){
                           navigate(PATH.login)
                           localStorage.setItem("bookingId",bookingId)
                         }
                        }
                      }
                      }
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-16"></i>
                      <span className="ml-10 font-500 text-16">Đăng xuất</span>
                    </Button>
                  </div>
                }
                trigger="click"
                arrow={false}
              >
                {isSmallScreen ? (
                  <span className="!bg-transparent cursor-pointer text-[17px]">
                    TÀI KHOẢN
                  </span>
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
      {isInputVisible && <Input placeholder="Tìm kiếm tên phim" className='search-input' />}
      </Container>
    </>
  );
};

const Container = styled.header`
  height: 60px;
  box-shadow: 0px 16px 10px -5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: #fff;
  @media (max-width: 768px) {
    height: 280px;
    position: fixed;
    z-index: 999;
    box-shadow: none;
    background: transparent;
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
      font-weight: 700;
      font-size: 30px;
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
      font-size: 18px;

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
          content: '';
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
          scale: .7;
        }
      }

      @media (max-width: 768px) {
        &:before {
          content: 'TÌM PHIM';
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

;`

