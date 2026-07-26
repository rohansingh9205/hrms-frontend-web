"use client";

import { useEffect, useState } from "react";
import {
  getSalaryStructures,
  deleteSalaryStructure,
} from "@/lib/api";

export default function SalaryStructureTable() {
  const [salaryList, setSalaryList] = useState<any[]>([]);

  useEffect(() => {
    loadSalaryStructures();
  }, []);

  const loadSalaryStructures = async () => {
    try {
      const response = await getSalaryStructures();

      if (Array.isArray(response)) {
        setSalaryList(response);
      } else {
        setSalaryList(response.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeSalary = async (id: string) => {
    if (!confirm("Delete this salary structure?")) return;

    try {
      await deleteSalaryStructure(id);

      alert("Salary Structure Deleted Successfully");

      loadSalaryStructures();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        overflowX: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Salary Structure List
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Employee</th>
            <th style={th}>Basic</th>
            <th style={th}>HRA</th>
            <th style={th}>Conveyance</th>
            <th style={th}>OT Rate</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {salaryList.map((salary) => (
            <tr key={salary._id}>
              <td style={td}>
                {salary.employeeId?.employeeCode}
                <br />
                {salary.employeeId?.firstName}{" "}
                {salary.employeeId?.lastName}
              </td>

              <td style={td}>
                ₹ {salary.basicSalary}
              </td>

              <td style={td}>
                ₹ {salary.hra}
              </td>

              <td style={td}>
                ₹ {salary.conveyance}
              </td>

              <td style={td}>
                ₹ {salary.overtimeRate}
              </td>

              <td style={td}>
                <button
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    removeSalary(salary._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {salaryList.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Salary Structure Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f8fafc",
  fontWeight: 700,
} as const;

const td = {
  border: "1px solid #ddd",
  padding: "10px",
} as const;