import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../utils/apiConfig';

const ChartBar = ({year}) => {
  const [totalOrder, setTotalOrder] = useState([]);

  useEffect(() => {
    const getOrderByMonth = async (year) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/orders/total-order/${year}`);
         console.log(response.data);
        setTotalOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrderByMonth(year);
 
  }, [year]);

  return (
    <BarChart
    xAxis={[{ scaleType: 'band', data: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11', '12']}]}
    series={[{ data: totalOrder }]}
    // width={500}
    height={300}
  />
  
  )
}

export default ChartBar