import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./product-details.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import numeral from 'numeral';
import { FcShipped, FcPaid, FcSynchronize } from "react-icons/fc";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useCart } from "../../utils/CartContext";
import BASE_API_URL from "../../utils/apiConfig";




const ProductDetails = ({ selectedProduct, images, imageIndex, averageRating }) => {
  const { fetchCartItemsCount } = useCart();
  const roundedRating = Math.ceil(averageRating);
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  // Kiểm tra xem có thông tin người dùng trong localStorage không
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    const firstImage = images.length > 0 ? images[0].imgPath : null;
    setSelectedImage(firstImage);
    setRating(averageRating);

  }, [images]);


  const handleSlideClick = (imageSrc) => {
    setSelectedImage(imageSrc);

  };
  const starttting = Math.round(rating)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


  
  const handleAddToCartClick = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!userData) {
      window.alert('Bạn hãy đăng nhập để thêm sản phẩm vào giỏ hàng');

    } else {
      addToCart();
    }
  };


  const addToCart = async () => {
    if (!userData || !userData.id) {
      window.alert('Bạn hãy đăng nhập để tiếp tục mua sắm !!');
      return;
    }
    try {
      const response = await axios.post(`${BASE_API_URL}/api/cart/add`, {
        userID: {
          id: userData.id
        },
        product: {
          id: selectedProduct.id
        },
        quantity: quantity
      });


      window.alert('Bạn đã thêm sản phẩm ' + selectedProduct.productName + ' vào giỏ hàng thành công !!');
      fetchCartItemsCount();

    } catch (error) {
      window.alert('Sản phẩm trong kho không đủ số lượng bạn cần mua !!');
    }
  };




  return (
    <section className="product-page">

      <Container>

        <Row className="justify-content-center">

          <Col md={6}>
            <div>
              <img loading="lazy" src={selectedImage} alt="" />
            </div>


            <Slider {...settings}>
              {images.map(image => (
                <div onClick={() => handleSlideClick(image.imgPath)} key={image.id}>
                  <img src={image.imgPath} alt="Image 2" style={styles.settings} />
                </div>

              ))}
            </Slider>

          </Col>
          <Col md={6}>

            <h2>{selectedProduct?.productName}</h2>
            <p>Mã sản phẩm: {id}</p>
            <div className="rate">
              <div style={{ color: 'yellow' }}>
                {Array.from({ length: starttting }, (_, index) => (
                  <i key={index} className="fa fa-star" style={{ marginLeft: '5px' }}></i>
                ))}
              </div>

              <span> Đánh giá : {starttting}/5</span>
            </div>
            <div className="info">
              <span className="price">{numeral(selectedProduct?.salePrice).format('0,0')} đ</span>
            </div>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div className="button-container">
              <button
                aria-label="Add"
                type="submit"
                className="button add"
                onClick={handleAddToCartClick}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                aria-label="Add"
                type="submit"
                className="button add"
              >
                Mua ngay
              </button>
            </div>
            <div style={{ paddingTop: '20px' }}>
              <hr className="hr" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <FaRegHeart style={{ marginRight: '20px', fontSize: '20px' }} />
              <FaShareAlt style={{ marginRight: '20px', fontSize: '20px' }} />
            </div>
            <div className="wrapper">
              <p><FcShipped /> Giao hàng tận nơi, thanh toán khi nhận hàng</p>
              <p><FcPaid /> Miễn phí gói quà và thiệp chúc mừng</p>
              <p><FcSynchronize /> Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi</p>
            </div>
          </Col>
        </Row>
      </Container>

    </section>
  );
};
const styles = {
  settings: {
    with: '100%',
    height: '150px',
    padding: '10px',
    cursor: 'pointer',


  },
}


export default ProductDetails;
