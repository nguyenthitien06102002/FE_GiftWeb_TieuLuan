import React from 'react'


const Item = ({ product, onRemove }) => {
 

   
    return (
        <div>

            <div className="product-item">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="price">
                        <span className="unit-price">{product.price}₫</span>
                        <span className="quantity">x {product.quantity}</span>
                    </div>
                    <div className="total">{product.total}₫</div>
                </div>
                <button className="btn-remove" onClick={() => onRemove(product.id)}>Xóa</button>
            </div>
        </div>
    )
}

export default Item