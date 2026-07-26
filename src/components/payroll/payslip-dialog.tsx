"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  payroll: any;
}

export default function PayslipDialog({
  open,
  onClose,
  payroll,
}: Props) {
  if (!open || !payroll) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Abhi browser Print Dialog open hoga.
    // Wahan "Save as PDF" select karke PDF download kar sakte ho.
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "650px",
          maxWidth: "95%",
          background: "#fff",
          borderRadius: "16px",
          padding: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              margin: 0,
            }}
          >
            Employee Payslip
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <Row
              label="Employee"
              value={`${payroll.employeeId?.firstName} ${payroll.employeeId?.lastName}`}
            />

            <Row
              label="Employee ID"
              value={payroll.employeeId?.employeeCode}
            />

            <Row
              label="Company"
              value={payroll.companyId?.companyName}
            />

            <Row
              label="Month"
              value={`${payroll.month}/${payroll.year}`}
            />

            <Row
              label="Basic Salary"
              value={`₹ ${payroll.basicSalary}`}
            />

            <Row
              label="HRA"
              value={`₹ ${payroll.hra}`}
            />

            <Row
              label="Conveyance"
              value={`₹ ${payroll.conveyance}`}
            />

            <Row
              label="Special Allowance"
              value={`₹ ${payroll.specialAllowance}`}
            />

            <Row
              label="Incentive"
              value={`₹ ${payroll.incentive}`}
            />

            <Row
              label="PF"
              value={`- ₹ ${payroll.pf}`}
            />

            <Row
              label="ESI"
              value={`- ₹ ${payroll.esi}`}
            />

            <Row
              label="Deduction"
              value={`- ₹ ${payroll.deduction}`}
            />

            <Row
              label="Net Salary"
              value={`₹ ${payroll.netSalary}`}
            />
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={handleDownloadPDF}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>

          <button
            onClick={handlePrint}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "#16a34a",
              color: "#fff",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "12px 0",
          fontWeight: 600,
          color: "#475569",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {label}
      </td>

      <td
        style={{
          padding: "12px 0",
          textAlign: "right",
          fontWeight: 700,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {value}
      </td>
    </tr>
  );
}