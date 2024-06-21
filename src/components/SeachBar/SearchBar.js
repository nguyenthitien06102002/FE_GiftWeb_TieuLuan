import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";
import { logEvent } from "../../utils/LogPage";
import BASE_API_URL from "../../utils/apiConfig";



const SearchBar = ({isFixed}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true); // Thêm state mới để theo dõi trạng thái hiển thị của danh sách gợi ý
  const router = useNavigate();
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/products`);
        const products = response.data.map((product) => product.productName);
        setSuggestions(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const matchedProducts = suggestions.filter((product) =>
      product && product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuggestions(matchedProducts);
  }, [searchTerm, suggestions]);

  const handleSearchChange = async(event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // await logEvent('SEARCH', `with: ${searchTerm}`, '1');
    setShowSuggestions(true); // Hiển thị danh sách gợi ý khi người dùng tiếp tục nhập
  };
  const handleSearchClick = async () => {
    await logEvent('SEARCH', `with: ${searchTerm}`, '1');
    // Thực hiện tìm kiếm hoặc các hành động khác ở đây
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router(`/shop/product/${searchTerm}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Ẩn danh sách gợi ý khi một gợi ý được chọn
    router(`/shop/product/${suggestion}`);
  };

  return (
    <div className="search-container"
      style={{
        border: isFixed ? '1px solid #070707' : '1px solid white',
        position: 'relative', zIndex: '9999'
      }}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"  
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          onBlur={() => setShowSuggestions(true)}
          style={{
            color: isFixed ? '#333' : 'white'
          }}
        />
        <button type="submit" className="search-icon" onClick={handleSearchClick}>
          <ion-icon className="search-icon" name="search-outline"
            style={{
              color: isFixed ? 'black' : 'white'
            }}></ion-icon>
        </button>
      </form>

      {searchTerm && showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((product, index) => (
            <li key={index} onClick={() => handleSuggestionClick(product)}>
              {product}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
