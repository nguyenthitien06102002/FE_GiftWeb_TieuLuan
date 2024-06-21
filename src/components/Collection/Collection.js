import React, { useState, useEffect, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Button, Col, Container, Row } from 'react-bootstrap';
import "./collection.css";

const Collection = ({ title, bgColor, collectionData }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    sliderRef.current.slickGoTo(1);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1245,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
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

  return (
    <section style={{ background: bgColor}}>
    <Container >
     
        <Container className="text-center my-5">
          <Row>
            <Col>
              <div className="mb-3">
                <small className="text-uppercase">Những món quà sưu tập</small>
                <hr style={{ width: '50px', margin: '10px auto', borderTop: '3px solid green' }} />
              </div>
              <h1 >{title}</h1>
             <Slider ref={sliderRef} {...settings}>
        {collectionData.map((collectionData) => {
          return (
            <div className='box' key={collectionData.id}>
              <img src={collectionData.collectionImage} alt="Image 1" className="settings" style={{objectFit: 'cover'}} />
            </div>

          );
        })}
      </Slider>
              <Button variant="outline-dark mt-4">Xêm thêm</Button>
            </Col>
          </Row>
        </Container>
     
    </Container>

    
    </section>
  );
}

export default Collection;
