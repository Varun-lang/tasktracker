// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// const Test = () => {
//   // Load state from localStorage or initialize to default values
//   const loadState = () => {
//     const totalTime = JSON.parse(localStorage.getItem("totalTime")) || {
//       totalHour: 0,
//       totalMin: 0,
//     };
//     const readStart = JSON.parse(localStorage.getItem("readStart")) || {
//       hours: null,
//       min: null,
//     };
//     const resetTime = JSON.parse(localStorage.getItem("resetTime")) || {
//       day: 0,
//       month: 0,
//       year: 0,
//     };
//     const flag = JSON.parse(localStorage.getItem("flag")) || false;
//     return { totalTime, readStart, resetTime, flag };
//   };

//   const [totalTime, setTotalTime] = useState(loadState().totalTime);
//   const [readStart, setReadStart] = useState(loadState().readStart);
//   const [resetTime, setResetTime] = useState(loadState().resetTime);
//   const [flag, setFlag] = useState(loadState().flag);

//   const currentDate = new Date();

//   useEffect(() => {
//     // Save state to localStorage whenever it changes
//     localStorage.setItem("totalTime", JSON.stringify(totalTime));
//     localStorage.setItem("readStart", JSON.stringify(readStart));
//     localStorage.setItem("resetTime", JSON.stringify(resetTime));
//     localStorage.setItem("flag", JSON.stringify(flag));
//   }, [totalTime, readStart, resetTime, flag]);

//   function start() {
//     setFlag(true);
//     if (readStart.hours == null) {
//       const hours = currentDate.getHours();
//       const min = currentDate.getMinutes();
//       setReadStart({ hours, min });
//       console.log({ hours, min });
//       toast.success("Timer Started");
//     }
//   }

//   function stop() {
//     setFlag(false);
//     if (flag) {
//       const stopDate = new Date();
//       const stopHour = stopDate.getHours();
//       const stopMin = stopDate.getMinutes();
//       console.log(stopHour, stopMin);

//       let differenceInMs = stopDate - currentDate;
//       console.log("diff " + differenceInMs);

//       let hourss = Math.floor(differenceInMs / (1000 * 60 * 60));
//       let minutess = Math.floor(
//         (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
//       );

//       console.log("hehe " + hourss, minutess);

//       // Calculate total minutes first to handle cases where minutes roll over
//       let totalMin = stopMin - readStart.min;
//       let totalHour = stopHour - readStart.hours;

//       if (totalMin < 0) {
//         totalMin += 60; // If minutes are negative, add 60 to normalize
//         totalHour -= 1; // Subtract 1 hour since minutes are less
//       }

//       // If totalHour is negative, adjust for 24-hour format
//       if (totalHour < 0) {
//         totalHour = 0;
//       }

//       setTotalTime({ totalHour, totalMin });
//       console.log({ totalHour, totalMin });
//       toast.success("Timer Stopped!");
//     }
//   }

//   function reset() {
//     stop();
//     const currentDate = new Date();
//     setTotalTime({ totalHour: 0, totalMin: 0 });
//     setReadStart({ hours: null, min: null });
//     setResetTime({
//       day: currentDate.getDate(),
//       month: currentDate.getMonth() + 1, // Months are 0-indexed
//       year: currentDate.getFullYear(),
//     });
//     toast.success("Timer Reset");
//   }

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="card" style={{ width: "18rem", padding: "20px" }}>
//         <div className="card-body">
//           <div className="d-flex justify-content-center">
//             <h5 className="card-title">Test</h5>
//             {/* Display the status dot next to the title */}
//             <span
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: flag ? "green" : "red",
//                 display: "inline-block",
//               }}
//             ></span>
//           </div>
//           <p className="card-text text-center">
//             Last Reset: {resetTime.day}-{resetTime.month}-{resetTime.year}
//           </p>
//           <div className="text-center">
//             <p className="mb-0">
//               Total Time: {totalTime.totalHour} : {totalTime.totalMin}
//             </p>
//           </div>
//           <div className="d-flex justify-content-around mt-4">
//             <button className="btn btn-primary" onClick={start}>
//               Start
//             </button>
//             <button className="btn btn-danger" onClick={stop}>
//               Stop
//             </button>
//             <button className="btn btn-secondary" onClick={reset}>
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;
