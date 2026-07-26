"use client";

interface Props {
  companyId: string;
}

export default function ReportCards({
  companyId,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
      }}
    >
      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Attendance</h3>
        <h1>0</h1>
      </div>

      <div
        style={{
          background: "#16a34a",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Payroll</h3>
        <h1>0</h1>
      </div>

      <div
        style={{
          background: "#ea580c",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Leave</h3>
        <h1>0</h1>
      </div>

      <div
        style={{
          background: "#dc2626",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Employees</h3>
        <h1>0</h1>
      </div>
    </div>
  );
}