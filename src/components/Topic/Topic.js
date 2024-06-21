import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "./topic.css";
import ProductTopic from '../ProductTopic/ProductTopic';
import { productTopic } from '../../utils/topicNew';
import ProductCard from '../ProductCard/ProductCard';
import BASE_API_URL from '../../utils/apiConfig';

const Topic = ({ title, bgColor}) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/topic`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products`);
        const productsWithImages = await Promise.all(response.data.map(async (product) => {
          const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${product.id}`);
          return {...product,  imageUrl: imageResponse.data[0].imgPath};
        }));
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchTopics();
    fetchProducts();
  }, []);

  const handleTopicSelect = (topicId) => {
    setSelectedTopicId(topicId);
  };


  return (
    <section style={{ background: bgColor }} className='styleBottom'>
      <Container>
        <div className="heading">
          <h3>{title}</h3>
        </div>
        <Row className="justify-content-center">
          {topics
          .filter((topic) => topic.active)
            .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
            .slice(0, 3)
            .map((topic) => (
              <Col md={3} sm={5} xs={10} className='topic new' key={topic.id}>
                {/* <div>
                  <img
                  loading="lazy"
                  src={topic.topicImage}
                  alt=""
                  onClick={() => handleTopicSelect(topic.id)}
                />
                </div> */}
                <div style={{ position: 'relative' }}>
                  <img
                    loading="lazy"
                    src={topic.topicImage}
                    alt=""
                    onClick={() => handleTopicSelect(topic.id)}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'

                  }}>
                    {topic.topicName}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>

      <ProductTopic
        title="Sản phẩm theo chủ đề"
        bgColor="#f6f9fc"
        productItem={selectedTopicId ? products.filter(product => product.themeId.id === selectedTopicId) : products}
      />
     

              
  
    </section>
  );
}

export default Topic;
