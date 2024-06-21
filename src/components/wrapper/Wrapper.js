import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { FcApproval, FcInTransit, FcSynchronize, FcPaid } from "react-icons/fc";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { serviceData } from "../../utils/products"

const TextWithUnderline = styled.div`
  text-align: center;
  font-size: 15px; 
  color: #4a4a4a; 
  font-family: Arial, sans-serif;

  
  &::after {
    content: '';
    display: block;
    margin: 5px auto; 
    width: 50px; 
    height: 3px; 
    background-color: #FF5D5D; 
  }
`;

const Wrapper = ({ category }) => {
 


  return (
    <section className='wrapper background'>

      <Container >
        <div className="left-align">
          <TextWithUnderline>
           DANH MỤC
          </TextWithUnderline>
          <h1 className="text-center" style={{ paddingBottom: '20px', fontFamily: 'Helvetica'}}>Các danh mục hàng đầu</h1>
        </div>
        <Row >
          {category
            .filter((category) => category.activeHome) 
            .slice(0, 6) 
            .map((category) => {
              return (
                <Col md={2} sm={4} xs={6} key={category.id}>
                 <Link to={`/shop/${category.id}`}>
              <div className="image-containerCategories">
                <img
                  src={category.image}
                  className="imgCategories"
                  alt=""
                />
                <div className="overlay-img">
                  <h3 className="text-over-image">{category.name}</h3>
                </div>
              </div>
            </Link>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  )
}

export default Wrapper
