import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FcAssistant } from "react-icons/fc";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BestsellerList from '../components/BestsellerList/BestsellerList';
import { discoutProducts } from "../utils/discoutProducts";
import NavBar from '../components/Navbar/Navbar';



const Advise = () => {
    return (
        <>
        <NavBar/>
        <Container className="justify-content-center">
            <Container style={{ paddingTop: '25px' }}>
                <Breadcrumb style={{ fontSize: '17px' }}>
                    <Breadcrumb.Item active >Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Tư vấn </Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <Row className="px-3 py-4">
                <Col sm={8}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Image src="https://i.pinimg.com/564x/cc/ec/06/ccec06bfcef089196f335c17e837b9eb.jpg" thumbnail
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <div>
                                <h5>9 Cách tặng quà gây ấn tượng, bất ngờ</h5>
                            </div>
                            <div>
                                <p style={{ color: 'gray' }}><FcAssistant /> Quà tặng bạn trai,Tư vấn quà tặng</p>
                            </div>
                            <div>
                                <p style={{ textAlign: 'justify' }}>
                                    Tặng quà cho những người thân bên cạnh mình như bạn trai, bạn gái, vợ chồng, bạn bè,…luôn là điều không thể thiếu trong cuộc sống. Bạn chọn được món quà phù hợp là chưa đủ. Cách tặng quà cũng vô cùng quan trọng. Một cách tặng quà gây bất ngờ, thú vị sẽ khiến niềm vui được nhân lên nhiều lần. Nghệ thuật tặng quà bên cạnh việc chọn được một món quà ý nghĩa thì chính là làm cho người nhận bất ngờ và ngạc nhiên, không biết trước khi nào được nhận quà và món quà sẽ nhận được là gì. Những bất ngờ thú vị ấy luôn là gia vị trong tình yêu, giúp tình yêu luôn giữ được lửa và đầy cuốn hút. Đặc biệt là trong những dịp như: Sinh nhật, 8/3, 20/10 Noel, kỷ niệm ngày cưới,…bạn đều có thể tạo ra những điều bất ngờ để mối quan hệ của bạn trở nên ngày lãng mạn hơn. Khuôn khổ bài viết này sẽ gợi ý cho bạn một số cách tặng quà gây ấn tượng, bất ngờ cho đối phương. Tùy vào mối quan hệ cũng như hoàn cảnh, điều kiện của mình mà bạn có thể chọn ra phương án phù hợp. Hoặc bạn cũng có thể áp dụng kết hợp nhiều phương án để tạo ra hiệu quả cao hơn.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <hr className="hr" />

                    <Row>
                        <Col xs={12} sm={6}>
                            <Image src="https://i.pinimg.com/originals/31/7c/db/317cdb82544482b01be89fd6ca1721be.gif" thumbnail
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <div>
                                <h5>Bạn gái mới quen nên tặng quà gì?</h5>
                            </div>
                            <div>
                                <p style={{ color: 'gray' }}><FcAssistant /> Quà tặng bạn gái,Tư vấn quà tặng</p>
                            </div>
                            <div>
                                <p style={{ textAlign: 'justify' }}>
                                    Bạn mới quen một cô bạn gái và muốn tặng quà để tạo ấn tượng tốt cũng như chiếm lấy trái tim của nàng. Nhưng bạn lại không biết nên chọn món quà nào để tặng bạn gái mới quen ? Tùy vào mức độ mối quan hệ, cũng như tính cách của bạn gái mà sẽ có những món quà phù hợp, những món quà không phù hợp. Hãy tham khảo bài viết này để tìm cho mình những ý tưởng phù hợp nhé. Chúc bạn thành công!                        </p>
                            </div>
                        </Col>
                    </Row>

                    <hr className="hr" />


                </Col>
                <Col sm={4} xs={12} >

                    {/* list sản phẩm hot */}
                    {/* <Row style={{ border: '1px solid gray', borderRadius: '8px' }}>
                        <div style={{ background: '#7B66FF', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                            <h6 className='m-3 text-center' style={{ color: 'white', fontSize: '18px' }}>Sản phẩm hot</h6>

                        </div>
                        <Row>
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

                        </Row>
                        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <hr className="hr"  />
                        </div>
                        <Row>
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

                        </Row>
                        

                    </Row> */}
                    <BestsellerList 
                      productItems={discoutProducts}/>
                </Col>



            </Row>




        </Container>
        </>
        
    )
}

export default Advise