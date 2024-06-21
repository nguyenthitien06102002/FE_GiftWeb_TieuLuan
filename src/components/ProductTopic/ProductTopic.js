import { Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import "./productTopic.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FcLikePlaceholder } from "react-icons/fc";
import { Col } from "react-bootstrap";
import numeral from 'numeral';
import axios from "axios";

const ProductTopic = ({ title, bgColor, productItem }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
 

  return (
    <section style={{ background: bgColor }} className="sectionStyle">
      <Container>
        {/* <div className="heading">
          <h1>{title}</h1>
        </div> */}
        <Row className="justify-content-center" style={{ borderTop: '0px' }}>
          {productItem && productItem.length > 0 ? (
            <>
              {productItem
                .slice(0, 3)
                .map((productItem) => {
                  return (
                

                    <ProductCard
                      key={productItem.id}
                      title={title}
                      productItem={productItem}
                    />
                  );
                })}
            </>


          ) : (
            <p>Không có sản phẩm phù hợp</p>
          )}

        </Row>
      </Container>
    </section>
  );
};

export default ProductTopic;
