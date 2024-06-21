import React, {useState} from "react";
import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import numeral from 'numeral';import { addToCart } from "../../app/features/cart/cartSlice";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FcLikePlaceholder } from "react-icons/fc";
import { useCart } from "../../utils/CartContext";
import axios from "axios";
import { logEvent } from "../../utils/LogPage";
import BASE_API_URL from "../../utils/apiConfig";


const ProductCard = ({ title, productItem }) => {
  const [hovered, setHovered] = useState(false);
  const { fetchCartItemsCount } = useCart();

  

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
 
    window.location.href = `/product/${productItem.id}`;
  };

  const userData = JSON.parse(localStorage.getItem('userData'));

   // Hàm xử lý sự kiện khi nhấn nút "Thêm vào giỏ hàng"
   const handleAddToCartClick = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!userData) {
      window.alert('Bạn hãy đăng nhập để thêm sản phẩm vào giỏ hàng');

    } else {
      // Nếu đã đăng nhập, thực hiện thêm vào giỏ hàng
      addToCart();
      // window.location.reload();
    }
  };


  const addToCart = async () => {
    if (!userData || !userData.id) {
      // console.error('User data is missing or incomplete');
      window.alert('Bạn hãy đăng nhập để tiếp tục mua sắm !!');
      return;
    }
    try {
      const response = await axios.post(`${BASE_API_URL}/api/cart/add`, {
        userID: {
          id: userData.id
        },
        product: {
          id: productItem.id
        },
        quantity: 1
      });


      await logEvent('ADD_TO_CARD', `with product: ${productItem.id}`, '1');
        window.alert('Bạn đã thêm sản phẩm ' + productItem.productName + ' vào giỏ hàng thành công !!');
        fetchCartItemsCount();
      
    } catch (error) {
      window.alert('Số lượng sản phẩm đẽ hết !!');
    }
  };




  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Ưu đãi tốt nhất hôm nay dành cho bạn!" ? (
        <span className="discount">{Math.ceil(((productItem.price - productItem.salePrice) / productItem.price) * 100)}% Off</span>
      ) : null}
      {title === "Sản phẩm mới" ? (
        <span className="new">New</span>
      ) : null}
    
      <img 
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imageUrl}
        alt=""
       
      />
   
      <div className="product-like">
        <FcLikePlaceholder/>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
       
        <div className="price">
          <h4>{numeral(productItem.salePrice).format('0,0')}đ</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={handleAddToCartClick}
        
            title="Thêm vào giỏ hàng"
          >
            <TbShoppingBagPlus/>
          </button>
        </div>
       
        {title === "Quà tặng giảm giá" ? (
        <h6 className="priceold">{numeral(productItem.price).format('0,0')}đ</h6>
      ) : null}
      </div>
    </Col>
  );
};

export default ProductCard;
