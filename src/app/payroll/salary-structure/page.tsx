"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../../components/layout/app-layout";
import {
  getEmployees,
  createSalaryStructure,
} from "@/lib/api";
import SalaryStructureTable from "../salary-structure-table";

export default function SalaryStructurePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: "",
    hra: "",
    conveyance: "",
    specialAllowance: "",
    incentive: "",
    overtimeRate: "",
    esiApplicable: true,
    pfApplicable: false,
    lwfApplicable: true,
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();

      if (Array.isArray(response)) {
        setEmployees(response);
      } else {
        setEmployees(response.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveSalaryStructure = async () => {
    try {
      if (!formData.employeeId) {
        alert("Please select employee");
        return;
      }

      const employee = employees.find(
        (e: any) => e._id === formData.employeeId
      );

      const payload = {
        employeeId: formData.employeeId,
        companyId: employee?.companyId?._id,

        basicSalary: Number(formData.basicSalary),
        hra: Number(formData.hra),
        conveyance: Number(formData.conveyance),
        specialAllowance: Number(formData.specialAllowance),
        incentive: Number(formData.incentive),
        overtimeRate: Number(formData.overtimeRate),

        esiApplicable: formData.esiApplicable,
        pfApplicable: formData.pfApplicable,
        lwfApplicable: formData.lwfApplicable,
      };

      const response = await createSalaryStructure(payload);

      alert(
        response.message ||
          "Salary Structure Saved Successfully"
      );

      setFormData({
        employeeId: "",
        basicSalary: "",
        hra: "",
        conveyance: "",
        specialAllowance: "",
        incentive: "",
        overtimeRate: "",
        esiApplicable: true,
        pfApplicable: false,
        lwfApplicable: true,
      });
      setFormData({
  employeeId: "",
  basicSalary: "",
  hra: "",
  conveyance: "",
  specialAllowance: "",
  incentive: "",
  overtimeRate: "",
  esiApplicable: true,
  pfApplicable: false,
  lwfApplicable: true,
});

window.location.reload();

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <AppLayout>

      <h1
        style={{
          fontSize: "30px",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Salary Structure
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Create and manage employee salary structure.
      </p>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <div>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Employee
            </label>

            <select
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeeId: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((emp: any) => (
                <option
                  key={emp._id}
                  value={emp._id}
                >
                  {emp.employeeCode} -{" "}
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Basic Salary
            </label>

            <input
              type="number"
              value={formData.basicSalary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basicSalary: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />

          </div>

          <div>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              HRA
            </label>

            <input
              type="number"
              value={formData.hra}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hra: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />

          </div>
                    <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Conveyance
            </label>

            <input
              type="number"
              value={formData.conveyance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  conveyance: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Special Allowance
            </label>

            <input
              type="number"
              value={formData.specialAllowance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialAllowance: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Incentive
            </label>

            <input
              type="number"
              value={formData.incentive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  incentive: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              OT Rate (Per Hour)
            </label>

            <input
              type="number"
              value={formData.overtimeRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  overtimeRate: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "25px",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={formData.esiApplicable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  esiApplicable: e.target.checked,
                })
              }
            />{" "}
            ESI Applicable
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.pfApplicable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pfApplicable: e.target.checked,
                })
              }
            />{" "}
            PF Applicable
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.lwfApplicable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lwfApplicable: e.target.checked,
                })
              }
            />{" "}
            LWF Applicable
          </label>
        </div>

        <button
          onClick={saveSalaryStructure}
          style={{
            marginTop: "30px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 30px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Save Salary Structure
        </button>

      </div>
<SalaryStructureTable />
    </AppLayout>
    
  );
  
}