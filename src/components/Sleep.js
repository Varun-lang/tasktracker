import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Sleep = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const SleeptotalTime = JSON.parse(
      localStorage.getItem("SleeptotalTime")
    ) || { totalHour: 0, totalMin: 0 };
    const SleepresetTime = JSON.parse(
      localStorage.getItem("SleepresetTime")
    ) || { day: 0, month: 0, year: 0 };
    const Sleepflag = JSON.parse(localStorage.getItem("Sleepflag")) || false;
    const SleepstartFlag =
      JSON.parse(localStorage.getItem("SleepstartFlag")) || false;
    const SleepstartTime =
      JSON.parse(localStorage.getItem("SleepstartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: SleeptotalTime,
      resetTime: SleepresetTime,
      flag: Sleepflag,
      startFlag: SleepstartFlag,
      startTime: SleepstartTime,
    };
  };

  const [SleeptotalTime, setSleepTotalTime] = useState(loadState().totalTime);
  const [SleepresetTime, setSleepResetTime] = useState(loadState().resetTime);
  const [Sleepflag, setSleepFlag] = useState(loadState().flag);
  const [SleepstartTime, setSleepStartTime] = useState(loadState().startTime);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("SleeptotalTime", JSON.stringify(SleeptotalTime));
    localStorage.setItem("SleepresetTime", JSON.stringify(SleepresetTime));
    localStorage.setItem("Sleepflag", JSON.stringify(Sleepflag));
    localStorage.setItem("SleepstartTime", JSON.stringify(SleepstartTime)); // Save startTime to localStorage
  }, [SleeptotalTime, SleepresetTime, Sleepflag, SleepstartTime]);

  function start() {
    setSleepFlag(true);
    const startDate = new Date();
    setSleepStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setSleepFlag(false);
    if (Sleepflag && SleepstartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(SleepstartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = SleeptotalTime.totalHour + currentHour;
      const newTotalMin = SleeptotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setSleepTotalTime({ totalHour: finalTotalHour, totalMin: finalTotalMin });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setSleepTotalTime({ totalHour: 0, totalMin: 0 });
    setSleepStartTime(null); // Reset the startTime
    setSleepResetTime({
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
            <h5 className="card-title">Sleep</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: Sleepflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {SleepresetTime.day}-{SleepresetTime.month}-
            {SleepresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {SleeptotalTime.totalHour} : {SleeptotalTime.totalMin}
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

export default Sleep;
