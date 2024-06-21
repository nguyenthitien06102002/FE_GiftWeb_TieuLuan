

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PaypalPayment = ({total, onSubmit}) => {


 
  //chuyển đổi tiền tệ
  const exchangeRate = 0.00003930;
  const totalInVND = total;
  const totalInUSD = totalInVND * exchangeRate;
  // Hàm xử lý khi tạo đơn hàng
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Math.round(totalInUSD), 
            currency_code: "USD" 
          }
        }
      ]
    });
  };

  // Hàm xử lý khi đơn hàng được xác nhận
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      onSubmit();
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AWDH_rV_8PWbKIWHI2W3q3g4wTY56uuwtoeoNFUYrR8DvTt2MYi5RVMheM-bYAF1QMWQgZO2l_53Jbdt" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PaypalPayment;
