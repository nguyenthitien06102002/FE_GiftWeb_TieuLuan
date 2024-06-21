import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../utils/apiConfig';

const ChartLine = ({ year }) => {
  const [revenue, setRevenue] = useState([]);
  // console.log(year);

  const xLabels = [
    'th1',
    'th2',
    'th3',
    'th4',
    'th5',
    'th6',
    'th7',
    'th8',
    'th9',
    'th10',
    'th11',
    'th12',
  ];

  useEffect(() => {
    const getRevenueByMonth = async (year) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/orders/revenue/${year}`);
        // console.log(response.data);
        setRevenue(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getRevenueByMonth(year);
    const getAnnualRevenue = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/orders/annualRevenue`);
        // console.log(response.data);
        setRevenue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  }, [year]); // Add year as a dependency to the useEffect hook

  return (
    <LineChart
      height={300}
      series={[
        { data: revenue, label: 'Doanh số' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}

export default ChartLine;
