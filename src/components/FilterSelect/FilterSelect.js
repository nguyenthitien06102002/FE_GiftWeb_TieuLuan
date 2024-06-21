import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaAngleDoubleDown, FaAngleDown, FaAngleRight, FaAngleDoubleUp, FaMoneyBillWave, FaFilter } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import "./filterSelect.css"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate, useParams } from "react-router-dom";
import numeral from 'numeral';


const FilterSelect = ({ setFilterList, setPriceRange }) => {
  const [showSubItem, setShowSubItem] = useState(""); // State để theo dõi việc hiển thị phần tử con
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const router = useNavigate();
  const {topicId} = useParams();
  const topicIdInt = parseInt(topicId);





  let timeoutId;
  const dropdownRef = useRef(null);

  const handleMouseEnter = (item) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setShowSubItem(item);
    }, 300); // Thời gian chậm 300ms
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setShowSubItem("");
    }, 300); // Thời gian chậm 300ms
  };

  const handleSubItemMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const handleSubItemMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowSubItem("");
    }, 300); // Thời gian chậm 300ms
  };

  const [open, setOpen] = useState(window.innerWidth > 1000);
  const [showNextItem, setShowNextItem] = useState([false, false]);



  const handleToggle = () => setOpen(!open);

  // const handleItemClick = (index) => {
  //   const updatedShowNextItem = [...showNextItem];
  //   updatedShowNextItem[index] = !updatedShowNextItem[index];
  //   setShowNextItem(updatedShowNextItem);
  // };

  const handleItemClick = (index) => {
    const updatedShowNextItem = [...showNextItem];
    updatedShowNextItem[index] = !updatedShowNextItem[index];
    setShowNextItem(updatedShowNextItem);
    // router(`/shop/${index}`);
   
    if(topicIdInt) {
      router(`/shop/topic/${topicIdInt}/category/${index}`);

    }else{
      router(`/shop/${index}`);
    }
    
    



    // // Lưu trữ category cha được chọn
    // setSelectedParentCategory(index);
  };

  // const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [priceRange, setLocalPriceRange] = useState([0, 5000000]);
  const [showSlider, setShowSlider] = useState(window.innerWidth > 1000);
  const [showContent, setShowContent] = useState(false);

  // const handlePriceChange = (value) => {
  //   setPriceRange(value);
  // };

  const handlePriceChange = (value) => {
    setLocalPriceRange(value);
    setPriceRange(value); // Truyền giá trị mới của thanh trượt giá lên component cha
  };
  const handleIconClick = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setOpen(window.innerWidth > 1000);
      setShowSlider(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const formatPrice = (price) => {
    return numeral(price).format('0,0');
  };




  return (

    <>



      <>
        {showSlider ? (
          <>
            <ListGroup style={{ cursor: 'pointer' }}>
              <ListGroup.Item active onClick={handleToggle} style={{ background: 'white', color: '#FF6666', border: '1px solid #FF6666', cursor: 'pointer' }}>
                <div className="category-container">
                  <h6>Danh mục sản phẩm</h6>
                  <span className="iconCategory">{open ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}</span>
                </div>
              </ListGroup.Item>
              {open ? (
                <>
                  {setFilterList.map((setFilterList) => {
                    return (
                      <div key={setFilterList.id}>
                        <ListGroup.Item onClick={() => handleItemClick(setFilterList.id)}>

                          <div className="category-container">
                            <h6
                            >{setFilterList.name}</h6>
                            {/* <span className="iconCategory"> {showNextItem[setFilterList.id] ? <FaAngleDown /> : <FaAngleRight />}</span> */}
                          </div>
                        </ListGroup.Item>


                        {/* {showNextItem[setFilterList.id] && (
                          <div>
                            {setFilterList.children.map((subcategory, index) => {
                              return (
                               
                                  <div key={index}> 
                                    <ListGroup.Item style={{ paddingRight: '20px' }}
                                  onClick={() => { handleItemClick(subcategory.id); handleCategorySelect(subcategory.id); }}
                                    >{subcategory.name}</ListGroup.Item>
                                  </div>                            
                              );
                            })}
                          </div>


                        )} */}

                      </div>

                    );
                  })}
                </>
              ) : null}
            </ListGroup>
            {/* <div>
              <div className='mt-4'>
                <h6 style={{ marginLeft: '15px', color: '#FF6666' }}>Giá</h6>
              </div>
              <div style={{ padding: '15px' }}>
                <p>Giá: {priceRange[0]} - {priceRange[1]} đ</p>
                <Slider
                  min={0}
                  max={10000000}
                  value={priceRange}
                  onChange={handlePriceChange}
                  range
                  trackStyle={sliderTrackStyle}
                  handleStyle={[sliderHandleStyle, sliderHandleStyle]}
                />
              </div>
            </div> */}
            <div>
              <div className="mt-4">
                <h6 style={{ marginLeft: '15px', color: '#FF6666' }}>Giá</h6>
              </div>
              <div style={{ padding: '15px' }}>
                <p>Giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} đ</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <FaMoneyBillWave size={20} style={{ marginRight: '10px' }} /> */}
                  <Slider
                    min={0}
                    max={5000000}
                    value={priceRange}
                    onChange={handlePriceChange}
                    range
                    trackStyle={{ backgroundColor: '#FEAFA2' }}
                    handleStyle={[{ borderColor: '#FEAFA2', backgroundColor: '#ae2214' }, { borderColor: '#FEAFA2', backgroundColor: '#ae2214' }]}
                  />
                </div>
              </div>
            </div>
          </>


        ) : (


          <div style={{ textAlign: 'center', }}>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Sử dụng flexbox để căn giữa theo chiều dọc */}
              <FaFilter
                size={30}
                color='#FF6666'
                onClick={handleIconClick}
                style={{ cursor: 'pointer', marginRight: '10px' }} // Margin phải để tạo khoảng cách giữa biểu tượng và nội dung bên phải
              />

            </div>



            {showContent && (
              <>

                <ListGroup style={{ cursor: 'pointer' }}>
                  <ListGroup.Item active onClick={handleToggle} style={{ background: 'white', color: '#FF6666', border: '1px solid #FF6666', cursor: 'pointer' }}>
                    <div className="category-container">
                      <h6>Danh mục sản phẩm</h6>
                      <span className="iconCategory">{open ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}</span>
                    </div>
                  </ListGroup.Item>
                  {open ? (
                    <>
                      {setFilterList.map((setFilterList) => {
                        return (
                          <div key={setFilterList.id}>
                            <ListGroup.Item onClick={() => handleItemClick(setFilterList.id)}>

                              <div className="category-container">
                                <h6
                                >{setFilterList.name}</h6>
                                {/* <span className="iconCategory"> {showNextItem[setFilterList.id] ? <FaAngleDown /> : <FaAngleRight />}</span> */}
                              </div>
                            </ListGroup.Item>


                            {/* {showNextItem[setFilterList.id] && (
                          <div>
                            {setFilterList.children.map((subcategory, index) => {
                              return (
                               
                                  <div key={index}> 
                                    <ListGroup.Item style={{ paddingRight: '20px' }}
                                  onClick={() => { handleItemClick(subcategory.id); handleCategorySelect(subcategory.id); }}
                                    >{subcategory.name}</ListGroup.Item>
                                  </div>                            
                              );
                            })}
                          </div>


                        )} */}

                          </div>

                        );
                      })}
                    </>
                  ) : null}
                </ListGroup>
                <div>
                  <div className="mt-4">
                    <h6 style={{ marginLeft: '15px', color: '#FF6666' }}>Giá</h6>
                  </div>
                  <div style={{ padding: '15px' }}>
                    <p>Giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} đ</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* <FaMoneyBillWave size={20} style={{ marginRight: '10px' }} /> */}
                      <Slider
                        min={0}
                        max={5000000}
                        value={priceRange}
                        onChange={handlePriceChange}
                        range
                        trackStyle={{ backgroundColor: '#FEAFA2' }}
                        handleStyle={[{ borderColor: '#FEAFA2', backgroundColor: '#ae2214' }, { borderColor: '#FEAFA2', backgroundColor: '#ae2214' }]}
                      />
                    </div>
                  </div>
                </div>
              </>

            )}
          </div>
        )}
      </>
    </>



  );
};

const sliderTrackStyle = {
  backgroundColor: '#FEAFA2',
};

const sliderHandleStyle = {
  borderColor: '#FEAFA2',
  backgroundColor: '#ae2214',
};


export default FilterSelect;
