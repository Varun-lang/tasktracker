import React from "react";
import Read from "./Read";
import Learning from "./Learning";
import OfficeWork from "./OfficeWork";
import Sleep from "./Sleep";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import ApplyJobs from "./ApplyJobs";
import NonProductive from "./NonProductive";

function Home() {
  // Inline styles for the heading box
  const headingBoxStyle = {
    backgroundColor: "#006747", // Bottle Green color
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow
    marginBottom: "30px",
  };

  // Inline styles for the heading text
  const headingTextStyle = {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    marginBottom: "0",
  };

  return (
    <div className="container mt-5">
      {/* Box for Heading with inline styles */}
      <div style={headingBoxStyle}>
        <h3 style={headingTextStyle}>My Task Tracker</h3>
      </div>

      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <Learning />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <Read />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <ApplyJobs />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Card 4 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <NonProductive />
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <OfficeWork />
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white shadow-lg">
            <div className="card-body">
              <Sleep />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
