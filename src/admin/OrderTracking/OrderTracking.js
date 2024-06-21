import React from 'react';
import { FaShippingFast, FaClipboardList, FaStar , FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

const TrackingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Step = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const IconContainer = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  color: ${props => props.color};
`;

const Line = styled.div`
  height: 30px;
  width: 2px;
  background-color: #000;
  margin: 0 auto;
  background-color: ${props => props.color}; 
  
`;

const LastLine = styled(Line)`
  display: none;
 
`;

const OrderTracking = ({ status }) => {
  const getColor = (index) => {
    if (index < status) {
      return 'green'; // Bước đã hoàn thành: màu xanh
    } else if (index === status) {
      return 'orange'; // Bước đang thực hiện: màu cam
    } else {
      return 'gray'; // Bước chưa thực hiện: màu đen
    }
  };

  return (
    <TrackingContainer>
      <Step>
        <IconContainer color={getColor(0)}><FaClipboardList /></IconContainer>
        <div>Chờ xác nhận</div>
        <Line color={getColor(0)} />
      </Step>
      <Step>
        <IconContainer color={getColor(1)}><FaShippingFast /></IconContainer>
        <div>Đang vận chuyển</div>
        <Line color={getColor(1)} />
      </Step>
      <Step>
        <IconContainer color={getColor(2)}><FaCheck /></IconContainer>
        <div>Giao hàng thành công</div>
        <Line color={getColor(2)} />
      </Step>
      <Step>
        <IconContainer color={getColor(3)}><FaStar /></IconContainer>
        <div>Đánh giá</div>
      </Step>
    </TrackingContainer>
  );
};

export default OrderTracking;
