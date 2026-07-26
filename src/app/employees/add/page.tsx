"use client";

import AppLayout from "../../../components/layout/app-layout";
import EmployeeForm from "../../../components/employees/employee-form";

export default function AddEmployeePage() {
  

  return (
    <AppLayout>
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Add Employee
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Create a new employee record.
        </p>
      </div>

      <EmployeeForm />
    </AppLayout>
  );
}