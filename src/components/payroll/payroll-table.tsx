"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./payroll-table.module.css";

import ViewPayrollDialog from "./view-payroll-dialog";
import EditPayrollDialog from "./edit-payroll-dialog";
import PayslipDialog from "./payslip-dialog";

interface Props {
  payrollData: any[];
}

export default function PayrollTable({ payrollData }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPayslip, setOpenPayslip] = useState(false);

  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  const filtered = useMemo(() => {
    return payrollData.filter((emp: any) => {
      const employeeName =
        `${emp.employeeId?.firstName || ""} ${emp.employeeId?.lastName || ""}`;

      return (
        employeeName.toLowerCase().includes(search.toLowerCase()) ||
        (emp.employeeId?.employeeCode || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (emp.companyId?.companyName || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [payrollData, search]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          className={styles.search}
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={styles.generate}
          onClick={() => router.push("/payroll/generate")}
        >
          Generate Payroll
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((emp: any) => (
            <tr key={emp._id}>
              <td>{emp.employeeId?.employeeCode}</td>

              <td>
                {emp.employeeId?.firstName} {emp.employeeId?.lastName}
              </td>

              <td>{emp.companyId?.companyName}</td>

              <td>{emp.employeeId?.designation || "--"}</td>

              <td>₹ {emp.netSalary?.toLocaleString()}</td>

              <td>
                {emp.month} / {emp.year}
              </td>

              <td>
                <span
                  className={
                    emp.status === "Paid"
                      ? styles.paid
                      : styles.pending
                  }
                >
                  {emp.status}
                </span>
              </td>

              <td>
                <div className={styles.actions}>
                  {/* VIEW */}
                  <button
                    className={styles.view}
                    onClick={() => {
                      setSelectedPayroll(emp);
                      setOpenView(true);
                    }}
                  >
                    View
                  </button>

                  {/* EDIT */}
                  <button
                    className={styles.edit}
                    onClick={() => {
                      setSelectedPayroll(emp);
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </button>

                  {/* PAYSLIP */}
                  <button
                    className={styles.payslip}
                    onClick={() => {
                      setSelectedPayroll(emp);
                      setOpenPayslip(true);
                    }}
                  >
                    Payslip
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={8} className={styles.empty}>
                No payroll records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* VIEW DIALOG */}
      <ViewPayrollDialog
        open={openView}
        onClose={() => setOpenView(false)}
        payroll={selectedPayroll}
      />

      {/* EDIT DIALOG */}
      <EditPayrollDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        payroll={selectedPayroll}
      />

      {/* PAYSLIP DIALOG */}
      <PayslipDialog
        open={openPayslip}
        onClose={() => setOpenPayslip(false)}
        payroll={selectedPayroll}
      />
    </div>
  );
}