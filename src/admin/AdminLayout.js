import React from 'react'
import AdminDashboard from './Dashboard/AdminDashboard'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AdminLayout = () => {
  // const navigate = useNavigate();
  // const userData = JSON.parse(localStorage.getItem('userData'));
  // useEffect(() => {
  
  //   if (!userData) {
  //     navigate('/login');
  //   }
  // }, [navigate]);


  return (
    
   <AdminDashboard/>
  )
}
