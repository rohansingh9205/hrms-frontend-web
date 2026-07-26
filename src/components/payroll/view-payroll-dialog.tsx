"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  payroll: any;
}

export default function ViewPayrollDialog({
  open,
  onClose,
  payroll,
}: Props) {
  if (!open || !payroll) return null;

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    marginTop: "6px",
    background: "#f8fafc",
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
            marginBottom: "20px",
          }}
        >
          <h2>View Payroll</h2>

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label>Employee Name</label>
            <input
              readOnly
              style={inputStyle}
              value={`${payroll.employeeId?.firstName || ""} ${
                payroll.employeeId?.lastName || ""
              }`}
            />
          </div>

          <div>
            <label>Employee Code</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.employeeId?.employeeCode || ""}
            />
          </div>

          <div>
            <label>Company</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.companyId?.companyName || ""}
            />
          </div>

          <div>
            <label>Month</label>
            <input
              readOnly
              style={inputStyle}
              value={`${payroll.month} ${payroll.year}`}
            />
          </div>

          <div>
            <label>Basic Salary</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.basicSalary || 0}
            />
          </div>

          <div>
            <label>Net Salary</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.netSalary || 0}
            />
          </div>

          <div>
            <label>Incentive</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.incentive || 0}
            />
          </div>

          <div>
            <label>Overtime Hours</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.overtimeHours || 0}
            />
          </div>

          <div>
            <label>Deduction</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.deduction || 0}
            />
          </div>

          <div>
            <label>Status</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.status || "Pending"}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}