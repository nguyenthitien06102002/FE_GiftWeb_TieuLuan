import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getProductItems } from "../utils/products";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from 'react-router-dom';
import withPageLogging from '../utils/PageLogger';
import LogPage from '../utils/LogPage';
import NavBar from '../components/Navbar/Navbar';
import BASE_API_URL from '../utils/apiConfig';


const Shop = () => {
  const [category, setCategory] = useState([]);
  const { categoryId } = useParams();
  const { search } = useParams();
  const { topicId } = useParams();
  const categoryIdInt = parseInt(categoryId);
  const topicIdInt = parseInt(topicId);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [topics, setTopics] = useState([]);




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products`);
        const productsWithImages = await Promise.all(response.data.map(async (product) => {
          const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${product.id}`);
          return { ...product, imageUrl: imageResponse.data[0].imgPath };
        }));
        setProducts(productsWithImages.reverse());
        // console.log(productsWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/category`);
        const activeCategories = response.data.filter(category => category.active === true);
        setCategory(activeCategories);
        // setCategory(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchCategory();

    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${ BASE_API_URL } /api/topic`);
        // const activeTopic = response.data.filter(category => category.active === true);
        // Lưu trữ dữ liệu từ API vào state
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    // Lọc sản phẩm theo danh mục nếu categoryIdInt tồn tại
    if (!isNaN(categoryIdInt) && categoryIdInt !== null && categoryIdInt !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.categoryId.id === categoryIdInt && product.active === true);
    }

    // Lọc sản phẩm theo giá trong khoảng priceRange
    filteredProducts = filteredProducts.filter(product => product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1]);
    
    // Lọc sản phẩm theo từ khóa tìm kiếm nếu có
    if(search) {
      const keyword = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => product.productName.toLowerCase().includes(keyword));
    }

    // Lọc sản phẩm theo topicId nếu có
    if (topicId !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.themeId.id === parseInt(topicId));
    }
  
    setFilteredProducts(filteredProducts);
}, [categoryIdInt, products, priceRange, search, topicId]);

  


  useWindowScrollToTop();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  
  const navigate = useNavigate();
  return (
    <Fragment>
      <NavBar />
      {/* <Banner title="product" /> */}

      <LogPage page="shop" eventType='VISIT_PAGE' level='1' />
      <section className="filter-bar">

        <Container >
          <Breadcrumb style={{ fontSize: '17px',  }}>
            <Breadcrumb.Item onClick={() => navigate('/')} active style={{ cursor: 'pointer' }} >Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/shop')} active style={{ cursor: 'pointer' }}>tất cả sản phẩm</Breadcrumb.Item>
            {categoryId && (
             <Breadcrumb.Item active>
             {category.find(cat => cat.id === categoryIdInt)?.name}
           </Breadcrumb.Item>
            )}
             {topicId && (
             <Breadcrumb.Item active>
             {topics.find(cat => cat.id === topicIdInt)?.topicName}
           </Breadcrumb.Item>
            )}


          </Breadcrumb>
        </Container>
        <Container>
          {isSmallScreen ? (
            <>
              <Row className="justify-content-center">
                <Col>
                  <div >

                    <FilterSelect setFilterList={category} setPriceRange={setPriceRange}  />
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col >
                  <div>

                    <ShopList productItems={filteredProducts} />
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col md={3}>
                <div >
                  <FilterSelect setFilterList={category} setPriceRange={setPriceRange}  />
                </div>
              </Col>
              <Col md={9}>
                <div >
                  <ShopList productItems={filteredProducts} />
                </div>
              </Col>
            </Row>
          )}
        </Container>


      </section>
    </Fragment>
  );
};

export default Shop;

