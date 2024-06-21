import React, { useEffect , useRef } from 'react';
import axios from 'axios';
import BASE_API_URL from './apiConfig';


const LogPage = ({ page, eventType, level }) => {
	const hasLoggedVisit = useRef(false);
	const userData = JSON.parse(localStorage.getItem('userData'));

	const logVisit = async () => {
		if (hasLoggedVisit.current) return; // Check if the visit has already been logged
		hasLoggedVisit.current = true; // Set the flag to true to prevent future logs
		const userId = userData ? userData.id : 1;
		try {
			await axios.post(`${BASE_API_URL}/api/logs`, {
				userId: {
					id: userId ,
				},
				eventType: eventType,
				description: page,
				level: level,
				path: `${window.location.pathname}`,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		logVisit();
	}, []);

	return null;

	
};

export default LogPage

export const logEvent = async (eventType, description, level) => {
	const userData = JSON.parse(localStorage.getItem('userData'));
	const userId = userData ? userData.id : 1;
	try {
		await axios.post(`${BASE_API_URL}/api/logs`, {
			userId: {
				id: userId,
			},
			eventType,
			description,
			level,
			path: window.location.pathname,
		});
	} catch (error) {
		console.error('Error logging event:', error);
	}
};