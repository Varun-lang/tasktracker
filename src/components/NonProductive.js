import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NonProductive = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const NonProductivetotalTime = JSON.parse(
      localStorage.getItem("NonProductivetotalTime")
    ) || { totalHour: 0, totalMin: 0 };
    const NonProductiveresetTime = JSON.parse(
      localStorage.getItem("NonProductiveresetTime")
    ) || { day: 0, month: 0, year: 0 };
    const NonProductiveflag =
      JSON.parse(localStorage.getItem("NonProductiveflag")) || false;
    const NonProductivestartFlag =
      JSON.parse(localStorage.getItem("NonProductivestartFlag")) || false;
    const NonProductivestartTime =
      JSON.parse(localStorage.getItem("NonProductivestartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: NonProductivetotalTime,
      resetTime: NonProductiveresetTime,
      flag: NonProductiveflag,
      startFlag: NonProductivestartFlag,
      startTime: NonProductivestartTime,
    };
  };

  const [NonProductivetotalTime, setNonProductiveTotalTime] = useState(
    loadState().totalTime
  );
  const [NonProductiveresetTime, setNonProductiveResetTime] = useState(
    loadState().resetTime
  );
  const [NonProductiveflag, setNonProductiveFlag] = useState(loadState().flag);
  const [NonProductivestartTime, setNonProductiveStartTime] = useState(
    loadState().startTime
  );

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem(
      "NonProductivetotalTime",
      JSON.stringify(NonProductivetotalTime)
    );
    localStorage.setItem(
      "NonProductiveresetTime",
      JSON.stringify(NonProductiveresetTime)
    );
    localStorage.setItem(
      "NonProductiveflag",
      JSON.stringify(NonProductiveflag)
    );
    localStorage.setItem(
      "NonProductivestartTime",
      JSON.stringify(NonProductivestartTime)
    ); // Save startTime to localStorage
  }, [
    NonProductivetotalTime,
    NonProductiveresetTime,
    NonProductiveflag,
    NonProductivestartTime,
  ]);

  function start() {
    setNonProductiveFlag(true);
    const startDate = new Date();
    setNonProductiveStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setNonProductiveFlag(false);
    if (NonProductiveflag && NonProductivestartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(NonProductivestartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = NonProductivetotalTime.totalHour + currentHour;
      const newTotalMin = NonProductivetotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setNonProductiveTotalTime({
        totalHour: finalTotalHour,
        totalMin: finalTotalMin,
      });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setNonProductiveTotalTime({ totalHour: 0, totalMin: 0 });
    setNonProductiveStartTime(null); // Reset the startTime
    setNonProductiveResetTime({
      day: resetDate.getDate(),
      month: resetDate.getMonth() + 1, // Months are 0-indexed
      year: resetDate.getFullYear(),
    });
    toast.success("Timer Reset");
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "18rem", padding: "20px" }}>
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <h5 className="card-title">NonProductive</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: NonProductiveflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {NonProductiveresetTime.day}-
            {NonProductiveresetTime.month}-{NonProductiveresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {NonProductivetotalTime.totalHour} :{" "}
              {NonProductivetotalTime.totalMin}
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
};

export default NonProductive;
