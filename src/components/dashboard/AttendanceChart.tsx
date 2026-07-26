"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/lib/api";
import styles from "./AttendanceChart.module.css";

interface AttendanceData {
  present: number;
  absent: number;
  leave: number;
  halfDay: number;
}

export default function AttendanceChart() {
  const [attendance, setAttendance] = useState<AttendanceData>({
    present: 0,
    absent: 0,
    leave: 0,
    halfDay: 0,
  });

  useEffect(() => {
  async function loadAttendance() {
    try {
      const companyId =
        localStorage.getItem("selectedCompany") || "";

      const response = await getDashboard(
        companyId === "" ? undefined : companyId
      );
        console.log("Attendance Response:", response.data.attendance);
      if (response.success) {
        setAttendance(response.data.attendance);
      }
    } catch (error) {
      console.error("Attendance Error:", error);
    }
  }

  loadAttendance();

  window.addEventListener("companyChanged", loadAttendance);

  return () => {
    window.removeEventListener(
      "companyChanged",
      loadAttendance
    );
  };
}, []);
  console.log("Attendance State:", attendance);
  const attendanceList = [
    {
      title: "Present",
      value: attendance.present,
      color: "#16a34a",
    },
    {
      title: "Absent",
      value: attendance.absent,
      color: "#dc2626",
    },
    {
      title: "Leave",
      value: attendance.leave,
      color: "#f59e0b",
    },
    {
      title: "Half Day",
      value: attendance.halfDay,
      color: "#2563eb",
    },
  ];

  const total =
    attendance.present +
    attendance.absent +
    attendance.leave +
    attendance.halfDay;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Today's Attendance</h2>
        <p>Current Status</p>
      </div>

      <div className={styles.circle}>
        <div className={styles.inner}>{total}</div>
      </div>

      <div className={styles.list}>
        {attendanceList.map((item) => (
          <div key={item.title} className={styles.item}>
            <div
              className={styles.dot}
              style={{
                background: item.color,
              }}
            />

            <span>{item.title}</span>

            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}