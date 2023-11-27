import React, { useState, useEffect } from "react";
import axios from 'axios';

import './styles/printer.css';

const Printer = ({ name }) => {
    const [temperature, setTemperature] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    // Function to check printer connection status
    const checkPrinterConnection = () => {
        axios.get('http://localhost:8000/check-connection')
            .then(function (response) {
                setIsConnected(response.data.connected);
            })
            .catch(function (error) {
                console.error('Error checking connection:', error);
            });
    };

    const getTemperature = () => {
        axios.get('http://localhost:8000/get-temperature')
            .then(function (response) {
                setTemperature(response.data);
            })
            
            .catch(function (error) {
                console.error('Error getting temperature:', error);
            });
    };

    const handleSetTemperature = () => {
        checkPrinterConnection();
    };

    useEffect(() => {
        checkPrinterConnection();

        const temperatureInterval = setInterval(() => {
            getTemperature();
        }, 1000);

        return () => clearInterval(temperatureInterval);
    }, []);

    return (
        <div className="printer">
            <div className="header">
                <h1>{name}</h1>
            </div>
            <div className="status">
                <p>Status: {isConnected ? 'Online' : 'Offline'}</p>
                <p>Hotend temp: {temperature.hotend}C</p>
                <p>Bed temp: {temperature.bed}C</p>
            </div>
            <div className="set-temp">
                {/* Your set temperature form goes here */}
                <button onClick={handleSetTemperature}>Set Temperature</button>
            </div>
        </div>
    );
};

export default Printer;
