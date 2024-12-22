import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Read = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const ReadtotalTime = JSON.parse(localStorage.getItem("ReadtotalTime")) || {
      totalHour: 0,
      totalMin: 0,
    };
    const ReadresetTime = JSON.parse(localStorage.getItem("ReadresetTime")) || {
      day: 0,
      month: 0,
      year: 0,
    };
    const Readflag = JSON.parse(localStorage.getItem("Readflag")) || false;
    const ReadstartFlag =
      JSON.parse(localStorage.getItem("ReadstartFlag")) || false;
    const ReadstartTime =
      JSON.parse(localStorage.getItem("ReadstartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: ReadtotalTime,
      resetTime: ReadresetTime,
      flag: Readflag,
      startFlag: ReadstartFlag,
      startTime: ReadstartTime,
    };
  };

  const [ReadtotalTime, setReadTotalTime] = useState(loadState().totalTime);
  const [ReadresetTime, setReadResetTime] = useState(loadState().resetTime);
  const [Readflag, setReadFlag] = useState(loadState().flag);
  const [ReadstartTime, setReadStartTime] = useState(loadState().startTime);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("ReadtotalTime", JSON.stringify(ReadtotalTime));
    localStorage.setItem("ReadresetTime", JSON.stringify(ReadresetTime));
    localStorage.setItem("Readflag", JSON.stringify(Readflag));
    localStorage.setItem("ReadstartTime", JSON.stringify(ReadstartTime)); // Save startTime to localStorage
  }, [ReadtotalTime, ReadresetTime, Readflag, ReadstartTime]);

  function start() {
    setReadFlag(true);
    const startDate = new Date();
    setReadStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setReadFlag(false);
    if (Readflag && ReadstartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(ReadstartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = ReadtotalTime.totalHour + currentHour;
      const newTotalMin = ReadtotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setReadTotalTime({ totalHour: finalTotalHour, totalMin: finalTotalMin });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setReadTotalTime({ totalHour: 0, totalMin: 0 });
    setReadStartTime(null); // Reset the startTime
    setReadResetTime({
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
            <h5 className="card-title">Read</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: Readflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {ReadresetTime.day}-{ReadresetTime.month}-
            {ReadresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {ReadtotalTime.totalHour} : {ReadtotalTime.totalMin}
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

export default Read;
