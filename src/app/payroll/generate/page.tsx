"use client";

import AppLayout from "../../../components/layout/app-layout";
import {
  generatePayroll,
  getCompanies,
  getEmployees,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};

const isSuperAdmin = user?.role === "SUPER_ADMIN";

export default function GeneratePayrollPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState("");

  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState("");

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
  if (isSuperAdmin) {
    loadCompanies();
  } else {
    const companyId = user.companyId;

    setCompanyId(companyId);
    loadEmployees(companyId);
  }
}, []);

  async function loadCompanies() {
    try {
      const response = await getCompanies();
      setCompanies(response.data || []);

      if (response.data?.length > 0) {
  const id = response.data[0]._id;

  setCompanyId(id);

  // First company ke employees load karo
  loadEmployees(id);
}
    } catch (error) {
      console.error(error);
    }
  }

  async function loadEmployees(company?: string) {
  try {
    const response = await getEmployees(company);

    console.log("Employees API =", response);
    console.log("Employees Data =", response.data);

    setEmployees(response.data || []);
  } catch (error) {
    console.error(error);
  }
}

  async function handleGeneratePayroll() {
    try {
      const response = await generatePayroll({
        companyId,
        month,
        year,
        employeeId,
      });

      alert(response.message);
      router.push("/payroll");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <AppLayout>
  <h1
    style={{
      margin: 0,
      fontSize: "32px",
      fontWeight: 700,
    }}
  >
    Generate Payroll
  </h1>

  <p
    style={{
      marginTop: "8px",
      color: "#64748b",
    }}
  >
    Generate salary for employees.
  </p>

  <div
    style={{
      marginTop: "30px",
      background: "#fff",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
      }}
    >
      {isSuperAdmin && (
  <div>
    <label>Company</label>

    <select
      value={companyId}
      onChange={(e) => {
        const id = e.target.value;

        setCompanyId(id);
        setEmployeeId("");

        loadEmployees(id);
      }}
      style={{
        width: "100%",
        marginTop: "8px",
        padding: "12px",
        borderRadius: "10px",
      }}
    >
      {companies.map((company) => (
        <option key={company._id} value={company._id}>
          {company.companyName}
        </option>
      ))}
    </select>
  </div>
)}

      {/* Month */}
      <div>
        <label>Month</label>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "12px",
            borderRadius: "10px",
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
          ].map((name, index) => (
            <option key={index + 1} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div>
        <label>Year</label>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const y = new Date().getFullYear() - 2 + i;

            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Employee */}
      <div>
        <label>Employee</label>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <option value="">All Employees</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.employeeCode} - {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
      </div>
    </div>

    <button
      style={{
        marginTop: "30px",
        padding: "14px 26px",
        border: "none",
        borderRadius: "10px",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
      }}
      onClick={handleGeneratePayroll}
    >
      Generate Payroll
    </button>
  </div>
</AppLayout>
  );
}