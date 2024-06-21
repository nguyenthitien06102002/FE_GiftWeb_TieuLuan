import { Fragment } from "react";
import React, { useState, useEffect, useRef } from 'react';
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products } from "../utils/products";
import { discoutProducts } from "../utils/discoutProducts";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { topicNew, productTopic } from "../utils/topicNew";
import { collectionData } from "../utils/collectionData";
import Topic from "../components/Topic/Topic";
import ProductTopic from "../components/ProductTopic/ProductTopic";
import Collection from "../components/Collection/Collection";
import axios from "axios";
import LogPage from "../utils/LogPage";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import post from "../Images/poster1.gif";
import postLeft from "../Images/left.png";
import { FaArrowRight } from "react-icons/fa";
import { Button, Container } from "react-bootstrap";
import BASE_API_URL from '../utils/apiConfig';

const Home = () => {

  const [productsList, setProductsList] = useState([]);
  const [discounted, setDiscounted] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  // const hasLoggedVisit = useRef(false);

  // const logVisit = async () => {
  //   if (hasLoggedVisit.current) return; // Check if the visit has already been logged
  //   hasLoggedVisit.current = true; // Set the flag to true to prevent future logs
  //   try {
  //     await axios.post('api/logs', {
  //       userId: {
  //         id: userData.id,
  //       },
  //       eventType: 'VISIT_PAGE',
  //       description: `home`,
  //       level: 1,
  //       path: 'web',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   logVisit();
  // }, []);



  useEffect(() => {



    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products`);
        const productsWithImages = await Promise.all(response.data.map(async (product) => {
          const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${product.id}`);
          return { ...product, imageUrl: imageResponse.data[0].imgPath };
        }));

        const sortedProducts = productsWithImages.sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        const newProducts = sortedProducts.slice(0, 6);
        setProduct(newProducts);
        const sortedProductsdiscounted = productsWithImages.sort((a, b) => {
          return (b.price - b.salePrice) - (a.price - a.salePrice);
        });
        const topDiscountedProducts = sortedProductsdiscounted.slice(0, 6);
        setDiscounted(topDiscountedProducts);

        // console.log(productsWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/category`);
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      <LogPage page="home" eventType='VISIT_PAGE' level='1' />
      <SliderHome />
      <Wrapper category={category} />

      <Row>
        <Col sm={6} style={{ padding: '0', margin: '0' }}>
          <div style={{ position: 'relative', width: '100%', height: '350px' }}>
            <img src={postLeft} alt="post" style={{ width: '100%', height: '350px' }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // thay đổi ở đây
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
              fontFamily: 'Arial, sans-serif',

            }} >
             
                <h6 style={{ fontWeight: 'bold' }}>MÓN QUÀ Ý NGHĨA</h6>

                <h1 style={{
                  fontFamily: 'Times New Roman', fontSize: '50px',
                  paddingRight: '60px', paddingLeft: '100px'
                }}>Từ của hàng chúng tôi mang đến cho bạn</h1>
                <button style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  cursor: 'pointer',


                }}>
                  CHI TIẾT <FaArrowRight />
                </button>
              

            </div>
          </div>
        </Col>
        <Col sm={6} style={{ padding: '0', margin: '0' }}>
          <img src={post} alt="post" style={{ width: '100%', height: '350px' }} />
        </Col>
      </Row>





      <Section
        title="Ưu đãi tốt nhất hôm nay dành cho bạn!"
        bgColor="#f6f9fc"
        productItems={discounted}
      />
      <Section
        title="Sản phẩm mới"
        bgColor="white"
        productItems={product}
      />

      <Container className="text-center my-5">
        <Row>
          <Col>
            <div className="mb-3">
              <small className="text-uppercase">Chọn quà tặng phù hợp cho mọi dịp lễ</small>
              <hr style={{ width: '50px', margin: '10px auto', borderTop: '3px solid #FF5D5D' }} />
            </div>
            <h1>Niềm vui và ý nghĩa</h1>
            <p className="lead">
              Chọn quà tặng phù hợp cho mọi dịp lễ, từ sinh nhật, kỷ niệm đến các ngày lễ lớn, để mang lại niềm vui, sự bất ngờ và ý nghĩa sâu sắc cho người nhận, giúp gắn kết tình cảm và tạo nên những kỷ niệm đáng nhớ.
            </p>
            <Button variant="outline-dark">Tư vấn</Button>
          </Col>
        </Row>
      </Container>

      <Topic
        title=" "
        bgColor="#f6f9fc"
      />
      <Collection
        title="Bộ sưu tập đặc biệt"
        bgColor="white"
        collectionData={collectionData}
      />
    </Fragment>
  );
};

export default Home;

