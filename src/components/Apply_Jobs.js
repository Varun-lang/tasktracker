import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import toast from "react-hot-toast";

function Apply_Jobs() {
  const [totalTime, setTotalTime] = useState({ totalHour: 0, totalMin: 0 });
  const [readStart, setReadStart] = useState({ hours: null, min: null });
  const [resetTime, setResetTime] = useState({ day: 0, month: 0, year: 0 });

  const currentDate = new Date();

  function start() {
    if (readStart.hours == null) {
      const hours = currentDate.getHours();
      const min = currentDate.getMinutes();
      setReadStart({ hours, min });
      console.log({ hours, min });
      toast.success("Timer Started");
    }
  }

  function stop() {
    const currentDate = new Date();
    const stopHour = currentDate.getHours();
    const stopMin = currentDate.getMinutes();
    console.log(stopHour, stopMin);

    // Calculate total minutes first to handle cases where minutes roll over
    let totalMin = stopMin - readStart.min;
    let totalHour = stopHour - readStart.hours;

    if (totalMin < 0) {
      totalMin += 60; // If minutes are negative, add 60 to normalize
      totalHour -= 1; // Subtract 1 hour since minutes are less
    }

    // If totalHour is negative, adjust for 24-hour format
    if (totalHour < 0) {
      totalHour += 24;
    }

    setTotalTime({ totalHour, totalMin });
    console.log({ totalHour, totalMin });
    toast.success("Timer Stoped!");
  }

  function reset() {
    stop();
    const currentDate = new Date();
    setTotalTime({ totalHour: 0, totalMin: 0 });
    setReadStart({ hours: null, min: null });
    setResetTime({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1, // Months are 0-indexed
      year: currentDate.getFullYear(),
    });
    toast.success("Timer Reset");
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "18rem", padding: "20px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Apply Jobs</h5>
          <p className="card-text text-center">
            Last Reset: {resetTime.day} - {resetTime.month} - {resetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {totalTime.totalHour} : {totalTime.totalMin}
            </p>
          </div>
          <div className="d-flex justify-content-around mt-4">
            <button className="btn btn-primary" onClick={start}>
              Start
            </button>
            <button className="btn btn-danger" onClick={stop}>
              Stop
            </button>
            <button className="btn btn-secondary" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply_Jobs;
