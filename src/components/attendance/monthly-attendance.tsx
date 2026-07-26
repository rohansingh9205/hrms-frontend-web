"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getEmployees,
  saveMonthlyAttendance,
} from "@/lib/api";

export default function MonthlyAttendance() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<{
  [key: string]: {
    [date: string]: string;
  };
}>({});

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();

      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        setEmployees(data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Dynamic number of days based on selected month/year
  const days = useMemo(() => {
    const totalDays = new Date(year, month, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => ({
      day: i + 1,
      weekDay: new Date(year, month - 1, i + 1).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      ),
    }));
  }, [month, year]);
const attendanceStatus = ["P", "A", "L", "H"];

const changeAttendance = (
  employeeId: string,
  date: string
) => {
  setAttendanceData((prev) => {
    const current =
      prev[employeeId]?.[date] || "P";

    const currentIndex =
      attendanceStatus.indexOf(current);

    const nextStatus =
      attendanceStatus[
        (currentIndex + 1) %
          attendanceStatus.length
      ];

    return {
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [date]: nextStatus,
      },
    };
  });
};
const saveAttendance = async () => {
  try {
    const attendance: any[] = [];

    Object.keys(attendanceData).forEach((employeeId) => {
      Object.keys(attendanceData[employeeId]).forEach((date) => {
        const employee = employees.find(
          (e) => e._id === employeeId
        );

        attendance.push({
          employeeId,
          companyId: employee?.companyId?._id, 
          date,
          status: attendanceData[employeeId][date],
        });
      });
    });

    const response = await saveMonthlyAttendance({
      attendance,
    });

    alert(response.message || "Attendance Saved Successfully");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
};
  return (
    <>
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: 600,
            }}
          >
            Month
          </label>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "6px",
              minWidth: "180px",
            }}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, index) => (
              <option key={index} value={index + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: 600,
            }}
          >
            Year
          </label>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "6px",
              width: "120px",
            }}
          />
        </div>

        <button
          style={{
            marginTop: "24px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Load Attendance
        </button>
        <button
  onClick={saveAttendance}
  style={{
    marginTop: "24px",
    padding: "10px 20px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Save Attendance
</button>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Monthly Attendance
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  background: "#f8fafc",
                  minWidth: "220px",
                  position: "sticky",
                  left: 0,
                }}
              >
                Employee
              </th>

              {days.map((d) => {
  const fullDate = new Date(year, month - 1, d.day);

  return (
    <th
      key={d.day}
      style={{
        border: "1px solid #ddd",
        padding: "6px",
        minWidth: "90px",
        background: "#f8fafc",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#64748b",
          marginBottom: "2px",
        }}
      >
        {fullDate.toLocaleDateString("en-US", {
            day: "2-digit",
  month: "short",
          weekday: "short",
        })}
      </div>

      <div
        style={{
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {fullDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })}
      </div>
    </th>
  );
})}


            </tr>
          </thead>

          <tbody>
  {employees.map((emp: any) => (
    <tr key={emp._id}>
      <td
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          fontWeight: 600,
          background: "#fff",
          position: "sticky",
          left: 0,
        }}
      >
        {emp.employeeCode}
        <br />
        {emp.firstName} {emp.lastName}
      </td>

      {days.map((d) => {
        const date = `${year}-${String(month).padStart(2, "0")}-${String(
          d.day
        ).padStart(2, "0")}`;

        const status =
          attendanceData[emp._id]?.[date] || "P";

        let bgColor = "#dcfce7";
        let textColor = "#166534";

        if (status === "A") {
          bgColor = "#fee2e2";
          textColor = "#991b1b";
        }

        if (status === "L") {
          bgColor = "#fef3c7";
          textColor = "#92400e";
        }

        if (status === "H") {
          bgColor = "#fed7aa";
          textColor = "#9a3412";
        }

        return (
          <td
            key={date}
            onClick={() =>
              changeAttendance(emp._id, date)
            }
            style={{
              border: "1px solid #ddd",
              textAlign: "center",
              cursor: "pointer",
              fontWeight: 700,
              padding: "8px",
              background: bgColor,
              color: textColor,
              userSelect: "none",
              transition: "0.2s",
            }}
          >
            {status}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </>
  );
}