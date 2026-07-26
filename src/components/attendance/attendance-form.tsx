"use client";

import { useEffect, useState } from "react";
import { getEmployees, createAttendance } from "@/lib/api";

interface Employee {
  _id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  companyId: {
    _id: string;
    companyName: string;
  };
}

interface AttendanceFormProps {
  onClose: () => void;
}

export default function AttendanceForm({
  onClose,
}: AttendanceFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    companyId: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
    remarks: "",
  });

  useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await getEmployees();
        setEmployees(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadEmployees();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createAttendance(formData);

      alert("Attendance Saved");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving attendance");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "700px",
          maxWidth: "95%",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Mark Attendance</h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Employee</label>

            <select
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
              value={formData.employeeId}
              onChange={(e) => {
                const emp = employees.find(
                  (x) => x._id === e.target.value
                );

                setFormData({
                  ...formData,
                  employeeId: e.target.value,
                  companyId: emp?.companyId._id || "",
                });
              }}
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeCode} - {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
            <div style={{ marginBottom: "15px" }}>
  <label>Date</label>
  <input
    type="date"
    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
    value={formData.date}
    onChange={(e) =>
      setFormData({ ...formData, date: e.target.value })
    }
  />
</div>

<div style={{ marginBottom: "15px" }}>
  <label>Check In</label>
  <input
    type="time"
    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
    value={formData.checkIn}
    onChange={(e) =>
      setFormData({ ...formData, checkIn: e.target.value })
    }
  />
</div>

<div style={{ marginBottom: "15px" }}>
  <label>Check Out</label>
  <input
    type="time"
    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
    value={formData.checkOut}
    onChange={(e) =>
      setFormData({ ...formData, checkOut: e.target.value })
    }
  />
</div>

<div style={{ marginBottom: "15px" }}>
  <label>Status</label>
  <select
    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
    value={formData.status}
    onChange={(e) =>
      setFormData({ ...formData, status: e.target.value })
    }
  >
    <option value="Present">Present</option>
    <option value="Absent">Absent</option>
    <option value="Half Day">Half Day</option>
    <option value="Leave">Leave</option>
  </select>
</div>

<div style={{ marginBottom: "20px" }}>
  <label>Remarks</label>
  <textarea
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      minHeight: "80px",
    }}
    value={formData.remarks}
    onChange={(e) =>
      setFormData({ ...formData, remarks: e.target.value })
    }
  />
</div>

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  }}
>
  <button
    type="button"
    onClick={onClose}
    style={{
      padding: "10px 20px",
      border: "1px solid #ccc",
      background: "#fff",
      cursor: "pointer",
    }}
  >
    Cancel
  </button>

  <button
    type="submit"
    style={{
      padding: "10px 20px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    }}
  >
    Save Attendance
  </button>
</div>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save Attendance
          </button>
        </form>
      </div>
    </div>
  );
}