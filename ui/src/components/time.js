import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric', 
    };

    const pStyle = {
        margin: 0,
    };

    return (
        <div>
            <p style={pStyle}>{time.toLocaleTimeString([], timeOptions)}</p>
            <p style={pStyle}>{time.toLocaleDateString([], dateOptions)}</p>
        </div>
    );
}

export default Clock;