import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import styled from "styled-components";

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

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="left-align">
          <TextWithUnderline>
            SẢN PHẨM
          </TextWithUnderline>
          <h1 className="text-center" style={{ paddingBottom: '20px', fontFamily: 'Helvetica' }}>{title}</h1>
        </div>
        {/* <div className="heading">
          <h3>{title}</h3>
        </div> */}
        <Row className="justify-content-center">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
