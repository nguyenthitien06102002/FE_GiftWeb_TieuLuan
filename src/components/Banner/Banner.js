import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../Images/table.jpg";
import bg from "../../Images/poster2.gif";
import "./banner.css";
import NavBar from "../Navbar/Navbar";
const Banner = ({title}) => {
    return ( 
        <div className="image-container">
            <img src={bg} alt="Product-bg" />
            <div style={styles.navbar}>
                <NavBar className="topNavbar" />
            </div>
            <div className="overlay">
                <Container>
                    <Row>
                        {/* <Col>
                            <h2>{title}</h2>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </div>
        
    );
}

const styles = {
   
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      
        zIndex: 9999,

    },

};

export default Banner;