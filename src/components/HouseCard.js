import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './HouseCard.module.css';

const HouseCard = ({ house }) => {
  const [houseDetails, setHouseDetails] = useState({
    currentLord: '',
    overlord: '',
    heir: '',
    loading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currentLordResponse, overlordResponse, heirResponse] = await Promise.all([
          house.currentLord && axios.get(house.currentLord),
          house.overlord && axios.get(house.overlord),
          house.heir && axios.get(house.heir),
        ]);

        setHouseDetails({
          currentLord: currentLordResponse?.data?.name || 'Unknown',
          overlord: overlordResponse?.data?.name || 'Unknown',
          heir: heirResponse?.data?.name || 'Unknown',
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching data', error);
        setHouseDetails({ loading: false });
      }
    };

    fetchData();
  }, [house.currentLord, house.overlord, house.heir]);

  const navigateToHouseDetail = () => {
    // Extracting the numeric ID from the house.url
    const houseId = house.url.match(/\d+/)[0];
    navigate(`/houses/${houseId}`);
  };

  return (
    <div className={styles.HouseCard} onClick={navigateToHouseDetail}>
      <h2>{house.name}</h2>
      <p>Words: {house.words}</p>
      <p>Seats: {house.seats.join(', ')}</p>
      <p>Current Lord: {houseDetails.loading ? 'Loading...' : houseDetails.currentLord}</p>
      <p>Overlord: {houseDetails.loading ? 'Loading...' : houseDetails.overlord}</p>
      <p>Heir: {houseDetails.loading ? 'Loading...' : houseDetails.heir}</p>
    </div>
  );
};

export default HouseCard;