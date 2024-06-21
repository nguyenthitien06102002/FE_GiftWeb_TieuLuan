import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./product-review.css";
import ReactStars from "react-rating-stars-component";

const ProductReviews = ({ selectedProduct, reviews, replies }) => {
  const [listSelected, setListSelected] = useState("desc");
  const selectedProductt = {
    detail: selectedProduct?.detail
  };



  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Mô tả sản phẩm
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Đánh giá ({reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (

          <div dangerouslySetInnerHTML={{ __html: selectedProductt?.detail }} />
        ) : (
          <div className="rates">


            {reviews !== null && reviews.length > 0 ? (
              <>
                {reviews
                  .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
                  .map((review) => (
                    <>
                      
                      <div className="align-items-center mt-3" style={{ width: '100%' }}>
                        <div className="d-flex" style={{ width: '100%' }}>
                          
                          <div style={{ width: '100%' }}>
                            <h6 className='product-name pt-2 flex-grow-1'>{review.userId.userName}</h6>
                            <ReactStars
                              count={review.rating}
                              // value={5}
                              size={27}
                              color="#ffd700"
                            />
                            <p style={{ fontSize: '12px', color: 'gray' }}>{review?.createDate?.slice(0, 10)}</p>
                            <p className='product-price'>{review?.content}</p>
                            {review.status === 2 ? (
                              <div style={{ background: 'rgba(0, 128, 0, 0.1)', width: '100%', boxSizing: 'border-box', padding: '20px' }}>
                                <h6>Phản hồi từ người bán</h6>
                                <p>{replies.content}</p>

                              </div>
                            ) : (
                              null
                            )}

                          </div>
                        </div>
                      </div>





                      <hr class="hr" />
                    </>
                  ))}
              </>
            ) : (
              <p>Chưa có đánh giá nào</p>
            )}




          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
