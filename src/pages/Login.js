import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { LoginSocialGoogle, IResolveParams } from 'reactjs-social-login';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { logEvent } from '../utils/LogPage';
import NavBar from '../components/Navbar/Navbar';
import BASE_API_URL from '../utils/apiConfig';




const Login = () => {
  const navigate = useNavigate();
  function getNavigate() {
    navigate('/')
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [type, setType] = useState(1);
  const [socialLoginId, setSocialLoginId] = useState('');

  const handelGetPassword = () => {
    navigate(`/getpassword`);
  };



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmail) {
      console.log('Email:', email);
      try {

        const response = await fetch(`${BASE_API_URL}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
      // try {

      //   const response = await fetch('https://project-software-z6dy.onrender.com/auth/login', {
      //     method: 'POST',
      //     headers: {
           
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email : email,
      //       password: password,
      //     }),
      //   });
        if (response.ok) {
          // Đăng nhập thành công
          const userData = await response.json(); // Lấy thông tin người dùng từ phản hồi
          console.log(userData);

          const userDataWithoutPassword = { ...userData };
          delete userDataWithoutPassword.password;
          localStorage.setItem('userData', JSON.stringify(userDataWithoutPassword)); // Lưu thông tin người dùng vào LocalStorage
          // Lưu thông tin người dùng vào trạng thái ứng dụng hoặc localStorage/SessionStorage để sử dụng trong ứng dụng

          await logEvent('LOGIN', `with email: ${email}`, '1');

          // getNavigate();
          // window.location.reload();
          window.location.href = '/';
        } else {

          console.error('Đăng nhập thất bại');
          setLoginError(true);
          await logEvent('LOGIN_ERROR', `with email: ${email}`, '2');

        }
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
      }
    } else {
      console.log('Email không hợp lệ');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const navigator = useNavigate();
  function userRegister() {
    navigator('/register')
  }

  // Hàm để tạo mật khẩu ngẫu nhiên
  const generateRandomPassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // Gọi hàm để tạo mật khẩu ngẫu nhiên có độ dài 8 ký tự
  const handLoginFB = (response) => {
    console.log(response);
    console.log(response.data.email);
    console.log(response.provider);
    const data = response.data;
    const provider = response.provider;
    




  };

  const onReject = (error) => {
    console.log(error);
  };
  const randomPassword = generateRandomPassword(8);
  const handLogin = async (credentialResponse) => {
    const dataLogin = credentialResponse.data;
    const provider = credentialResponse.provider;
    // console.log(dataLogin.sub)
    let type;
    let socialLoginId; // Khai báo biến socialLoginId
    
    if (provider === 'google') {
      type = 3;
      console.log(dataLogin.sub)
      socialLoginId = dataLogin.sub; // Gán giá trị cho socialLoginId
    } else {
      type = 2;
      console.log(dataLogin.userID)
      socialLoginId = dataLogin.userID; // Gán giá trị cho socialLoginId
    }
    
    setType(type);
    setSocialLoginId(socialLoginId); // Gọi hàm setSocialLoginId với giá trị socialLoginId đã được gán

    
    try {
      const response = await axios.get(`${BASE_API_URL}/api/users/check-socialLoginId/${socialLoginId}`);
      // console.log(response.data);

      if (typeof response.data === "string" && response.data.trim() === "") {
        console.log("User chưa tồn tại");
        //đăng ký

        try {
          const registerResponse = await fetch(`${BASE_API_URL}/api/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: dataLogin.name,
              phoneNumber: 'null',
              email: dataLogin.email,
              password: randomPassword,
              status: 1,
              typeID: type,
              socialLoginId: socialLoginId,
            }),
          });

          if (registerResponse.ok) {
            // const responseData = await response.json();
            console.log('Đăng ký thành công!');
            setLoginError(true);

            //đăng nhập
            try {

              const loginResponse = await fetch(`${BASE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: dataLogin.email,
                  password: randomPassword,
                }),
              });
              if (loginResponse.ok) {
                const userData = await loginResponse.json();
                const userDataWithoutPassword = { ...userData };
                delete userDataWithoutPassword.password;
                localStorage.setItem('userData', JSON.stringify(userDataWithoutPassword));
                getNavigate();
                window.location.reload();
              } else {
                console.error('Đăng nhập thất bại');
                setLoginError(true);
              }
            } catch (error) {
              console.error('Đã xảy ra lỗi:', error);
            }
            //end đăng nhập

          } else {
            console.error('Đăng ký thất bại!');
            window.alert('Email đã tồn tại hoặc số điện thoại đã tồn tại!');
          }
        } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
        }

        //end đang ký
      } else {
        console.log("User đã tồn tại");
        //đăng nhập
        try {
        
          const userData = response.data;

          const loginResponse1 = await fetch(`${BASE_API_URL}/api/users/login-google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userData.email,
              password: userData.password,
            }),
          });
          if (loginResponse1.ok) {
            const userData = await loginResponse1.json();
            const userDataWithoutPassword = { ...userData };
            delete userDataWithoutPassword.password;
            localStorage.setItem('userData', JSON.stringify(userDataWithoutPassword));
            getNavigate();
            window.location.reload();
          } else {
            console.error('Đăng nhập thất bại');
            setLoginError(true);
          }
        } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
        }
        //end đăng nhập


      }
    } catch (error) {
      console.error('Error while checking email:', error);
    }
  };



  const handleError = () => {
    console.log('Login Failed');
  };







  return (
    <div>
      <NavBar/>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }} className='mb-4'>
                <Button style={styles.buttonLogin}>Đăng nhập</Button>
                <Button style={{ ...styles.buttonLogin, backgroundColor: 'white', color: '#FF6666', border: '1px solid #FF6666' }}
                  onClick={userRegister}>Đăng ký</Button>
              </div>
              {loginError && (
                <div className="alert alert-danger" role="alert">
                  Sai Email hoặc Mật khẩu!
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nhập email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"

                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={!isValidEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không hợp lệ
                  </Form.Control.Feedback>
                 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Check type="checkbox" label="Nhớ tài khoản" />
                </Form.Group>
                <Button
                  style={{
                    width: '100%', backgroundColor: '#FF6666', border: '1px solid #FF6666', color: 'white',
                    fontWeight: 'bold',
                  }} // Đặt chiều rộng của button là 100%
                  type="submit"
                >
                  Đăng nhập
                </Button>
                <span style={{ ...styles.title, fontSize: '14px' , cursor: 'pointer'}} className='mt-3' onClick={handelGetPassword}>Quên mật khẩu</span>
                <span style={{ ...styles.title, fontSize: '17px' }} className='mt-3'>Hoặc đăng nhập với</span>



                <LoginSocialFacebook
                  appId="453342030354433"
                  onResolve={handLogin}
                  onError={onReject}
                  className='mb-3'
                >
                  <FacebookLoginButton />
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="691340428287-gg4j38v4k5vs0ggvr3cfeh9ne5lcllc5.apps.googleusercontent.com"
            
                  onResolve={handLogin}
                  onError={onReject}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>



               


              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

const styles = {
  buttonLogin: {
    maxWidth: '50%',
    flex: '1',
    marginRight: '5px',
    backgroundColor: '#FF6666',
    border: '1px solid #FF6666',
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default Login;

