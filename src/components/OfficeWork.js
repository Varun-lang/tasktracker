import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const OfficeWork = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const OfficeWorktotalTime = JSON.parse(
      localStorage.getItem("OfficeWorktotalTime")
    ) || { totalHour: 0, totalMin: 0 };
    const OfficeWorkresetTime = JSON.parse(
      localStorage.getItem("OfficeWorkresetTime")
    ) || { day: 0, month: 0, year: 0 };
    const OfficeWorkflag =
      JSON.parse(localStorage.getItem("OfficeWorkflag")) || false;
    const OfficeWorkstartFlag =
      JSON.parse(localStorage.getItem("OfficeWorkstartFlag")) || false;
    const OfficeWorkstartTime =
      JSON.parse(localStorage.getItem("OfficeWorkstartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: OfficeWorktotalTime,
      resetTime: OfficeWorkresetTime,
      flag: OfficeWorkflag,
      startFlag: OfficeWorkstartFlag,
      startTime: OfficeWorkstartTime,
    };
  };

  const [OfficeWorktotalTime, setOfficeWorkTotalTime] = useState(
    loadState().totalTime
  );
  const [OfficeWorkresetTime, setOfficeWorkResetTime] = useState(
    loadState().resetTime
  );
  const [OfficeWorkflag, setOfficeWorkFlag] = useState(loadState().flag);
  const [OfficeWorkstartTime, setOfficeWorkStartTime] = useState(
    loadState().startTime
  );

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem(
      "OfficeWorktotalTime",
      JSON.stringify(OfficeWorktotalTime)
    );
    localStorage.setItem(
      "OfficeWorkresetTime",
      JSON.stringify(OfficeWorkresetTime)
    );
    localStorage.setItem("OfficeWorkflag", JSON.stringify(OfficeWorkflag));
    localStorage.setItem(
      "OfficeWorkstartTime",
      JSON.stringify(OfficeWorkstartTime)
    ); // Save startTime to localStorage
  }, [
    OfficeWorktotalTime,
    OfficeWorkresetTime,
    OfficeWorkflag,
    OfficeWorkstartTime,
  ]);

  function start() {
    setOfficeWorkFlag(true);
    const startDate = new Date();
    setOfficeWorkStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setOfficeWorkFlag(false);
    if (OfficeWorkflag && OfficeWorkstartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(OfficeWorkstartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = OfficeWorktotalTime.totalHour + currentHour;
      const newTotalMin = OfficeWorktotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setOfficeWorkTotalTime({
        totalHour: finalTotalHour,
        totalMin: finalTotalMin,
      });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setOfficeWorkTotalTime({ totalHour: 0, totalMin: 0 });
    setOfficeWorkStartTime(null); // Reset the startTime
    setOfficeWorkResetTime({
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
            <h5 className="card-title">OfficeWork</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: OfficeWorkflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {OfficeWorkresetTime.day}-{OfficeWorkresetTime.month}-
            {OfficeWorkresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {OfficeWorktotalTime.totalHour} :{" "}
              {OfficeWorktotalTime.totalMin}
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

export default OfficeWork;
