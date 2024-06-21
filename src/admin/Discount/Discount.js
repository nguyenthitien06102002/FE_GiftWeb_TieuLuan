import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminFooter from '../Footer/AdminFooter';
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import 'react-tabs/style/react-tabs.css';
import Table from 'react-bootstrap/Table';
import { Tabs } from 'antd';
import './discount.css';
import TableDiscount from './TableDiscount';
import BASE_API_URL from '../../utils/apiConfig';


const Discount = () => {
  const [discount, setDiscount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [happenning, setHappenning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [end, setEnd] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalOrder, setIsModalOrder] = useState(false);
  const [selected, setSelected] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalEdit = (row) => {
    setIsModalEdit(true);
    setSelected(row);

  };
  const showModalOrder = (id) => {
    setIsModalOrder(true);
    getOrder(id);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };
  const handleCancelOrder = () => {
    setIsModalOrder(false);
  };
  const onChange = (key) => {
    console.log(key);
  };


  const fetchReview = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/discount`);
      const reversedDiscount = response.data.reverse();
      setDiscount(reversedDiscount);
      const currentDateTime = new Date();
      const ongoingDiscounts = reversedDiscount.filter(discount => {
        const startDate = new Date(discount.startDate);
        const endDate = new Date(discount.endStart);
        return startDate <= currentDateTime && endDate >= currentDateTime;
      });
      setHappenning(ongoingDiscounts);
      const upcomingDiscounts = reversedDiscount.filter(discount => {
        const startDate = new Date(discount.startDate);
        return startDate > currentDateTime;
      });
      setUpcoming(upcomingDiscounts);
      const endDiscounts = reversedDiscount.filter(discount => {
        const endDate = new Date(discount.endStart);
        return endDate <= currentDateTime;
      });
      setEnd(endDiscounts);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchReview();
  }, []);


  const columns = [
    {
      name: 'Mã',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Code',
      selector: row => row.code,
      sortable: true,
    },
    {
      name: 'Giảm giá',
      selector: row => <p>{row.discountPercentage} %</p>,
      sortable: true,
    },
    {
      name: 'Bắt đầu',
      selector: row => row.startDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: 'Kết thúc',
      selector: row => row.endStart?.slice(0, 10),
      sortable: true,
    },
    {
      name: 'thời gian tạo',
      selector: row => row.creationDate?.slice(0, 10),
      sortable: true,
    },
    {
      name: 'Chi tiết',
      selector: row =>

        <div>
          <MdEdit style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }}
            onClick={() => showModalEdit(row)}
          />
          <FaEye style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() => showModalOrder(row.id)} />

          <MdDelete style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() => DeleteDiscount(row.id)} />


        </div>,
      sortable: true,
    },
  ];




  // create
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');

  const handStartDate = (e) => {
    const date = new Date(e.target.value)
    setStartDate(date);
  }
  const handEndDate = (e) => {
    const date = new Date(e.target.value)
    setEndDate(date);

  }


  let formattedDate, formattedDatee;
  const [codeNew, setCodeNew] = useState('');
  const [percentageNew, setPercentageNew] = useState('');
  const [dateStartEdit, SetDateStartEdit] = useState('');
  const [dateEndEdit, SetDateEndEdit] = useState('');


  if (selected.startDate) {
    const dates = new Date(selected.startDate);
    formattedDate = dates.toISOString().split('T')[0];
  }

  if (selected.endStart) {
    const datee = new Date(selected.endStart);
    formattedDatee = datee.toISOString().split('T')[0];
  }
  const [startDateNew, setStartDateNew] = useState('');
  const [endDateNew, setEndDateNew] = useState('');
  const handStartDateEdit = (e) => {
    const date = new Date(e.target.value)
    const formatted = date.toISOString().split('T')[0];
    setStartDateNew(formatted);
    SetDateStartEdit(date);
  }
  const handEndDateEdit = (e) => {
    const date = new Date(e.target.value)
    const fotmat = date.toISOString().split('T')[0];
    setEndDateNew(fotmat);
    SetDateEndEdit(date);

  }


  useEffect(() => {
    setCodeNew(selected.code);
    setPercentageNew(selected.discountPercentage);
    setStartDateNew(formattedDate);
    setEndDateNew(formattedDatee);
    SetDateStartEdit(selected.startDate);
    SetDateEndEdit(selected.endStart)
  }, [selected]);



  const CreateDiscount = async () => {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/discount`, {
        code: code,
        discountPercentage: percentage,
        active: true,
        startDate: startDate,
        endStart: endDate

      });
      window.alert('thêm mã giảm giá thành công');
      setIsModalVisible(false);
      fetchReview();



    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);

    }
  };

  const UpdateDiscount = async () => {
    try {
      const response = await axios.put(`${BASE_API_URL}/api/discount/update/${selected.id}`, {
        code: codeNew,
        discountPercentage: percentageNew,
        startDate: dateStartEdit,
        endStart: dateEndEdit

      });
      window.alert('cập nhật giảm giá thành công');
      setIsModalEdit(false);
      fetchReview();



    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);

    }
  };

  const DeleteDiscount = async (discountId) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/api/discount/delete/${discountId}`);
      window.alert('Xóa mã giảm giá thành công');
      fetchReview();
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);

    }
  };

  const [order, setOrder] = useState([]);
  const getOrder = async (discountId) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/orders/discount/${discountId}`);

      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);

    }
  };


  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: <TableDiscount
        discount={discount}
        loading={loading}
        columns={columns} />,
    },
    {
      key: '2',
      label: 'Đang diễn ra',
      children: <TableDiscount
        discount={happenning}
        loading={loading}
        columns={columns} />
    },
    {
      key: '3',
      label: 'Sắp diễn ra',
      children: <TableDiscount
        discount={upcoming}
        loading={loading}
        columns={columns} />
    },
    {
      key: '4',
      label: 'Kết thúc',
      children: <TableDiscount
        discount={end}
        loading={loading}
        columns={columns} />
    },
  ];







  return (
    <>
      <AdminLayout >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='mb-4'>
                  <h2>Mã giảm giá</h2>
                  <div>
                    <Button type="primary" className="tag-button" style={{ marginRight: '10px' }} onClick={showModal}
                    >
                      + Thêm mã giảm giá
                    </Button>
                    {/* <Button type="primary" className="tag-import">
                      Import
                    </Button> */}
                  </div>

                </div>
                <div>
                
                  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

                </div>

              </div>
            </div>

          </div>
        </div>
        <AdminFooter />
      </AdminLayout>


      {/* <modal></modal> */}
      <Modal title="Thêm mã giảm giá" visible={isModalVisible}
        onOk={CreateDiscount}
        okText="Lưu"
        onCancel={handleCancel}>
        {/* <Form> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Mã code</Form.Label>
          <Form.Control type="text" placeholder="Nhập mã code" className='border'
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDiscount">
          <Form.Label>Phần trăm giảm giá</Form.Label>
          <Form.Control type="number" placeholder="Nhập phần trăm giảm giá"
            onChange={(e) => setPercentage(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control type="date" onChange={handStartDate} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control type="date" onChange={handEndDate} />
        </Form.Group>


      </Modal>

      {/* modalEdit */}

      <Modal title="Chỉnh giảm giá" visible={isModalEdit}
        onOk={UpdateDiscount}
        okText="Lưu"
        onCancel={handleCancelEdit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Mã code</Form.Label>
          <Form.Control type="text" value={codeNew} className='border'
            onChange={(e) => setCodeNew(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDiscount">
          <Form.Label>Phần trăm giảm giá</Form.Label>
          <Form.Control type="number" value={percentageNew}
            onChange={(e) => setPercentageNew(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control type="date" onChange={handStartDateEdit} value={startDateNew} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control type="date" onChange={handEndDateEdit} value={endDateNew} />
        </Form.Group>
      </Modal>
      {/* modalEdit */}

      {/* modalOrder */}

      <Modal title="Đơn hàng đã sử dụng" visible={isModalOrder}
        onOk={handleCancelOrder}
        okText="OK"
        onCancel={handleCancelOrder}>


        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Mã đơn hàng</th>
              <th>Người dùng</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>

            {order ? (
              <>
                {order.map((order) =>
                  <tr>

                    <td>{order.id}</td>
                    <td>{order.userId.userName}</td>
                    <td>{order.createTime.slice(0, 10)}</td>
                  </tr>
                )}
              </>

            ) : (
              <p>Không có đơn hàng nào</p>
            )}

          </tbody>
        </Table>




      </Modal>


      {/* modalOrder */}
    </>
  )
}
export default Discount;