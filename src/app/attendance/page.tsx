"use client";

import { useState } from "react";

import AppLayout from "../../components/layout/app-layout";
import ExcelUpload from "../../components/attendance/excel-upload";
import MonthlyAttendance from "../../components/attendance/monthly-attendance";

export default function AttendancePage() {
  const [tab, setTab] = useState<"manual" | "excel">("manual");

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            Attendance Management
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Manage employee attendance manually or upload using Excel.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setTab("manual")}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            background:
              tab === "manual" ? "#2563eb" : "#e2e8f0",
            color: tab === "manual" ? "#fff" : "#0f172a",
          }}
        >
          Manual Attendance
        </button>

        <button
          onClick={() => setTab("excel")}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            background:
              tab === "excel" ? "#2563eb" : "#e2e8f0",
            color: tab === "excel" ? "#fff" : "#0f172a",
          }}
        >
          Excel Upload
        </button>
      </div>

{tab === "manual" && <MonthlyAttendance />}
{tab === "excel" && <ExcelUpload />}
    </AppLayout>
  );
}