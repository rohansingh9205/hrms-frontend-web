"use client";

import { useEffect, useState } from "react";
import { getDashboard, getCompanies } from "@/lib/api";
import styles from "./DashboardCards.module.css";

interface DashboardData {
  totalCompanies: number;
  totalDepartments: number;
  totalEmployees: number;
  totalUsers: number;
}

export default function DashboardCards() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    totalCompanies: 0,
    totalDepartments: 0,
    totalEmployees: 0,
    totalUsers: 0,
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setIsSuperAdmin(user?.role === "SUPER_ADMIN");
}, []);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboard(selectedCompany);
        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    }

    async function loadCompanies() {
      try {
        const response = await getCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Companies Error:", error);
      }
    }

    if (isSuperAdmin) {
      loadCompanies();
    }

    loadDashboard();
  }, [selectedCompany, isSuperAdmin]);

  const cards = isSuperAdmin
    ? [
        {
          title: "Companies",
          value: dashboard.totalCompanies,
          color: "#2563eb",
        },
        {
          title: "Departments",
          value: dashboard.totalDepartments,
          color: "#16a34a",
        },
        {
          title: "Employees",
          value: dashboard.totalEmployees,
          color: "#dc2626",
        },
        {
          title: "Users",
          value: dashboard.totalUsers,
          color: "#f59e0b",
        },
      ]
    : [
        {
          title: "Departments",
          value: dashboard.totalDepartments,
          color: "#16a34a",
        },
        {
          title: "Employees",
          value: dashboard.totalEmployees,
          color: "#dc2626",
        },
        {
          title: "Users",
          value: dashboard.totalUsers,
          color: "#f59e0b",
        },
      ];
      if (!mounted) {
  return null;
}

  return (
    <>
      {isSuperAdmin && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ fontWeight: 600 }}>Company</label>

          <select
            value={selectedCompany}
            onChange={(e) => {
  const value = e.target.value;

  setSelectedCompany(value);

  localStorage.setItem("selectedCompany", value);

  window.dispatchEvent(new Event("companyChanged"));
}}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "240px",
            }}
          >
            <option value="">All Companies</option>

            {companies.map((company: any) => (
              <option key={company._id} value={company._id}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.grid}>
        {cards.map((card) => (
          <div className={styles.card} key={card.title}>
            <div
              className={styles.top}
              style={{ background: card.color }}
            />

            <p>{card.title}</p>

            <h2>{card.value}</h2>
          </div>
        ))}
      </div>
    </>
  );
}