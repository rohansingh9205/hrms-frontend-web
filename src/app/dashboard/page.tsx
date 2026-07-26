"use client";

import { useRouter } from "next/navigation";
import AppLayout from "../../components/layout/app-layout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import PayrollChart from "../../components/dashboard/PayrollChart";
import CompanySummary from "../../components/dashboard/CompanySummary";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("companyId");
    localStorage.removeItem("role");

    router.replace("/login");
  };

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      <DashboardCards />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <AttendanceChart />
        <PayrollChart />
      </div>

      <div style={{ marginTop: "20px" }}>
        <CompanySummary />
      </div>
    </AppLayout>
  );
}