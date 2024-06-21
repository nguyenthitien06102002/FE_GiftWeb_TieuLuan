import { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const ShopList = ({ productItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Số sản phẩm trên mỗi trang
  const { categoryId } = useParams();

  useEffect(() => {
    setCurrentPage(1); 
  }, [productItems]);

  if (productItems.length === 0) {
    return <h1 className="not-found">Không tìm thấy sản phẩm!!</h1>;
  }

  // Nếu số lượng sản phẩm nhỏ hơn hoặc bằng 10, không cần hiển thị phân trang
  if (productItems.length <= productsPerPage) {
    return (
      <Row className="justify-content-center">
        {productItems.map((productItem) => (
          <ProductCard
            key={productItem.id}
            title={null}
            productItem={productItem}

          />
        ))}
      </Row>
    );
  }


  // Tính chỉ mục bắt đầu và kết thúc của sản phẩm trên trang hiện tại currentProductsconst reversedProducts = productsWithImages.reverse();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = productItems.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(productItems.length / productsPerPage);

  // Tạo một mảng các nút phân trang
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        variant={currentPage === i ? "secondary " : ""} 
        onClick={() => setCurrentPage(i)}
        disabled={currentPage === i}
        style={{ margin: '0 5px' }}

      >
        {i}
      </Button>
    );
  }

  return (
    <>
      <Row className="justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', background: '#8080800f' }}>
        {currentProducts
          .filter(productItem => productItem.active === true)
          .map((productItem) => (
            <ProductCard
              key={productItem.id}
              title={null}
              productItem={productItem}
            />
          ))}
      </Row>
      <div className="pagination d-flex justify-content-center">
        <Button
          variant="light"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </Button>
        {pageButtons}
        <Button
          variant="light"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </Button>
      </div>
    </>
  );
};

export default ShopList;
