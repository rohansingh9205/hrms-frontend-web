"use client";

import AppLayout from "../../components/layout/app-layout";
import ReportCards from "../../components/reports/report-cards";
import ReportTable from "../../components/reports/report-table";
import { useEffect, useState } from "react";
import { getCompanies } from "../../lib/api";

interface Company {
  _id: string;
  companyName: string;
}

export default function ReportsPage() {
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : "";

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const loadCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (role === "SUPER_ADMIN") {
      loadCompanies();
    }
  }, []);

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCompany(e.target.value);
  };

  return (
    <AppLayout>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "24px",
        }}
      >
        Reports
      </h1>

      {role === "SUPER_ADMIN" && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>
            Select Company
          </label>

          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            style={{
              padding: "8px",
              minWidth: "250px",
            }}
          >
            <option value="">Select Company</option>

            {companies.map((company) => (
              <option
                key={company._id}
                value={company._id}
              >
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
      )}

      <ReportCards companyId={selectedCompany} />

      <div style={{ height: "24px" }} />

      <ReportTable companyId={selectedCompany} />
    </AppLayout>
  );
}