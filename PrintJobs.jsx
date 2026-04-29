import { useState, useEffect } from "react";

function PrintJobs() {
  const [jobs, setJobs] = useState([]);

  // 🔄 Load jobs from backend
  const loadJobs = () => {
    fetch("http://127.0.0.1:8000/print-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log("PrintJobs API error", err));
  };

  // 🧹 Clear all jobs
  const clearJobs = async () => {
    if (!window.confirm("Clear all print jobs?")) return;

    try {
      await fetch("http://127.0.0.1:8000/print-jobs", {
        method: "DELETE",
      });

      loadJobs(); // refresh table
    } catch (err) {
      console.log("Clear jobs error", err);
    }
  };

  // 🚀 Initial load + auto refresh
  useEffect(() => {
    loadJobs();

    const interval = setInterval(() => {
      loadJobs();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🎨 Status badge styling
  const badge = (status) => {
    if (status === "Printing") return "live";
    if (status === "Completed") return "blue";
    if (status === "Failover") return "warn";
    if (status === "Failed") return "offline";
    return "offline";
  };

  return (
    <div className="page">

      <h1>Print Jobs</h1>
      <p className="sub">
        Live queue from HIS software
      </p>

      {/* 🔥 Clear Button */}
      <button
        className="btn"
        style={{ marginBottom: "15px" }}
        onClick={clearJobs}
      >
        Clear Jobs
      </button>

      <div className="card">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Category</th>
              <th>Printer</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No print jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>JOB{String(job.id).padStart(3, "0")}</td>
                  <td>{job.location}</td>
                  <td>{job.category}</td>
                  
                  

                  {/* 🔥 Primary / Secondary */}
                  <td>
                    <span
                      className={`badge ${
                        job.type === "Primary" ? "live" : "warn"
                      }`}
                    >
                      {job.type}
                    </span>
                  </td>

                  {/* 🔥 Status */}
                  <td>
                    <span className={`badge ${badge(job.status)}`}>
                     {job.status === "Printing" && "🖨️ "}
                     {job.status === "Completed" && "✅ "}
                     {job.status === "Failed" && "❌ "}
                     {job.status === "Failover" && "⚠️ "}
                     {job.status}
                    </span>
                  </td>

                  <td>{job.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default PrintJobs;