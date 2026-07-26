"use client";

import { useEffect, useState } from "react";
import { getReportSummary } from "@/lib/api";
import styles from "./report-cards.module.css";

interface Props {
  companyId: string;
}

interface Summary {
  employees: number;
  attendance: number;
  payroll: number;
  leave: number;
}

export default function ReportCards({ companyId }: Props) {
  const [summary, setSummary] = useState<Summary>({
    employees: 0,
    attendance: 0,
    payroll: 0,
    leave: 0,
  });

  useEffect(() => {
    loadSummary();
  }, [companyId]);

  const loadSummary = async () => {
  try {
    const res = await getReportSummary(companyId);

    console.log("Report API Response:", res);

    if (res?.success) {
      setSummary(res.data);
    }
  } catch (err) {
    console.error(err);
  }
};

  const cards = [
    {
      title: "Attendance Reports",
      value: summary.attendance,
      color: "#2563eb",
    },
    {
      title: "Payroll Reports",
      value: summary.payroll,
      color: "#16a34a",
    },
    {
      title: "Leave Reports",
      value: summary.leave,
      color: "#f59e0b",
    },
    {
      title: "Employees",
      value: summary.employees,
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={styles.card}
          style={{
            borderTop: `5px solid ${card.color}`,
          }}
        >
          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}