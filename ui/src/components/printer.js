import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles/printer.css';

const Printer = ({ printerName, printerPort }) => {
    const [bedTemperature, setBedTemperature] = useState('');
    const [hotendTemperature, setHotendTemperature] = useState('');
    const [status, setStatus] = useState('Not connected');
    const [isConnected, setIsConnected] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(true); // Added state for 
    const [printJob, setPrintJob] = useState({ name: '', status: '' });


    // Check status - Connection and stats (Printing, idle, paused, etc.)
    const refreshPrinterData = () => {
        if (isRefreshing) {
            checkPrinterConnection(printerPort);

            if (isConnected) {
                checkBedTemp(printerPort);
                checkHotendTemp(printerPort);
                checkPrintJob(printerPort);
            }
        }
    };


    const checkPrinterConnection = (port) => {
        axios.get("http://localhost:8000/printer/connected", {
            headers: {
                'port': port
            }
        })
            .then(function (response) {
                setIsConnected(response.data);
                setStatus(response.data ? 'Connected' : 'Offline');
            })
            .catch(function (error) {
                console.error('Error checking connection:', error);
            });
    };

    // Get temp
    const checkBedTemp = (port) => {
        axios.get('http://localhost:8000/temp/bed', {
            headers: {
                'port': port
            }
        })
            .then(function (response) {
                setBedTemperature(response.data);
            })
            .catch(function (error) {
                console.error('Error checking bed temperature:', error);
            });
    };

    const checkHotendTemp = (port) => {
        axios.get('http://localhost:8000/temp/hotend', {
            headers: {
                'port': port
            }
        })
            .then(function (response) {
                setHotendTemperature(response.data);
            })
            .catch(function (error) {
                console.error('Error checking hotend temperature:', error);
            });
    };
    

    const pausePrintJob = () => {
        // Implement the logic to pause the print job using an API request
    };

    const stopPrintJob = () => {
        // Implement the logic to stop the print job using an API request
    };

    const checkPrintJob = (port) => {
        axios.get('http://localhost:8000/print/job', {
            headers: {
                'port': port
            }
        })
            .then(function (response) {
                setPrintJob(response.data);
            })
            .catch(function (error) {
                console.error('Error checking print job:', error);
            });
    };

    return (
        <div className="printer-container">
            <div className="Header">
                <div className="printer-info">
                    <h3>{printerName}</h3>
                    <button className="refresh-btn" onClick={refreshPrinterData}>
                        <span className="refresh-icon">&#8635;</span>
                    </button>
                </div>
                <div className={`logo ${isConnected ? 'connected' : 'disconnected'}`} onClick={refreshPrinterData}></div>
            </div>
            <div className="status">
                <p>Status: {status}</p>
                <div className="divider-20px" />
                <p>Bed Temperature: {bedTemperature}</p>
                <p>Hotend Temperature: {hotendTemperature}</p>
                <div className="divider-20px" />
                <p>Job Name: {printJob.name}</p>
                <p>Job Status: {printJob.status}</p>
                <div className="divider-20px" />
                <button className="control-btn" onClick={pausePrintJob}>Pause</button>
                <button className="control-btn" onClick={stopPrintJob}>Stop</button>
            </div>
        </div>
    );
}

export default Printer;
