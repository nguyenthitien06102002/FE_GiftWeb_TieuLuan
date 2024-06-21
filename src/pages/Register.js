import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AlertModal from '../Modal/AlertModal';
import NavBar from '../components/Navbar/Navbar';
import BASE_API_URL from '../utils/apiConfig';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isStrongPassword, setIsStrongPassword] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  // const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [loginError, setLoginError] = useState(false);
 


  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setIsValidPhone(validatePhone(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsStrongPassword(validatePassword(e.target.value));
    setIsPasswordMatch(confirmPassword === e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '') {
      if (isValidEmail && isStrongPassword && isValidPhone && isPasswordMatch) {

        try {
           // Mã hóa mật khẩu
        // const hashedPassword = sha256(password);
        
          const response = await fetch(`${BASE_API_URL}/api/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: fullName,
              phoneNumber : phone,
              email,
              password,
              status: 1,
              typeID: 1,
              socialLoginId: 'null'
            }),
          });
  
          if (response.ok) {
            const responseData = await response.json(); // Chuyển đổi phản hồi thành đối tượng JavaScript
            console.log('Đăng ký thành công!');
            // console.log('Thông tin người dùng:', responseData);
            setLoginError(true);
            // setShowLoginAlert(true);
            // setTitle("Chúc mừng bạn đăng kí thành công. Bây giờ bạn có thể Đăng nhập.");
          
          } else {
            // setShowLoginAlert(true);
            console.error('Đăng ký thất bại!');
            // setTitle("Email đã tồn tại!");
            window.alert('Email đã tồn tại hoặc số điện thoại đã tồn tại!');
          }
        } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
        }





      } else {
        console.log('Vui lòng kiểm tra lại thông tin đăng ký');
      }
    } else {
      console.log('Vui lòng nhập đầy đủ thông tin');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
  };

  const navigator = useNavigate();
  function userlogin() {
    navigator('/login');
  }

  return (
    <div>
      <NavBar/>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }} className='mb-4'>
                <Button style={{ maxWidth: '50%', flex: '1', marginRight: '5px', backgroundColor: 'white', color: '#FF6666', fontWeight: 'bold', border: '1px solid #FF6666' }} onClick={userlogin}>Đăng nhập</Button>
                <Button style={{ maxWidth: '50%', flex: '1', backgroundColor: '#FF6666', border: '1px solid #FF6666', color: 'white', fontWeight: 'bold' }}>Đăng ký</Button>
              </div>
              {loginError && (
                <div className="alert alert-success" role="alert">
                  Chúc mừng bạn đã đăng ký thành công. Mời bạn<Link to="/login"> Đăng nhập </Link> 
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                  <Form.Label>Họ và Tên</Form.Label>
                  <Form.Control type="text" placeholder="Nhập Họ và Tên" value={fullName} onChange={handleFullNameChange} className="border" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Nhập email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} isInvalid={!isValidEmail} />
                  <Form.Control.Feedback type="invalid">Email không hợp lệ</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type="text" placeholder="Nhập số điện thoại" value={phone} onChange={handlePhoneChange} isInvalid={!isValidPhone} className="border" />
                  <Form.Control.Feedback type="invalid">Số điện thoại không hợp lệ</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={handlePasswordChange} isInvalid={!isStrongPassword} />
                  <Form.Control.Feedback type="invalid">Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một ký tự đặc biệt</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!isPasswordMatch} />
                  <Form.Control.Feedback type="invalid">Mật khẩu nhập lại không trùng khớp</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Check type="checkbox" label="Đồng ý với điều khoản của chúng tôi" />
                </Form.Group>
                <Button style={{ width: '100%', backgroundColor: '#FF6666', border: '1px solid #FF6666', color: 'white', fontWeight: 'bold' }} type="submit" disabled={!fullName || !email || !phone || !password || !confirmPassword}>Đăng Ký</Button>
                {/* <AlertModal show={showLoginAlert} onClose={() => setShowLoginAlert(false)} title={title} /> */}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Register;
