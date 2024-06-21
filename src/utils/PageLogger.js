import React, { useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from './apiConfig';


const withPageLogging = (WrappedComponent, pageName) => {
  const PageLogger = (props) => {
    console.log('PageLogger rendered with props:', props);
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
     

      axios.post(`${BASE_API_URL}/api/logs`, {
        userId: {
                id: userData.id
              },
              eventType: 'VISIT_PAGE',
              description: `User visited ${pageName} page`,
              level: 1,
            path: 'web' 
      })
        .then(response => {
          console.log('Log created:', response.data);
        })
        .catch(error => {
          console.error('Error creating log:', error);
        });


    }, []);
    return <WrappedComponent {...props} />;
  };

  return PageLogger;
};
export default withPageLogging;