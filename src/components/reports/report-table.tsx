"use client";

import styles from "./report-table.module.css";
import { useRouter } from "next/navigation";

interface Props {
  companyId: string;
}

const reports = [
  {
    id: "attendance",
    name: "Attendance Report",
    type: "Attendance",
    date: "08 Jul 2026",
  },
  {
    id: "payroll",
    name: "Payroll Report",
    type: "Payroll",
    date: "08 Jul 2026",
  },
  {
    id: "leave",
    name: "Leave Report",
    type: "Leave",
    date: "08 Jul 2026",
  },
  {
    id: "employees",
    name: "Employee Report",
    type: "Employee",
    date: "08 Jul 2026",
  },
];

export default function ReportTable({ companyId }: Props) {
  const router = useRouter();

  const handleView = (type: string) => {
    const url = companyId
      ? `/reports/view/${type}?companyId=${companyId}`
      : `/reports/view/${type}`;

    router.push(url);
  };

  const handleDownload = (type: string) => {
    alert(`${type} PDF download will be connected next.`);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    className={styles.view}
                    onClick={() => handleView(item.id)}
                  >
                    View
                  </button>

                  <button
                    className={styles.download}
                    onClick={() => handleDownload(item.id)}
                  >
                    Download
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}