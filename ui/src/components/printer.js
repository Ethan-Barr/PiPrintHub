/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles/printer.css';

const Printer = ({ printerName, printerPort, printerBaudrate }) => {
    const [bedTemperature, setBedTemperature] = useState('');
    const [hotendTemperature, setHotendTemperature] = useState('');
    const [status, setStatus] = useState('Not connected');
    const [isConnected, setIsConnected] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [printJob, setPrintJob] = useState({ name: '', status: '' });

    useEffect(() => {
        refreshPrinterData();
    }, [isRefreshing, printerPort, printerBaudrate]);

    const refreshPrinterData = () => {
        if (isRefreshing) {
            checkPrinterConnection(printerPort, printerBaudrate);

            if (isConnected) {
                checkBedTemp(printerPort, printerBaudrate);
                checkHotendTemp(printerPort, printerBaudrate);
                checkPrintJob(printerPort, printerBaudrate);
            }
        }
    };

    const checkPrinterConnection = (port, baudrate) => {
        axios.get("http://localhost:8000/printer/connected", {
            headers: {
                'port': port,
                'baudrate': baudrate
            }
        })
            .then(function (response) {
                setIsConnected(response.data.connected);
                setStatus(response.data.connected ? 'Connected' : 'Offline');
            })
            .catch(function (error) {
                console.error('Error checking connection:', error);
            });
    };

    const checkBedTemp = (port, baudrate) => {
        axios.get('http://localhost:8000/temp/bed', {
            headers: {
                'port': port,
                'baudrate': baudrate
            }
        })
            .then(function (response) {
                setBedTemperature(response.data.bed_temperature);
            })
            .catch(function (error) {
                console.error('Error checking bed temperature:', error);
            });
    };

    const checkHotendTemp = (port, baudrate) => {
        axios.get('http://localhost:8000/temp/hotend', {
            headers: {
                'port': port,
                'baudrate': baudrate
            }
        })
            .then(function (response) {
                setHotendTemperature(response.data.hotend_temperature);
            })
            .catch(function (error) {
                console.error('Error checking hotend temperature:', error);
            });
    };

    const pausePrintJob = () => {
        axios.get('http://localhost:8000/print/pause', {
            headers: {
                'port': printerPort,
                'baudrate': printerBaudrate
            }
        })
            .then(function (response) {
                console.log(response.data);
                // Add logic for handling the response or updating the UI if needed
            })
            .catch(function (error) {
                console.error('Error pausing print job:', error);
            });
    };

    const stopPrintJob = () => {
        axios.get('http://localhost:8000/print/stop', {
            headers: {
                'port': printerPort,
                'baudrate': printerBaudrate
            }
        })
            .then(function (response) {
                console.log(response.data);
                // Add logic for handling the response or updating the UI if needed
            })
            .catch(function (error) {
                console.error('Error stopping print job:', error);
            });
    };

    const checkPrintJob = (port, baudrate) => {
        axios.get('http://localhost:8000/print/job', {
            headers: {
                'port': port,
                'baudrate': baudrate
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
