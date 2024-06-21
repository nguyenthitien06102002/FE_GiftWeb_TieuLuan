import React, { useEffect, useState, useRef } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import numeral from 'numeral';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactPaginate from 'react-paginate';


import './Appointments.css';
import BASE_API_URL from '../../utils/apiConfig';

const AdminAppointments = () => {

	const router = useNavigate();
	const handelNewProduct = () => {
		router(`/admin/newProduct`);
	};
	const handelEditProduct = (idProduct) => {
		router(`/admin/editProduct/${idProduct}`);
	};

	const [products, setProducts] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const perPage = 10;

	const fetchProducts = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/api/products`);
			const productsWithImages = await Promise.all(response.data.map(async (product) => {
				const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/first/${product.id}`);
				return { ...product, imageUrl: imageResponse.data.imgPath };
			}));
			const reversedProducts = productsWithImages.reverse();
			setProducts(reversedProducts);
			setPageCount(Math.ceil(reversedProducts.length / perPage));
		} catch (error) {
			console.error(error);
		}
	};

	  

	useEffect(() => {


		fetchProducts();

	}, []);


	const handleDeleteProduct = (idProduct) => {
		deleteProduct(idProduct);
	};


	const deleteProduct = async (idProduct, name) => {
		try {
		
		  const confirmDelete = window.confirm('Bạn muốn xóa sản phẩm ' + name + ' ?');
		
		  if (confirmDelete) {

			  const response = await axios.put(`${BASE_API_URL}/api/products/deleteProduct/${idProduct}`);
		
			fetchProducts();
		  }
		} catch (error) {
		  console.error(error);
		}
	  };
	  


	// Xử lý sự kiện chuyển trang
	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected);
	};

	// Tính index của sản phẩm bắt đầu và kết thúc của trang hiện tại
	const startIndex = currentPage * perPage;
	const endIndex = startIndex + perPage;


	//import
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');
	const fileInputRef = useRef(null);

	const handleFileChange = async (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		if (selectedFile) {
			const formData = new FormData();
			formData.append('file', selectedFile);

			try {
				const response = await axios.post(`${BASE_API_URL}/api/products/upload`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				setMessage('Upload successful!');
				fetchProducts(); 
			} catch (error) {
				setMessage('Upload failed!');
				console.error(error);
			}
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};


	return (
		<>
			<AdminLayout >
				<div className="row">
					<div className="col-md-12">


						<div className="card">
							<div className="card-body">
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='mb-4'>
									<h2>Tất cả sản phẩm</h2>
									<div>
										<Button type="primary" className="tag-button" style={{ marginRight: '10px' }} onClick={handelNewProduct}>
											+ Thêm sản phẩm
										</Button>
										{/* <Button type="primary" className="tag-import">
											Import
										</Button>
										<form onSubmit={handleSubmit}>
											<input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
											<button type="submit">Upload</button>
										</form> */}

										<Button type="primary" className="tag-import" onClick={handleButtonClick}>
											Import
										</Button>
										<input
											type="file"
											accept=".xlsx, .xls"
											ref={fileInputRef}
											style={{ display: 'none' }}
											onChange={handleFileChange}
										/>
								
										{message && <p>{message}</p>}
									</div>

								</div>

								{/* table 1 */}

								<div className="table-responsive">
									<table className="datatable table table-hover table-center mb-0">
										<thead>
											<tr>
												<th>Tên sản phẩm</th>
												<th>Phân loại</th>
												<th>Giá</th>
												<th>Thời gian tạo</th>
												<th>Trạng trái</th>
												<th>Số lượng</th>
												<th className="text-right"> </th>
											</tr>
										</thead>
										<tbody>

											{products.slice(startIndex, endIndex)
												// .filter(product => product.status === true)
												.map((product) => (
													<tr key={product.id}>
														<td className="centered table-avatar">

															<a className="avatar avatar-sm ">
																<img className="avatar-img rounded-circle" src={product.imageUrl} alt="" /></a>

															<a className='pt-2'>{product.productName}</a>



														</td>
														<td className="centered">
															{product.categoryId.name}
														</td>
														<td className="centered">

															{numeral(product.salePrice).format('0,0')}đ

														</td>
														<td className="centered">
															<span className="text-primary d-block">{product.createDate.slice(0, 10)}</span></td>
														<td className="centered">
															<div className="status-toggle">
																{product.active === true ? (<FaEye style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />) : (<FaEyeSlash style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />)
																}

																{/* <Button type="primary" className="tag-primary">
															Hiển thị
														</Button> */}

															</div>
														</td>
														<td className="centered">
															{product.stock}
														</td>
														<td className="centered" style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }}>
															<MdEdit onClick={() => handelEditProduct(product.id)} />
															<MdDelete onClick={() => deleteProduct(product.id, product.productName)} />
														</td>
													</tr>
												))}


											{/* <tr>
												<td className="centered table-avatar">

													<a className="avatar avatar-sm ">
														<img className="avatar-img rounded-circle" src="https://i.pinimg.com/736x/54/a6/fb/54a6fb265daa9d3f7fd0fc721350ad84.jpg" alt="" /></a>

													<a className='pt-2'>Beyon Woo Seok  Beyon Woo Seok Beyon Woo Seok Beyon Woo Seok </a>



												</td>
												<td className="centered">
													Dental</td>
												<td className="centered">

													$200.00


												</td>
												<td className="centered">
													<span className="text-primary d-block">11.00 AM - 11.15 AM</span></td>
												<td className="centered">
													<div className="status-toggle">

														<Button style={{backgroundColor: '#DCF2F1', color: 'gray'}}>
															Ẩn
														</Button>
													</div>
												</td>
												<td className="centered">
													50
												</td>
												<td className="centered" style={{fontSize: '20px', color: 'gray'}}>
													<MdEdit/> <MdDelete />
												</td>
											</tr> */}
										</tbody>

									</table>
									{/* Phân trang */}
									<div className='m-3'>
										<ReactPaginate
											previousLabel={<i className="fa fa-angle-left"></i>}
											nextLabel={<i className="fa fa-angle-right"></i>}
											breakLabel={<span>...</span>}
											pageCount={pageCount}
											marginPagesDisplayed={2}
											pageRangeDisplayed={5}
											onPageChange={handlePageClick}
											containerClassName={'pagination'}
											activeClassName={'active'}
											pageClassName={'page-item'}
											pageLinkClassName={'page-link'}
											previousClassName={'page-item'}
											nextClassName={'page-item'}
											previousLinkClassName={'page-link'}
											nextLinkClassName={'page-link'}
											breakClassName={'page-item'}
											breakLinkClassName={'page-link'}
										/>
									</div>



								</div>

								{/* table 1 */}


							</div>
						</div>

					</div>
				</div>
			</AdminLayout>
		</>
	)
}
export default AdminAppointments;