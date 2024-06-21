import { useEffect, useState, useContext } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { SiApifox } from "react-icons/si";
import { SiFox } from "react-icons/si";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import logo from '../../Images/LogoFoxBox.png'
import SearchBar from "../SeachBar/SearchBar";
import { FaSearch } from "react-icons/fa";
import Header from "../Header/Header";
import { CartContext } from "../../utils/CartContext";
import axios from 'axios';
import { useCart } from "../../utils/CartContext";
import { logEvent } from "../../utils/LogPage";
import { FaUser } from "react-icons/fa";
 import { useLocation } from 'react-router-dom';
 import bg from '../../Images/poster1.gif';
import BASE_API_URL from "../../utils/apiConfig";


const NavBar = () => {
  // Kiểm tra xem có thông tin người dùng trong localStorage không
  const navigate = useNavigate();
  const { cartItemCount } = useCart();
  const router = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { cartQuantity } = useContext(CartContext);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [topics, setTopics] = useState([]);
 

  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

    // Hàm xử lý khi người dùng chọn một Dropdown.Item
    const handleDropdownItemClick = (topicId) => {
      
      router(`/shop/topic/${topicId}`);
    };

  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const handleMouseEnterUser = () => {
    setShowLogin(true);
  };

  const handleMouseLeaveUser = () => {
    setShowLogin(false);
  };

  function getNavigate() {
    navigate('/')
  }
  function getNavigateRegister() {
    navigate('/register')
  }
  
  const handRegister = () => {
    getNavigateRegister();
  }

  const handleLogout = async () => {
    await logEvent('LOGOUT', `userLogOut`, '1');
    localStorage.removeItem('userData');   
    window.location.href = '/';
  };

  const handelClickAccount = () => {
    router(`/account/profile`);
   
  };

  const dropdownData = [
    {
      id: 1,
      name: "Quà tân gia",
    },
    {
      id: 2,
      name: "Quà 8/3",
    },
    {
      id: 3,
      name: "Quà tặng độc đáo",
    },
    {
      id: 4,
      name: "Quà cưới",
    },
    {
      id: 5,
      name: "Quà lưu nệm",
    },
    {
      id: 6,
      name: "Quà lưu nệm",
    },
  ];

  useEffect(() => {

    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/topic`);
        // Lưu trữ dữ liệu từ API vào state
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);






  return (
    <>

      {/* <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
        style={{ backgroundColor: isFixed ? 'white' : 'transparent'
         }}
      > */}
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
        style={{
          backgroundImage: !isHomePage && !isFixed ? `url(${bg})` : 'none',
          backgroundColor: isFixed ? 'white' : 'transparent',
          position: 'relative' 
        }}
      >
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)' 
          }}
        /> */}
        <Container className="navbar-container">
          <Navbar.Brand >
            {/* <ion-icon name="bag"></ion-icon> */}
            <div >
              {/* <Link to="/">
                <img src={logo} style={{ width: '150px', height: '80px' }}></img>

              </Link>
                 <h1 className="logo" style={{ color: '#0F1035', fontWeight: 'bold' }}>FOXBOX</h1>  */}

             
              {isFixed ? (
                <Link to="/">
                  <img src={logo} style={{ width: '150px', height: '80px' }}></img>

                </Link>
              ):(
                  <Link to="/" style={{ textDecoration: 'none', margin: '18px' }}>
                    <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                      <SiApifox style={{ color: 'white', marginRight: '10px' }} />
                      <h3 style={{ color: 'white', fontFamily: 'sans-serif', margin: 0 }}>FOXBOX</h3>
                    </div>
                  </Link>
              )}

            </div>
          
          </Navbar.Brand>
          {/* Media cart and toggle */}
          <div className="d-flex">
            <div className="media-cart">
              <Link>
                <FaSearch
                  className="nav-icon" s style={{
                    color: isFixed ? 'black' : 'white'
                  }} />
              </Link>
              <Link
                to="/login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isFixed ? 'black' : 'white'}
                  className="nav-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartItemCount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isFixed ? 'black' : 'white'}
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{
                color: isFixed ? 'black' : 'white'
              }}
              onClick={() => {
                setExpand(expand ? false : "expanded");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="justify-content-center flex-grow-1 pe-3">

              <Nav.Item>
                <Link
                  aria-label="Go to Shop Page"
                  className="navbar-link"
                  to="/shop"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label"
                    style={{
                      color: isFixed ? 'black' : 'white'
                    }}
                  >Sản Phẩm</span>
                </Link>
              </Nav.Item>

              <Nav.Item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Dropdown show={showMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Dropdown.Toggle className="navbar-link" aria-label="Go to Cart Page" variant="link">
                    <span className="nav-link-label" style={{
                      color: isFixed ? 'black' : 'white'
                    }}>Quà theo sự kiện</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* Danh sách các danh mục */}
                    {topics
                      .filter((topics) => topics.active)
                      .map((topics) => {
                        return (
                          <Dropdown.Item key={topics.id} onClick={() => handleDropdownItemClick(topics.id)}>
                            {topics.topicName}
                          </Dropdown.Item>
                        );
                      })}

                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>

              <Nav.Item>
                <Link
                  aria-label="Go to Cart Page"
                  className="navbar-link"
                  to="/advise"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label"
                    style={{
                      color: isFixed ? 'black' : 'white'
                    }}
                  >Tư vấn quà tặng</span>
                </Link>
              </Nav.Item>

            </Nav>



            <Nav className="justify-content-end flex-grow-1 pe-3">
            
              <Nav.Item className="expanded-cart">
                <div>
                  <SearchBar setSearchResults={setSearchResults} isFixed={isFixed} className="search-bar-container" />
                </div>
                {userData ? (
                  <>
                    <Dropdown show={showLogin} onMouseEnter={handleMouseEnterUser} onMouseLeave={handleMouseLeaveUser}>
                      <Dropdown.Toggle className="navbar-link" aria-label="Go to Cart Page" variant="link">
                        <Link
                          
                          className="style-login" style={{
                            color: isFixed ? 'black' : 'white'
                          }}>
                          <div className="icon-with-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={isFixed ? 'black' : 'white'}
                              className="nav-icon"
                              
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                clipRule="evenodd"
                              
                              />
                            </svg>
                          
                            <span className="icon-text" style={{
                              color: isFixed ? 'black' : 'white'
                            }}>{userData.userName}</span>
                          </div>
                        </Link>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/account">Thông tin tài khoản</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>

                          Đăng xuất

                        </Dropdown.Item>
                        {userData.status === 0 ? (
                          <Dropdown.Item as={Link} to="/admin/*">
                          Quản lý
                        </Dropdown.Item> ) : (null)
                      }
                       

                      </Dropdown.Menu>
                    </Dropdown>
                  </>

                ) : (
                  <>
                    <Dropdown show={showLogin} onMouseEnter={handleMouseEnterUser} onMouseLeave={handleMouseLeaveUser}>
                      <Dropdown.Toggle className="navbar-link" aria-label="Go to Cart Page" variant="link">
                        <Link
                          to="/login"
                            className="style-login" style={{
                              color: isFixed ? 'black' : 'white'
                            }}>
                          <div className="icon-with-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                                fill={isFixed ? 'black' : 'white'}
                              className="nav-icon"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                clipRule="evenodd"
                              />
                            </svg>
                              <span className="icon-text" style={{
                                color: isFixed ? 'black' : 'white'
                              }}>Đăng nhập</span>
                          </div>
                        </Link>
                      </Dropdown.Toggle>
                        <Dropdown.Menu >
                          <Dropdown.Item as={Link} to="/login">
                          Đăng nhập
                          </Dropdown.Item>
                        <Dropdown.Item onClick={handRegister}>

                          Đăng ký

                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}



                {/* <div className="nav-icon"><SiApifox style={{color: '#365486'}}/>tttt</div> */}

                <Link
                  aria-label="Go to Cart Page"
                  to="/cart"
                  className="cart-color cart"
                  data-num={cartItemCount}

                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFixed ? 'black' : 'white'}
                    className="nav-icon"
                  >
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>

                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>


  );
};

export default NavBar;
