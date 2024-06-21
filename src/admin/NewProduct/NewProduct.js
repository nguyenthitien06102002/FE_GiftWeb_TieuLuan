import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { Stepper, Step, StepLabel, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-quill/dist/quill.snow.css';
import AdminFooter from '../Footer/AdminFooter';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { v4 } from 'uuid';
import { imageDb } from '../../FireBaseImage/Config';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { LeftOutlined } from '@ant-design/icons';
import BASE_API_URL from '../../utils/apiConfig';



const NewProduct = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [images, setImages] = useState([]);
    const [productInfo, setProductInfo] = useState({
        name: '',
        category: '',
        price: '',
    });

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductInfo({ ...productInfo, [name]: value });
    };
    // const handleImageChange = (event) => {
    //     const fileList = event.target.files;
    //     const urls = [];
    //     for (let i = 0; i < fileList.length; i++) {
    //         const url = URL.createObjectURL(fileList[i]);
    //         urls.push(url);
    //     }
    //     setImages(urls);
    //     console.log(urls);
    // };
    // const handleImageChange = (event) => {
    //     const fileList = event.target.files;
    //     if (fileList) {
    //         const urls = [];
    //         for (let i = 0; i < fileList.length; i++) {
    //             const url = URL.createObjectURL(fileList[i]);
    //             urls.push(url);
    //         }
    //         setImages(urls);
    //     }
    // };

    const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const [step, setStep] = useState(0);

    const [productName, setProductName] = useState('');
    const [stock, setStock] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [detail, setDetail] = useState('');
    const [price, setPrice] = useState('');
    const [active, setActive] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [topic, setTopic] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [img, setImg] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/topic`);
                const activeTopics = response.data.filter(topic => topic.active === true);
                setTopic(activeTopics);
                // console.log(response.data);

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
    const handleShowChange = (e) => {
        const value = e.target.value === 'true'; // Lấy giá trị từ radio button và chuyển đổi thành boolean
        setActive(value);
        console.log(value); // Log giá trị của biến show
    };

    const handleDeleteImageChose = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

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



    const updateProducts = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/api/products`, {
                productName: productName,
                detail: detail,
                price: price,
                salePrice: salePrice,
                stock: stock,
                categoryId: {
                    id: selectedCategory
                },
                themeId: {
                    id: selectedTopic
                },
                active: active,
                status: true
            });

            console.log('Product new:', response.data);
            const id = response.data.id;

            const files = Array.from(img);

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
                            caption: ' ',
                            imgPath: url
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {
                            // window.alert('Bạn đã thêm ảnh thành công');
                        }).catch((error) => {
                            console.error('Error uploading image:', error);
                        });
                    });
                }).catch((error) => {
                    console.error('Error uploading image:', error);
                });
            });

            window.alert('Tạo sản phẩm mới thành công');
            // window.location.href = '/appointments';
        } catch (error) {
            console.error('Error updating product:', error);
            window.alert('Tạo sản phẩm mới không thành công');
        }
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
                <div className="row">
                    <div className="col-md-12">


                        <div className="card">
                            {/* <div className="card-body">
                                <div className="card"> */}
                            <div className="card-body">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className='mt-4 mb-4'>Thêm sản phẩm mới</h4>
                                        <Stepper activeStep={step} alternativeLabel className='pt-4'>
                                            <Step>
                                                <StepLabel>Thông tin sản phẩm</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>hình ảnh</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Định giá</StepLabel>
                                            </Step>
                                        </Stepper>
                                        {step === 0 && (
                                            // <form onSubmit={handleNext}>
                                            //     <TextField
                                            //         label="Tên sản phẩm"
                                            //         variant="outlined"
                                            //         name="name"
                                            //         value={productInfo.name}
                                            //         onChange={handleChange}
                                            //         fullWidth
                                            //         required
                                            //     />
                                            //     <FormControl fullWidth>
                                            //         <InputLabel>Phân loại</InputLabel>
                                            //         <Select
                                            //             value={productInfo.category}
                                            //             onChange={handleChange}
                                            //             name="category"
                                            //             required
                                            //         >
                                            //             <MenuItem value="Dental">Dental</MenuItem>
                                            //             <MenuItem value="Electronics">Electronics</MenuItem>

                                            //         </Select>
                                            //     </FormControl>
                                            //     <TextField
                                            //         label="Giá"
                                            //         variant="outlined"
                                            //         name="price"
                                            //         value={productInfo.price}
                                            //         onChange={handleChange}
                                            //         fullWidth
                                            //         required
                                            //     />
                                            //     <div>
                                            //         <Button disabled>Back</Button>
                                            //         <Button type="submit">Next</Button>
                                            //     </div>
                                            // </form>
                                            // <Form onSubmit={handleNext} className='mt-4'>
                                            <div className='mt-4'>
                                                <h5>Thông tin sản phẩm</h5>

                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Label style={{ fontWeight: 'bold' }}>Tên</Form.Label>
                                                                <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className='border' />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Label style={{ fontWeight: 'bold' }} >Phân loại</Form.Label>
                                                                <Form.Select aria-label="Default select example" onChange={handleChangeCategory}>
                                                                    <option>Chọn phân loại</option>
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
                                                                        onChange={(value) => setDetail(value)}

                                                                    />
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>

                                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Label style={{ fontWeight: 'bold' }}>Số lượng</Form.Label>
                                                                <Form.Control type="number" className='border' pattern="[0-9]*" value={stock} onChange={(e) => setStock(e.target.value)} />

                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Label style={{ fontWeight: 'bold' }}>Chủ đề</Form.Label>
                                                                <Form.Select aria-label="Default select example" onChange={handleChangeTopic}>
                                                                    <option>Chọn Chủ đề</option>
                                                                    {topic.map((topic) => (
                                                                        <option key={topic.id} value={topic.id}>{topic.topicName}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Form.Group>
                                                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Label style={{ fontWeight: 'bold' }}>Chủ đề</Form.Label>
                                                                <Form.Select aria-label="Chọn chủ đề" onChange={handleChangeTopic} multiple>
                                                                    {topic.map((topic) => (
                                                                        <option key={topic.id} value={topic.id}>{topic.topicName}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Form.Group> */}


                                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Label style={{ fontWeight: 'bold' }}>Trạng thái</Form.Label>

                                                                {/* <div>
                                                                    <div className="form-check ">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="flexRadioDefault"
                                                                            id="flexRadioDefault1"

                                                                        />
                                                                        <label className="form-check-label" >
                                                                            Hiển thị
                                                                        </label>

                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="flexRadioDefault" />
                                                                        <label className="form-check-label" >
                                                                            Ẩn
                                                                        </label>


                                                                    </div>

                                                                </div> */}
                                                                {/* <div>
                                                            <div className="form-check ">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="flexRadioDefault1"
                                                                    checked
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
                                                                    
                                                                    onChange={() => handleActiveChange(false)}
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
                                                                            value={true}
                                                                            checked={active === true}
                                                                            onChange={handleShowChange}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            Hiển thị
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="flexRadioDefault"
                                                                            value={false}
                                                                            checked={active === false}
                                                                            onChange={handleShowChange}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            Ẩn
                                                                        </label>
                                                                    </div>
                                                                </div>




                                                            </Form.Group>



                                                        </Col>
                                                    </Row>
                                                </Container>
                                                {/* <Button disabled>Back</Button>
                                                <Button onClick={handleNext}>Next</Button> */}
                                            </div>

                                            // </Form>

                                        )}
                                        {step == 1 && (
                                            <div>

                                                <div>
                                                    <h5 className='mt-3'>Ảnh sản phẩm</h5>
                                                    <div style={{ marginTop: '50px', marginBottom: '50px' }} className='border p-2'>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            {selectedImages.map((image, index) => (

                                                                <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                                                                    <img src={image} alt={`Selected ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                                    <button onClick={() => handleDeleteImageChose(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>X</button>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div style={{ position: 'relative',  display: 'flex', justifyContent: 'center' }}>
                                                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

                                                            <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '5px', color: '#333', transition: 'all .3s', }}>
                                                                <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Thêm ảnh
                                                            </label>
                                                        </div>

                                                        {/* <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button style={{ backgroundImage: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', fontWeight: 'bold', color: 'white' }} component="span">
                                                                Chọn ảnh
                                                            </Button>
                                                        </label> */}
                                                    </div>
                                                </div>





                                                {/* 
                                                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                                                <Button onClick={handleNext}>Next</Button> */}
                                            </div>
                                        )}
                                        {step === 2 && (

                                            <div>
                                                <h5 className='mt-3'>Định giá</h5>
                                                <div className='mt-4'>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} md={4}>

                                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                    <Form.Label style={{ fontWeight: 'bold' }}>Giá gốc</Form.Label>
                                                                    <Form.Control type="number" className='border' pattern="[0-9]*" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={12} md={4}>
                                                                <Form.Group className="mb-3" >
                                                                    <Form.Label style={{ fontWeight: 'bold' }}>Giá sale</Form.Label>
                                                                    <Form.Control type="number" className='border' pattern="[0-9]*" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
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


                                                </div>
                                                {/* <Button onClick={handleReset}>Reset</Button>
                                                <Button onClick={updateProducts}>Ok</Button> */}
                                            </div>
                                        )}
                                        <div>
                                            {step > 0 && <Button onClick={handleBack}>Quay lại</Button>}
                                            {step < 2 ? <Button onClick={handleNext}>Tiếp tục</Button> : <Button onClick={updateProducts}>Hoàn tất</Button>}
                                        </div>
                                    </div>
                                </div>



                            </div>
                            {/* </div>
                            </div> */}
                        </div>

                    </div>
                </div>
                <AdminFooter />
            </AdminLayout>
        </>
    )
}

export default NewProduct