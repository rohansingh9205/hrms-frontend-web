"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import PFTable from "@/components/compliance/pf-table";
import { getPFReport, getCompanies } from "@/lib/api";

export default function PFPage() {
  const [pfData, setPFData] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
  const userRole = localStorage.getItem("role") || "";
  setRole(userRole);

  if (userRole === "SUPER_ADMIN") {
    loadCompanies();
  } else {
    loadPFReport();
  }
}, []);

  async function loadCompanies() {
    try {
      const response = await getCompanies();
      setCompanies(response.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPFReport(
  month?: string,
  year?: string,
  companyId?: string
) {
  try {
    const response = await getPFReport(
      month ? Number(month) : undefined,
      year ? Number(year) : undefined,
      companyId || undefined
    );

    setPFData(response.data || []);
  } catch (error) {
    console.error(error);
  }
}
console.log("ROLE STATE =", role);

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            PF Management
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Employee Provident Fund Report
          </p>
        </div>
      </div>

      <div
  style={{
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  {role === "SUPER_ADMIN" && (
  <select
    value={selectedCompany}
    onChange={(e) => setSelectedCompany(e.target.value)}
    style={{ padding: "10px", minWidth: "220px" }}
  >
    <option value="">Select Company</option>

    {companies.map((company) => (
      <option key={company._id} value={company._id}>
        {company.companyName}
      </option>
    ))}
  </select>
  )}

  <input
    type="number"
    placeholder="Month"
    min={1}
    max={12}
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    style={{ padding: "10px", width: "120px" }}
  />

  <input
    type="number"
    placeholder="Year"
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
    style={{ padding: "10px", width: "120px" }}
  />

  <button
  onClick={() =>
    loadPFReport(
      selectedMonth,
      selectedYear,
      selectedCompany
    )
  }
    style={{
      padding: "10px 18px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Search
  </button>
</div>

<PFTable pfData={pfData} />
    </AppLayout>
  );
  
}
