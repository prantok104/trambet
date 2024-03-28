import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formattedTime = time.toLocaleTimeString();
  return <div suppressHydrationWarning={true}>{formattedTime}</div>;
};

export default Clock;
