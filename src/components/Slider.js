import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SliderCard/SlideCard";
import Xuan from "../Images/Xuan.png";
import WomanDay from "../Images/8th3.png";
import FoxBox from "../Images/giftt.png";
import poster from "../Images/postter.gif";
import NavBar from "./Navbar/Navbar";
import poster1 from "../Images/porter.gif";
import slide from "../Images/slider.png";

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const SliderData = [
    {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Mang Lại Hạnh Phúc, Một Quà Tặng Tại Mỗi Cơ Hội",
      cover: Xuan,
    },
    {
      id: 2,
      title: "Chúc mừng Ngày Quốc tế Phụ nữ",
      desc: "Ngày để tôn vinh, kính trọng và ủng hộ phụ nữ!. Dành tặng những món quà ý nghĩa cho chị em.",
      cover: WomanDay,
    },
    {
      id: 3,
      title: "FOXBOX",
      desc: "Kho Báu Của Quà Tặng, Khoảnh Khắc Đặc Biệt Cho Mọi Dịp!",
      cover: FoxBox,
    },
  ];

  return (
    <section className='homeSlide' style={styles.imageContainer}>
      <div style={styles.navbar}>
        <NavBar className="topNavbar" />
      </div>
      <Container style={styles.sliderContainer}>
        <Slider {...settings}>
          {SliderData.map((value, index) => (
            <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
          ))}
        </Slider>
      </Container>
    </section>
  );
};

const styles = {
  imageContainer: {
    backgroundImage: `url("${slide}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    position: 'relative',
    height: '100vh', 
  },
  navbar: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000, 
   
  },
  sliderContainer: {
    paddingTop: '60px', 
    width: '100%',
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
  },
};

export default SliderHome;
