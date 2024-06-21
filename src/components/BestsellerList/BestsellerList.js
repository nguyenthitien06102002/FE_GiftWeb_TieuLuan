import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import numeral from 'numeral';

const BestsellerList = ({productItems}) => {
    return (
        <Row style={{ border: '1px solid gray', borderRadius: '8px' }}>
            <div style={{ background: '#7B66FF', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                <h6 className='m-3 text-center' style={{ color: 'white', fontSize: '18px' }}>Sản phẩm hot</h6>

            </div>
            {productItems.map((productItems) => {
                return (
                    <div key={productItems.id}>
                   <Row>
                <Col xs={6} md={4}>
                    <Image src={productItems.imgUrl} thumbnail
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                </Col>
                <Col xs={12} md={8} className='d-flex'>
                    <div style={{ fontWeight: 'bold' }}>
                        <p>{productItems.productName}</p>
                        <p style={{ color: '#7B66FF' }}>{numeral(productItems.price).format('0,0')}đ</p>
                    </div>

                </Col>

            </Row>  
             <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
             <hr className="hr" />
         </div>
         </div>
                );
            })}
           
           
            {/* <Row>
                <Col xs={6} md={4}>
                    <Image src="https://i.pinimg.com/564x/cc/ec/06/ccec06bfcef089196f335c17e837b9eb.jpg" thumbnail
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                </Col>
                <Col xs={12} md={8} className='d-flex align-items-center justify-content-center'>
                    <div style={{ fontWeight: 'bold' }}>
                        <p>Quả cầu tuyết cặp đôi mùa đông</p>
                        <p style={{ color: '#7B66FF' }}>1234.000 đ</p>
                    </div>

                </Col>

            </Row> */}


        </Row>
    )
}

export default BestsellerList