"use client";

import styles from "./payroll-cards.module.css";

interface Props {
  payrollData: any[];
}

export default function PayrollCards({ payrollData }: Props) {
  const totalPayroll = payrollData.reduce(
    (sum, item) => sum + (item.netSalary || 0),
    0
  );

  const paidPayroll = payrollData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + (item.netSalary || 0), 0);

  const pendingPayroll = payrollData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + (item.netSalary || 0), 0);

  const cards = [
    {
      title: "Total Payroll",
      value: `₹ ${totalPayroll.toLocaleString()}`,
      color: "#2563eb",
    },
    {
      title: "Paid",
      value: `₹ ${paidPayroll.toLocaleString()}`,
      color: "#16a34a",
    },
    {
      title: "Pending",
      value: `₹ ${pendingPayroll.toLocaleString()}`,
      color: "#ef4444",
    },
    {
      title: "Employees",
      value: payrollData.length,
      color: "#f59e0b",
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