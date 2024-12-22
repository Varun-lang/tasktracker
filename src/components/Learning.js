import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Learning = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const LearningtotalTime = JSON.parse(
      localStorage.getItem("LearningtotalTime")
    ) || { totalHour: 0, totalMin: 0 };
    const LearningresetTime = JSON.parse(
      localStorage.getItem("LearningresetTime")
    ) || { day: 0, month: 0, year: 0 };
    const Learningflag =
      JSON.parse(localStorage.getItem("Learningflag")) || false;
    const LearningstartFlag =
      JSON.parse(localStorage.getItem("LearningstartFlag")) || false;
    const LearningstartTime =
      JSON.parse(localStorage.getItem("LearningstartTime")) || null; // Add startTime in localStorage
    return {
      totalTime: LearningtotalTime,
      resetTime: LearningresetTime,
      flag: Learningflag,
      startFlag: LearningstartFlag,
      startTime: LearningstartTime,
    };
  };

  const [LearningtotalTime, setLearningTotalTime] = useState(
    loadState().totalTime
  );
  const [LearningresetTime, setLearningResetTime] = useState(
    loadState().resetTime
  );
  const [Learningflag, setLearningFlag] = useState(loadState().flag);
  const [LearningstartTime, setLearningStartTime] = useState(
    loadState().startTime
  );

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem(
      "LearningtotalTime",
      JSON.stringify(LearningtotalTime)
    );
    localStorage.setItem(
      "LearningresetTime",
      JSON.stringify(LearningresetTime)
    );
    localStorage.setItem("Learningflag", JSON.stringify(Learningflag));
    localStorage.setItem(
      "LearningstartTime",
      JSON.stringify(LearningstartTime)
    ); // Save startTime to localStorage
  }, [LearningtotalTime, LearningresetTime, Learningflag, LearningstartTime]);

  function start() {
    setLearningFlag(true);
    const startDate = new Date();
    setLearningStartTime(startDate); // Save the start time
    toast.success("Timer Started");
  }

  function stop() {
    setLearningFlag(false);
    if (Learningflag && LearningstartTime) {
      const stopDate = new Date();
      let differenceInMs = stopDate - new Date(LearningstartTime); // Use startTime to calculate difference

      let currentHour = Math.floor(differenceInMs / (1000 * 60 * 60));
      let currentMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Add the current time to the previous time
      const newTotalHour = LearningtotalTime.totalHour + currentHour;
      const newTotalMin = LearningtotalTime.totalMin + currentMin;

      // Handle overflow of minutes
      const finalTotalHour = newTotalHour + Math.floor(newTotalMin / 60);
      const finalTotalMin = newTotalMin % 60;

      setLearningTotalTime({
        totalHour: finalTotalHour,
        totalMin: finalTotalMin,
      });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const resetDate = new Date();
    setLearningTotalTime({ totalHour: 0, totalMin: 0 });
    setLearningStartTime(null); // Reset the startTime
    setLearningResetTime({
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
            <h5 className="card-title">Learning</h5>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: Learningflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {LearningresetTime.day}-{LearningresetTime.month}-
            {LearningresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {LearningtotalTime.totalHour} :{" "}
              {LearningtotalTime.totalMin}
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

export default Learning;
