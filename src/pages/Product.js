import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import { Collapse } from "bootstrap";
import withPageLogging from "../utils/PageLogger";
import NavBar from "../components/Navbar/Navbar";
import BASE_API_URL from '../utils/apiConfig';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState();
  //lay product theo id
  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );

  const [replies, setReplies] = useState([]);

const fetchReply = async (reviewId) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/reply/${reviewId}`);
        setReplies(response.data);
        // console.log(response.data);
    } catch (error) {
        console.error('Error fetching reply:', error);
    }
};



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products/${id}`);
        setProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReview = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/review/${id}`);
        const reviewData = response.data;
        setReviews(reviewData);
    
       
        if (reviewData !== null && reviewData.length > 0) {
          let totalRating = 0;
          reviewData.forEach((review) => {
            totalRating += review.rating;
            fetchReply(review.id);
           
          });
          
          setAverageRating( totalRating / reviewData.length);
          console.log( reviewData.length);
        
        } else {
          // console.log('Chưa có đánh giá');
        }
      } catch (error) {
        // console.log('Lỗi khi lấy đánh giá:', error);
      }
    };
    

    fetchProduct();
    fetchReview();
    fetchReply();
  }, [id]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/imgProducts/${id}`);
        setImages(response.data);
        if (response.data.length > 0) {
          setSelectedImage(response.data[0].imgPath);
        }
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [id]);



  //lấy sản phẩm có phân loại giống nhau
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products`);
        const productsWithImages = await Promise.all(response.data.map(async (product) => {
          const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${product.id}`);
          return { ...product, imageUrl: imageResponse.data[0].imgPath };
        }));
        setProducts(productsWithImages);
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    
  
  }, []);

  useEffect(() => {
    if (!product) return;
  
    // Lọc ra các sản phẩm có cùng phân loại hoặc các thuộc tính khác tương tự với sản phẩm hiện tại
    const filteredSimilarProducts = products.filter(
      (item) => item.categoryId.id === product.categoryId.id && item.id !== product.id
   
    );
    const limitedSimilarProducts = filteredSimilarProducts.slice(0, 3);
  
    setFilteredProducts(limitedSimilarProducts);
  }, [product, products]);



  useWindowScrollToTop();

  return (
   
    <Fragment>
      <NavBar />

      <Container style={{ paddingTop: '25px' }}>
        <Breadcrumb style={{ fontSize: '17px' }}>
          <Breadcrumb.Item active >Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.productName} </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <ProductDetails selectedProduct={product}
      images={images}
      imageIndex={selectedImage}
      averageRating={averageRating}
     
       />
      <ProductReviews selectedProduct={product} reviews={reviews} replies={replies} />
      <section className="related-products">
        <Container>
          <h3>Sản Phẩm tương tự</h3>
        </Container>

        <ShopList 
        productItems={filteredProducts}
         />

      </section>
    </Fragment>
  );
};

export default Product;
