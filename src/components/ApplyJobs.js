import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApplyJob = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const ApplyJobtotalTime = JSON.parse(
      localStorage.getItem("ApplyJobtotalTime")
    ) || { totalHour: 0, totalMin: 0 };
    const ApplyJobresetTime = JSON.parse(
      localStorage.getItem("ApplyJobresetTime")
    ) || { day: 0, month: 0, year: 0 };
    const ApplyJobflag =
      JSON.parse(localStorage.getItem("ApplyJobflag")) || false;
    const ApplyJobstartFlag =
      JSON.parse(localStorage.getItem("ApplyJobstartFlag")) || false;
    const ApplyJobstartTime =
      JSON.parse(localStorage.getItem("ApplyJobstartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: ApplyJobtotalTime,
      resetTime: ApplyJobresetTime,
      flag: ApplyJobflag,
      startFlag: ApplyJobstartFlag,
      startTime: ApplyJobstartTime,
    };
  };

  const [ApplyJobtotalTime, setApplyJobTotalTime] = useState(
    loadState().totalTime
  );
  const [ApplyJobresetTime, setApplyJobResetTime] = useState(
    loadState().resetTime
  );
  const [ApplyJobflag, setApplyJobFlag] = useState(loadState().flag);
  const [ApplyJobstartTime, setApplyJobStartTime] = useState(
    loadState().startTime
  );

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem(
      "ApplyJobtotalTime",
      JSON.stringify(ApplyJobtotalTime)
    );
    localStorage.setItem(
      "ApplyJobresetTime",
      JSON.stringify(ApplyJobresetTime)
    );
    localStorage.setItem("ApplyJobflag", JSON.stringify(ApplyJobflag));
    localStorage.setItem(
      "ApplyJobstartTime",
      JSON.stringify(ApplyJobstartTime)
    ); // Save startTime to localStorage
  }, [ApplyJobtotalTime, ApplyJobresetTime, ApplyJobflag, ApplyJobstartTime]);

  function start() {
    setApplyJobFlag(true);
    const startDate = new Date();
    setApplyJobStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setApplyJobFlag(false);
    if (ApplyJobflag && ApplyJobstartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(ApplyJobstartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = ApplyJobtotalTime.totalHour + currentHour;
      const newTotalMin = ApplyJobtotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setApplyJobTotalTime({
        totalHour: finalTotalHour,
        totalMin: finalTotalMin,
      });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setApplyJobTotalTime({ totalHour: 0, totalMin: 0 });
    setApplyJobStartTime(null); // Reset the startTime
    setApplyJobResetTime({
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
            <h5 className="card-title">ApplyJob</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: ApplyJobflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {ApplyJobresetTime.day}-{ApplyJobresetTime.month}-
            {ApplyJobresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {ApplyJobtotalTime.totalHour} :{" "}
              {ApplyJobtotalTime.totalMin}
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

export default ApplyJob;
