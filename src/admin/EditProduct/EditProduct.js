import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import numeral from 'numeral';
import "./editProduct.css";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader, NavItem, NavLink, Nav, Progress, Table, } from "reactstrap";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminFooter from '../Footer/AdminFooter';
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { imageDb } from '../../FireBaseImage/Config';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { v4 } from 'uuid';
import { LeftOutlined } from '@ant-design/icons';
import BASE_API_URL from '../../utils/apiConfig';


const EditProduct = () => {
    const { id } = useParams();
    const [imagesProduct, setImagesProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState(null);
    const [img, setImg] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        setImg(files);
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            urls.push(url);
        }
        setSelectedImages(urls);
        // console.log(urls);
    };

    const handleDeleteImageChose = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);
    };

    const handClick = () => {
        const files = Array.from(document.querySelector('input[type=file]').files);
        let uploadedCount = 0;

        files.forEach((file) => {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, file).then((value) => {
                console.log(value);
                getDownloadURL(value.ref).then((url) => {
                    setImageURL((prevUrls) => [...prevUrls, url]);

                    axios.post(`${BASE_API_URL}/api/imgProducts`, {
                        productID: {
                            id: id
                        },
                        caption: 'caption',
                        imgPath: url
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {

                        uploadedCount++;
                        if (uploadedCount === files.length) {
                            window.alert('Bạn đã thêm ảnh thành công');
                        }


                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
                });
            }).catch((error) => {
                console.error('Error uploading image:', error);
            });
        });
    }





    useEffect(() => {
        listAll(ref(imageDb, 'files')).then((imgs) => {
            // console.log(imgs)
            imgs.items.forEach(val => {
                getDownloadURL(val).then((url) => {
                    setImageURL(data => [...data, url])
                })
            })
        })

    }, [])
    const [selectedTopic, setSelectedTopic] = useState(product?.themeId.id || '');
    const [selectedCategory, setSelectedCategory] = useState(product?.categoryId.id || '');

    const handleChangeTopic = (event) => {
        const newValue = event.target.value;
        setSelectedTopic(newValue);
        console.log(newValue);
    };
    const handleChangeCategory = (event) => {
        const newValue = event.target.value;
        setSelectedCategory(newValue);
        console.log(newValue);
    };

    const [topic, setTopic] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/topic`);
                const activeTopics = response.data.filter(topic => topic.active === true);
                setTopic(activeTopics);
                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchTopic();

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/category`);
                const activeCategories = response.data.filter(category => category.active === true);
                setCategory(activeCategories);
                // console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchCategory();


    }, []);


    // const handleImageChange = (event) => {
    //     const fileList = event.target.files;
    //     const urls = [];
    //     for (let i = 0; i < fileList.length; i++) {
    //         const url = URL.createObjectURL(fileList[i]);
    //         urls.push(url);
    //     }
    //     setImages(urls);
    //      console.log(urls);
    // };
    // const [image, setImage] = useState(null);
    // const [imageURL, setImageURL] = useState('');

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //     setImageURL(URL.createObjectURL(file)); // Tạo URL cho tệp ảnh và lưu vào state để hiển thị ảnh
    // };
    // const [image, setImage] = useState(null);
    // const [imagePreview, setImagePreview] = useState('');
    // const [base64Image, setBase64Image] = useState('');

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //     setImagePreview(URL.createObjectURL(file)); // Tạo đường dẫn xem trước ảnh
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setBase64Image(reader.result); // Mã hóa ảnh thành chuỗi Base64
    //     };
    //     reader.readAsDataURL(file);
    // };


    const handleDeleteImage = (idImage) => {
        deleteImage(idImage);
    };

    const deleteImage = async (idImage) => {
        try {
            const response = await axios.delete(`${BASE_API_URL}/api/imgProducts/detele/${idImage}`);
            fetchImages();

        } catch (error) {
            console.error(error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/imgProducts/${id}`);
            setImagesProduct(response.data);

        } catch (error) {
            console.error(error);
        }
    };
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/products/${id}`);
            setProduct(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {


        fetchProduct();

        fetchImages();
    }, [id]);

    const [productName, setProductName] = useState(product?.productName);
    const [stock, setStock] = useState(product?.stock);
    const [active, setActive] = useState(product?.active);

    // const [price, setPrice] = useState(product?.price);
    const [salePrice, setSalePrice] = useState(product?.salePrice);
    const [detail, setDetail] = useState(product?.detail);
    const [price, setPrice] = useState(product?.price);

    useEffect(() => {
        setProductName(product?.productName);
        setStock(product?.stock);
        setActive(product?.active);
        setPrice(product?.price);
        setSalePrice(product?.salePrice);
        setDetail(product?.detail);
        setSelectedTopic(product?.themeId.id);
        setSelectedCategory(product?.categoryId.id);

    }, [product?.price, product?.productName, product?.stock, product?.active, product?.salePrice, product?.detail, product?.themeId.id, product?.categoryId.id]);


    const updateProducts = async () => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/products/update/${product.id}`, {
                productName: productName,
                detail: detail,
                price: price,
                salePrice: salePrice,
                stock: stock,
                categoryId:
                {
                    id: selectedCategory
                },
                themeId:
                {
                    id: selectedTopic
                },

                active: active
            });
            // console.log('Product updated:', response.data);
            window.alert('Cập nhật sản phẩm thành công');
            fetchProduct();
        } catch (error) {
            console.error('Error updating product:', error);
            // Xử lý lỗi nếu có
        }
    };

    // active
    const handleActiveChange = (value) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            active: value
        }));
        setActive(value);
        // console.log(value);
    };

    const navigate = useNavigate();
    return (
        <>
            <AdminLayout >
                <div className="mb-4 d-flex flex-wrap">
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <LeftOutlined /> TRỞ LẠI
                    </div>


                </div>
                <h5 className='mb-4'><FaEdit /> Chỉnh sửa sản phẩm</h5>
                <div className="row">
                    <div className="col-md-12">
                        <Row className='mb-4'>
                            <Col xl="4">
                                <Card className="shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <h4>Hình ảnh sản phẩm</h4>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>



                                        <div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {imagesProduct.map((image, index) => (
                                                    <div style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }} key={index}>
                                                        <img src={image.imgPath} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                        <button
                                                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
                                                            onClick={() => handleDeleteImage(image.id)}
                                                        >X</button>
                                                    </div>
                                                ))}

                                                {selectedImages.map((image, index) => (

                                                    <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                                                        <img src={image} alt={`Selected ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                        <button onClick={() => handleDeleteImageChose(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>X</button>
                                                    </div>
                                                ))}


                                                <div style={{ position: 'relative' }}>
                                                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

                                                    <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '5px', color: '#333', transition: 'all .3s', }}>
                                                        <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Thêm ảnh
                                                    </label>
                                                </div>

                                            </div>

                                            <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button style={{ backgroundImage: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', fontWeight: 'bold', color: 'white' }} component="span"
                                                    onClick={handClick}
                                                >
                                                    Cập nhật
                                                </Button>
                                            </label>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="8">
                                <Card className="bg-gradient-default shadow"  >
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <h4>Thông tin sản phẩm</h4>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Container>
                                            <Row>
                                                <Col xs={12} md={4}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Giá gốc</Form.Label>
                                                        {/* <Form.Control type="text"  className='border' 
                                                        value={numeral(product?.price).format('0,0')} 
                                                      
                                                        /> */}
                                                        <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} className='border' />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Giá sale</Form.Label>
                                                        {/* <Form.Control type="text" 
                                                        value={numeral(product?.salePrice).format('0,0')} 
                                                         className='border'
                                                           /> */}
                                                        <Form.Control type="text" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className='border' />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Tiền tệ</Form.Label>
                                                        <Form.Control type="text" placeholder=" " className='border' value="VND" readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Tên</Form.Label>
                                                        {/* <Form.Control type="text"  className='border'
                                                    
                                                         value={product?.productName}
                                                          /> */}
                                                        <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className='border' />

                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label style={{ fontWeight: 'bold' }} >Phân loại</Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={handleChangeCategory}>
                                                            <option value={product?.categoryId.id}>{product?.categoryId.name}</option>
                                                            {category.map((category) => (
                                                                <option key={category.id} value={category.id}>{category.name}</option>

                                                            ))}

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Chi tiết</Form.Label>
                                                        <div>
                                                            <ReactQuill
                                                                value={detail}

                                                                // onChange={(value) => console.log(value)}
                                                                onChange={(value) => setDetail(value)}


                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Số lượng</Form.Label>
                                                        {/* <Form.Control type="text" className='border' value={product?.stock} /> */}
                                                        <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} className='border' />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Chủ đề</Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={handleChangeTopic}>
                                                            <option value={product?.themeId.id}>{product?.themeId.topicName}</option>
                                                            {topic.map((topic) => (
                                                                <option key={topic.id} value={topic.id}>{topic.topicName}</option>
                                                            ))}

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label style={{ fontWeight: 'bold' }}>Trạng thái</Form.Label>
                                                        {/* <div>
                                                            <div className="form-check ">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="flexRadioDefault1"
                                                                    defaultChecked={product?.active === true}
                                                                />
                                                                <label className="form-check-label" >
                                                                    Hiển thị
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    defaultChecked={product?.active !== true}
                                                                />
                                                                <label className="form-check-label" >
                                                                    Ẩn
                                                                </label>
                                                            </div>
                                                        </div> */}
                                                        <div>
                                                            <div className="form-check ">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="flexRadioDefault1"
                                                                    checked={product?.active === true}
                                                                    onChange={() => handleActiveChange(true)}
                                                                />
                                                                <label className="form-check-label" >
                                                                    Hiển thị
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    checked={product?.active !== true}
                                                                    onChange={() => handleActiveChange(false)}
                                                                />
                                                                <label className="form-check-label" >
                                                                    Ẩn
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button style={{ backgroundImage: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', fontWeight: 'bold', color: 'white' }} component="span"
                                                    onClick={updateProducts}>
                                                    Lưu
                                                </Button>
                                            </label>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                <AdminFooter />
            </AdminLayout>
        </>
    )
}

export default EditProduct;
