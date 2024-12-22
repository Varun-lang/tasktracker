import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Test = () => {
  // Load state from localStorage or initialize to default values
  const loadState = () => {
    const TesttotalTime = JSON.parse(localStorage.getItem("TesttotalTime")) || {
      totalHour: 0,
      totalMin: 0,
    };
    const TestresetTime = JSON.parse(localStorage.getItem("TestresetTime")) || {
      day: 0,
      month: 0,
      year: 0,
    };
    const Testflag = JSON.parse(localStorage.getItem("Testflag")) || false;
    const TeststartFlag =
      JSON.parse(localStorage.getItem("TeststartFlag")) || false;
    return {
      totalTime: TesttotalTime,
      resetTime: TestresetTime,
      flag: Testflag,
      startFlag: TeststartFlag,
    };
  };

  const [TesttotalTime, setTestTotalTime] = useState(loadState().totalTime);
  const [TestresetTime, setTestResetTime] = useState(loadState().resetTime);
  const [Testflag, setTestFlag] = useState(loadState().flag);
  const [TeststartFlag, setTestStartFlag] = useState(loadState().startFlag);

  const currentDate = new Date();

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("TesttotalTime", JSON.stringify(TesttotalTime));
    localStorage.setItem("TestresetTime", JSON.stringify(TestresetTime));
    localStorage.setItem("Testflag", JSON.stringify(Testflag));
    localStorage.setItem("TeststartFlag", JSON.stringify(TeststartFlag));
  }, [TesttotalTime, TeststartFlag, TestresetTime, Testflag]);

  function start() {
    setTestFlag(true);
    if (!TeststartFlag) {
      setTestStartFlag(true);
      toast.success("Timer Started");
    }
  }

  function stop() {
    setTestFlag(false);
    if (Testflag) {
      const stopDate = new Date();

      let differenceInMs = stopDate - currentDate;

      let totalHour = Math.floor(differenceInMs / (1000 * 60 * 60));

      let totalMin = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTestTotalTime({ totalHour, totalMin });
      toast.success("Timer Stopped!");
    }
  }

  function reset() {
    stop();
    const currentDate = new Date();
    setTestTotalTime({ totalHour: 0, totalMin: 0 });
    setTestStartFlag({ startFlag: false });
    setTestResetTime({
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
          <div className="d-flex justify-content-center">
            <h5 className="card-title">Test</h5>
            {/* Display the status dot next to the title */}
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: Testflag ? "green" : "red",
                display: "inline-block",
              }}
            ></span>
          </div>
          <p className="card-text text-center">
            Last Reset: {TestresetTime.day}-{TestresetTime.month}-
            {TestresetTime.year}
          </p>
          <div className="text-center">
            <p className="mb-0">
              Total Time: {TesttotalTime.totalHour} : {TesttotalTime.totalMin}
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

export default Test;
