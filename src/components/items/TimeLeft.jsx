import React from "react";
import { useState, useEffect } from "react";

function TimeLeft({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState("");
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = expiryDate - now;
  
        if (difference > 0) {
          const secondsLeft = Math.floor((difference / 1000) % 60);
          const minutesLeft = Math.floor((difference / 1000 / 60) % 60);
          const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
  
          setTimeLeft(`${hoursLeft} h ${minutesLeft} m ${secondsLeft} s`);
        } else {
          setTimeLeft("Expired");
        }
      };
  
      calculateTimeLeft(); 
      const timer = setInterval(calculateTimeLeft, 1000); 
  
      return () => clearInterval(timer); 
    }, [expiryDate]);
  
    return (
      <div>
        {expiryDate ? (
          <div className="de_countdown">
            {timeLeft}
          </div>
        ) : (
        <div className="de_countdown">
          Expired
        </div>
        )}
      </div>
    );
  }

  export default TimeLeft;