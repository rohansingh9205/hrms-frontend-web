"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getEmployeesReport,
  getAttendanceReport,
  getPayrollReport,
  getLeaveReport,
} from "@/lib/api";

export default function ReportViewPage() {
  const { type } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const companyId =
    searchParams.get("companyId") || "";

  const reportType =
    typeof type === "string"
      ? type.charAt(0).toUpperCase() +
        type.slice(1)
      : "";

  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    if (type === "employees") {
      loadEmployees();
    }

    if (type === "attendance") {
      loadAttendance();
    }

    if (type === "payroll") {
      loadPayroll();
    }

    if (type === "leave") {
      loadLeaves();
    }
  }, [type]);

  const loadEmployees = async () => {
    try {
      const res = await getEmployeesReport(companyId);

      if (res?.success) {
        setEmployees(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadAttendance = async () => {
    try {
      const res = await getAttendanceReport(companyId);

      if (res?.success) {
        setAttendance(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadPayroll = async () => {
    try {
      const res = await getPayrollReport(companyId);

      if (res?.success) {
        setPayroll(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadLeaves = async () => {
    try {
      const res = await getLeaveReport(companyId);

      if (res?.success) {
        setLeaves(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <button onClick={() => router.back()}>
        ← Back
      </button>

      <h1 style={{ margin: "20px 0" }}>
        {reportType} Report
      </h1>

      {type === "employees" ? (
        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp: any) => (
              <tr key={emp._id}>
                <td>{emp.employeeCode}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.departmentId?.departmentName}</td>
                <td>{emp.designation}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : type === "attendance" ? (
        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Working Hours</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item: any) => (
              <tr key={item._id}>
                <td>{item.employeeId?.employeeCode}</td>
                <td>{item.employeeId?.firstName} {item.employeeId?.lastName}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.checkIn}</td>
                <td>{item.checkOut}</td>
                <td>{item.status}</td>
                <td>{item.workingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : type === "payroll" ? (
        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Gross Salary</th>
              <th>Net Salary</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payroll.map((item: any) => (
              <tr key={item._id}>
                <td>{item.employeeId?.employeeCode}</td>
                <td>{item.employeeId?.firstName} {item.employeeId?.lastName}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>₹{item.grossSalary}</td>
                <td>₹{item.netSalary}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : type === "leave" ? (
        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((item: any) => (
              <tr key={item._id}>
                <td>{item.employeeId?.employeeCode}</td>
                <td>{item.employeeId?.firstName} {item.employeeId?.lastName}</td>
                <td>{item.leaveType}</td>
                <td>{new Date(item.fromDate).toLocaleDateString()}</td>
                <td>{new Date(item.toDate).toLocaleDateString()}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No report found.</h3>
      )}
    </div>
  );
}