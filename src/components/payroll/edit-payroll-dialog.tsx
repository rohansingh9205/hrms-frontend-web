"use client";

import { useEffect, useState } from "react";
import { updatePayroll } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  payroll: any;
}

export default function EditPayrollDialog({
  open,
  onClose,
  payroll,
}: Props) {
 const [formData, setFormData] = useState({
  basicSalary: 0,
  incentive: 0,
  overtimeHours: 0,
  deduction: 0,
  status: "Pending",
});

  useEffect(() => {
    if (payroll) {
      setFormData({
  basicSalary: payroll.basicSalary || 0,
  incentive: payroll.incentive || 0,
  overtimeHours: payroll.overtimeHours || 0,
  deduction: payroll.deduction || 0,
  status: payroll.status || "Pending",
});
    }
  }, [payroll]);
  const handleSave = async () => {
  try {
    await updatePayroll(payroll._id, formData);

    alert("Payroll Updated Successfully");

    onClose();

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to update payroll");
  }
};

  if (!open || !payroll) return null;

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    marginTop: "6px",
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
          <h2>Edit Payroll</h2>

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
    type="number"
    style={inputStyle}
    value={formData.basicSalary}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        basicSalary: Number(e.target.value),
      }))
    }
  />
</div>

          <div>
            <label>Net Salary</label>
            <input
              readOnly
              style={inputStyle}
              value={payroll.netSalary}
            />
          </div>

          <div>
  <label>Incentive</label>
  <input
    type="number"
    style={inputStyle}
    value={formData.incentive}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        incentive: Number(e.target.value),
      }))
    }
  />
</div>

          <div>
            <label>Overtime Hours</label>
            <input
              type="number"
              style={inputStyle}
              value={formData.overtimeHours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  overtimeHours: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label>Deduction</label>
            <input
              type="number"
              style={inputStyle}
              value={formData.deduction}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deduction: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label>Status</label>
            <select
              style={inputStyle}
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "#64748b",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
  onClick={handleSave}
  style={{
    padding: "10px 20px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Save Changes
</button>
        </div>
      </div>
    </div>
  );
}