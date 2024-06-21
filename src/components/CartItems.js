import { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { CartContext } from "../utils/CartContext";
import { useCart } from "../utils/CartContext";
import { logEvent } from "../utils/LogPage";
import BASE_API_URL from '../utils/apiConfig';

const CartItems = () => {
  const { fetchCartItemsCount } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigator = useNavigate();
  function userCheckout() {
    if (userData && userData.id) {
      navigator('/checkout');
  } else {
      // Thông báo nếu userID không tồn tại
      window.alert('Vui lòng đăng nhập để tiếp tục!');
  }
  }


 

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const openModal = (item) => {
    setSelectedProduct(item); // Lưu sản phẩm cần xóa vào state
    setShowDelete(true); // Hiển thị modal
  };
  const closeModal = () => setShowDelete(false);

  useEffect(() => {
    // Kiểm tra xem id của người dùng có tồn tại không
    if (userData && userData.id) {
      fetchCartItems();
    } else {
      console.log("user chưa đăng nhập")
    }
  }, [userData]); 
  
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/cart/items/${userData.id}`);
      const productsWithImages = await Promise.all(response.data.map(async (item) => {
        const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${item.product.id}`);
        return { ...item, imageUrl: imageResponse.data[0].imgPath };

      }));
      setCartItems(productsWithImages);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  //thêm sản phẩm
  const handleAddToCart = async (productId, newQuantity, quantity) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/cart/add`, {
        userID: {
          id: userData.id
        },
        product: {
          id: productId
        },
        quantity: newQuantity
      });
      // Sau khi thêm thành công, cập nhật lại danh sách sản phẩm trong giỏ hàng
      await logEvent('ADD_PRODUCT', `with product: ${productId} và ${newQuantity}`, '1');
      fetchCartItems();
      fetchCartItemsCount();

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  //xóa
  const handleRemoveFromCart = async (productId, productName) => {
   
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}" khỏi giỏ hàng không?`);
    // Nếu người dùng chọn "OK"
    if (confirmDelete) {
      deleteCartItem(productId);
      await logEvent('DETELE_PRODUCT_CARD', `with product: ${productId}`, '1');
      window.alert(`Sản phẩm "${productName}" đã được xóa khỏi giỏ hàng thành công!`);
    }
  };
  


   // Tính tổng giá của tất cả sản phẩm trong giỏ hàng
   const totalPrice = cartItems.reduce((total, item) => total + (item.product.salePrice * item.quantity), 0);

   const deleteCartItem = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/api/cart/clear/${userData.id}/${productId}`);
      if (response.status === 200) {
        console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
        // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
        fetchCartItems();
        fetchCartItemsCount();
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };


  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>

                {cartItems.length === 0 ? (
                  <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                ) : (
                  <>
                    {cartItems.map((item) => {
                      return (
                        <div className="cart-list" key={item.product.id}>
                          <Row className="justify-content-center align-items-center">
                            <Col xs={4} md={2}>
                              <img src={item.imageUrl} alt="" style={{ width: '100%', height: '150px',objectFit: 'cover' }} />
                            </Col>
                            <Col xs={16} md={10}>
                              <Row>
                                <Col sm={4} className="d-flex align-items-center justify-content-center" style={{ fontWeight: 'bold' }}>{item.product.productName}</Col>
                                <Col sm className="d-flex align-items-center justify-content-center">{numeral(item.product.salePrice).format('0,0')} đ</Col>
                                <Col sm className="d-flex align-items-center justify-content-center">


                                  {item.quantity > 1 ? (
                                    <Button variant="outline-secondary" onClick={() => handleAddToCart(item.product.id, -1, item.quantity)}>-</Button>
                                  ) : (

                                    <Button variant="outline-secondary" style={{ opacity: 0.5 }} disabled>-</Button>
                                  )}

                                  <span className="mx-2">{item.quantity}</span>
                                  <Button variant="outline-secondary" onClick={() => handleAddToCart(item.product.id, 1)}>+</Button>
                                </Col>
                                <Col sm className="d-flex align-items-center justify-content-center">{numeral(item.product.salePrice * item.quantity).format('0,0')}đ</Col>


                                <Col sm className="d-flex align-items-center justify-content-center" style={{ fontSize: '18px' }}><RiDeleteBin6Line 
                                onClick={() => handleRemoveFromCart(item.product.id, item.product.productName)} 
                                // onClick={() => deleteCartItem(item.product.id)}
                                /></Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </>



                )}
              </>
            )}








            {/* tong gia tri don hang */}
            <div className="cart-list">
              <Row className="justify-content-end">
                <Col className="text-end">
                  <h5>Tổng : {numeral(totalPrice).format('0,0')} đ</h5>
                  <div style={{ paddingTop: '10px' }}>
                    <Button style={{ backgroundColor: '#FF6666', border: '1px solid #FF6666', fontWeight: 'bold' }}>Tiếp tục mua sắp</Button>{' '}
                    <Button style={{ backgroundColor: 'white', border: '1px solid #FF6666', color: '#FF6666', fontWeight: 'bold' }} onClick={userCheckout}>Thanh Toán</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartItems;
