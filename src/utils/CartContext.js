import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from './apiConfig';

export const CartContext = createContext();
// Tạo một custom hook để sử dụng context
export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const fetchCartItemsCount = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.id) {
            return;
        }
        try {
            const response = await axios.get(`${BASE_API_URL}/api/cart/items/${userData.id}`);
            // Tính tổng số lượng sản phẩm trong giỏ hàng
            const itemCount = response.data.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(itemCount);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    useEffect(() => {


        fetchCartItemsCount();
    }, []);
    // const [loading, setLoading] = useState(true);

    // // Kiểm tra xem có thông tin người dùng trong localStorage không
    // const userData = JSON.parse(localStorage.getItem('userData'));

    // useEffect(() => {
    //     if (userData && userData.id) {
    //         fetchCartItem();
    //         const interval = setInterval(fetchCartItem, 10); // Cập nhật số lượng sản phẩm mỗi 60 giây
    //         return () => clearInterval(interval);
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);

    // const fetchCartItem = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/cart/item?userID=${userData.id}`);
    //         const productsWithImages = await Promise.all(response.data.map(async (item) => {
    //             const imageResponse = await axios.get(`http://localhost:8080/api/imgProducts/first/${item.product.id}`);
    //         return { ...item, imageUrl: imageResponse.data.imgPath };

    //         }));
    //         setCartItems(productsWithImages); 
    //          setLoading(false); 

    //     } catch (error) {
    //         console.error('Error fetching cart items:', error);
    //         setLoading(false);
    //     }
    // };

    // const removeFromCart = async (productId) => {
    //     try {
    //         // Gửi yêu cầu DELETE để xóa sản phẩm khỏi giỏ hàng
    //         await axios.delete(`http://localhost:8080/api/cart/clear/${userData.id}/${productId}`);
    //         // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    //         fetchCartItem();
    //     } catch (error) {
    //         console.error('Error removing item from cart:', error);
    //     }
    // };


    // const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItemCount, fetchCartItemsCount }}>
            {children}
        </CartContext.Provider>
    );
};
