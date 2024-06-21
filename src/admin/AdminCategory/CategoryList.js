import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import numeral from 'numeral';

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader, NavItem, NavLink, Nav, Progress, Table, } from "reactstrap";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminFooter from '../Footer/AdminFooter';
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye, FaHome, FaEyeSlash } from "react-icons/fa";
import { Modal } from 'antd';
import { TbFlagSearch, TbHomeOff } from "react-icons/tb";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { v4 } from 'uuid';
import { imageDb } from '../../FireBaseImage/Config';
import { TbListDetails } from "react-icons/tb";
import { LeftOutlined } from '@ant-design/icons';
import BASE_API_URL from '../../utils/apiConfig';





const CategoryList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenTopic, setModalIsOpenTopic] = useState(false);
    const [item, setItem] = useState({});

    const [itemTopic, setItemTopic] = useState({});
    const [modalIsOpenNewCategory, setModalIsOpenNewCategory] = useState(false);
    const [modalIsOpenNewTopic, setModalIsOpenNewTopic] = useState(false);



    const handleOpenCategory = (category) => {
        setModalIsOpen(true);
        setItem(category);
        setNameEdit(category.name);
        setIsChecked(category.activeHome);
  

    }
    const handleOpenNewCategoru = () => {
        setModalIsOpenNewCategory(true);

    }
    const handleOpenTopic = (topic) => {
        setModalIsOpenTopic(true);
        setItemTopic(topic);
        setTopicNameEdit(topic.topicName);

    }

    const handleCancelEdit = () => {
        setModalIsOpen(false);
    };
    const handleCancelTopic = () => {
        setModalIsOpenTopic(false);
    };
    const handleCancelNewCategory = () => {
        setModalIsOpenNewCategory(false);
    };
    const handleCancelNewTopic = () => {
        setModalIsOpenNewTopic(false);
    };

    const [topic, setTopic] = useState([]);
    const [category, setCategory] = useState([]);
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/category`);
            setCategory(response.data);
        } catch (error) {
            console.error(error);
        }
    };
     const fetchTopic = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/topic`);

                setTopic(response.data);
                // console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };
    useEffect(() => {
       
        fetchTopic();


        fetchCategory();


    }, []);


    const [images, setImages] = useState([]);
    const [img, setImg] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageURL, setImageURL] = useState('');

    const handleFileChange = (e) => {
        const files = e.target.files;
        setImg(files);
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            urls.push(url);
        }
        setSelectedImages(urls);
        console.log(urls);
    };

    const handleDeleteImageChose = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };
    const [imagesTopic, setImagesTopic] = useState([]);
    const [imgTopic, setImgTopic] = useState('');
    const [selectedImagesTopic, setSelectedImagesTopic] = useState([]);
    const [imageURLTopic, setImageURLTopic] = useState('');
    const [nameTopic, setNameTopic] = useState('');

    const handleFileChangeTopic = (e) => {
        const files = e.target.files;
        setImgTopic(files);
        const urlsTopic = [];
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            urlsTopic.push(url);
        }
        setSelectedImagesTopic(urlsTopic);
        console.log(urlsTopic);
    };

    const handleDeleteImageChoseTopic = (index) => {
        const updatedImages = [...imagesTopic];
        updatedImages.splice(index, 1);
        setSelectedImagesTopic(updatedImages);
    };

    const [name, setName] = useState('');

    const handClick = () => {
        const files = Array.from(document.querySelector('input[type=file]').files);

        files.forEach((file) => {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, file).then((value) => {
                console.log(value);
                getDownloadURL(value.ref).then((url) => {
                    setImageURL((prevUrls) => [...prevUrls, url]);

                    axios.post(`${BASE_API_URL}/api/category`, {
                        name: name,
                        image: url,
                        active: true,
                        activeHome: false

                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        window.alert('Bạn đã thêm danh mục thành công');
                        fetchCategory();
                        setModalIsOpenNewCategory(false);


                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
                });
            }).catch((error) => {
                console.error('Error uploading image:', error);
            });
        });
    }

    const handClickTopic = () => {
        const files = Array.from(document.querySelector('input[type=file]').files);

        files.forEach((file) => {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, file).then((value) => {
                console.log(value);
                getDownloadURL(value.ref).then((url) => {
                    setImageURLTopic((prevUrls) => [...prevUrls, url]);

                    axios.post(`${BASE_API_URL}/api/topic`, {
                        topicName: nameTopic,
                        topicImage: url,
                        active: true,

                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        window.alert('Bạn đã thêm Chủ đề mới thành công');
                        fetchTopic();
                        setModalIsOpenNewTopic(false);


                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
                });
            }).catch((error) => {
                console.error('Error uploading image:', error);
            });
        });
    }

    const updateCategory = async (id, active) => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/category/${id}?active=${active}`);
            // console.log(response.data);
            fetchCategory();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const updateTopic = async (id, active) => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/topic/${id}?active=${active}`);
            // console.log(response.data);
            fetchTopic();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };


    // chỉnh sửa danh mục

  
    const [nameEdit, setNameEdit] = useState('');
    const [activeHomeEdit, setActiveHomeEdit] = useState(false);
    const [isChecked, setIsChecked] = useState();

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        
    };
    const handClickCategoryEdit = (id) => {
        axios.put(`${BASE_API_URL}/api/category/update/${id}`, {
                        name: nameEdit,
                        image: "",
                        activeHome: isChecked

                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        window.alert('Bạn đã cập nhật danh mục thành công');
                        fetchCategory();
                        setModalIsOpen(false);


                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });  
    }
    // chỉnh sửa danh mục

    // chỉnh sửa chủ đề

    const [topicNameEdit, setTopicNameEdit] = useState('');
    const handClickTopicEdit = (id) => {
        axios.put(`${BASE_API_URL}/api/topic/update/${id}`, {
            topicName: topicNameEdit,

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            window.alert('Bạn đã cập nhật chủ đề thành công');
            fetchTopic();
            setModalIsOpenTopic(false);


        }).catch((error) => {
            console.error('Error uploading image:', error);
        });
    }









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
                <div className="row" >
                    <div className="col-md-12">
                        <Row className='mb-4'>
                            <Col className="mb-5 mb-xl-0" xl="6">
                                <Card className="shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4>Danh mục sản phẩm</h4>
                                                <Button onClick={() => handleOpenNewCategoru()}>+ Thêm danh mục</Button>
                                            </div>

                                        </Row>
                                    </CardHeader>
                                    <CardBody>

                                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            {category.map((item, index) => (
                                                <div key={index}>
                                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                                        <img src={item.image}
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}>
                                                        </img>
                                                        <div style={{ flex: '1', marginLeft: '10px' }}>
                                                            {item.name}
                                                        </div>
                                                        <div className="room-percentage" style={{ fontWeight: 'bold', fontSize: '30px', paddingRight: '10px' }}
                                                           >
                                                            <FaEdit style={{ marginRight: '10px' }} onClick={() => handleOpenCategory(item)}/> 
                                                            {item.active ? (<FaEye onClick={() => updateCategory(item.id, false)} />) : (<FaEyeSlash onClick={() => updateCategory(item.id, true)} />)}
                                                           
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                </div>
                                            ))}
                                        </div>

                                        <Modal title="Chỉnh sửa danh mục" visible={modalIsOpen}
                                            onOk={() => handClickCategoryEdit(item.id)}
                                            okText="Lưu"
                                            onCancel={handleCancelEdit}>

                                            <div className='mt-4'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Tên danh mục</Form.Label>
                                                    <Form.Control type="text" placeholder={item.name} className='border' value={nameEdit}
                                                    onChange={(e)=> setNameEdit(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ cursor: 'pointer' }}>

                                                    <Form.Group className="mb-3">
                                                        <Form.Check type="checkbox" label="Hiển thị danh mục ở trang chủ" checked={isChecked} onChange={handleCheckboxChange} />
                                                    </Form.Group>

                                                </Form.Group>
                                            








                                            </div>


                                        </Modal>


                                        {/* modal thêm danh mục */}
                                        <Modal title="Chỉnh giảm danh mục" visible={modalIsOpenNewCategory}
                                            onOk={handClick}
                                            okText="Lưu"
                                            onCancel={handleCancelNewCategory}>

                                            <div className='mt-4'>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Tên danh mục</Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập tên" className='border' value={name} onChange={(e) => setName(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ cursor: 'pointer' }}>



                                                </Form.Group>
                                                {/* <Button>Thêm hình ảnh</Button> */}

                                                <div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>

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

                                                    {/* <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button style={{ backgroundImage: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', fontWeight: 'bold', color: 'white' }} component="span"
                                                            // onClick={handClick}
                                                        >
                                                            Cập nhật
                                                        </Button>
                                                    </label> */}
                                                </div>



                                            </div>


                                        </Modal>





                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="6">
                                <Card className="bg-gradient-default shadow"  >
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4>Chủ đề</h4>
                                                <Button onClick={() => setModalIsOpenNewTopic(true)}>+ Thêm chủ đề</Button>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>

                                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            {topic.map((item, index) => (
                                                <div key={index}>
                                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                                        <img src={item.topicImage}
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}>
                                                        </img>
                                                        <div style={{ flex: '1', marginLeft: '10px' }}>
                                                            {item.topicName}
                                                        </div>
                                                        <div className="room-percentage" style={{ fontWeight: 'bold', fontSize: '30px', paddingRight: '10px' }}
                                                           >
                                                            <FaEdit style={{ marginRight: '10px' }} onClick={() => handleOpenTopic(item)} />
                                                            {item.active ? (<FaEye onClick={() => updateTopic(item.id, false)} />) : (<FaEyeSlash onClick={() => updateTopic(item.id, true)} />)}
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                </div>
                                            ))}
                                        </div>


                                        <Modal title="Chỉnh giảm danh mục" visible={modalIsOpenTopic}
                                            onOk={() => handClickTopicEdit(itemTopic.id)}
                                            okText="Lưu"
                                            onCancel={handleCancelTopic}>

                                            <div className='mt-4'>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Tên chủ đề</Form.Label>
                                                    <Form.Control type="text" placeholder={itemTopic.topicName} className='border' value={topicNameEdit}
                                                    onChange={(e) =>setTopicNameEdit(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ cursor: 'pointer' }}>



                                                </Form.Group>
                                                <Button>Chỉnh sửa hỉnh ảnh</Button>

                                            </div>


                                        </Modal>

                                        {/* modal thêm chủ đề */}

                                        <Modal title="Thêm chủ đề" visible={modalIsOpenNewTopic}
                                            onOk={handClickTopic}
                                            okText="Lưu"
                                            onCancel={handleCancelNewTopic}>

                                            <div className='mt-4'>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Tên chủ đề</Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập tên" className='border' value={nameTopic}
                                                    onChange={(e) => setNameTopic(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ cursor: 'pointer' }}>



                                                </Form.Group>


                                                <div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                                                        {selectedImagesTopic.map((imageTopic, index) => (
                                                            <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                                                                <img src={imageTopic} alt={`Selected ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                                <button onClick={() => handleDeleteImageChoseTopic(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>X</button>
                                                            </div>
                                                        ))}


                                                        <div style={{ position: 'relative' }}>
                                                            <input type="file" id="fileInputTopic" style={{ display: 'none' }} onChange={handleFileChangeTopic} multiple />

                                                            <label htmlFor="fileInputTopic" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '5px', color: '#333', transition: 'all .3s', }}>
                                                                <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Thêm ảnh
                                                            </label>
                                                        </div>

                                                    </div>

                                                    {/* <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button style={{ backgroundImage: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', fontWeight: 'bold', color: 'white' }} component="span"
                                                        // onClick={handClick}
                                                        >
                                                            Cập nhật
                                                        </Button>
                                                    </label> */}
                                                </div>

                                            </div>


                                        </Modal>





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

export default CategoryList;
