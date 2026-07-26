"use client";

type PFTableProps = {
  pfData: any[];
};

export default function PFTable({ pfData }: PFTableProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        overflowX: "auto",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Basic Salary</th>
            <th>Employee PF</th>
            <th>Employer PF</th>
          </tr>
        </thead>

        <tbody>
          {pfData.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.employeeCode || "-"}</td>
              <td>{row.employeeName}</td>
              <td>₹ {row.basicSalary}</td>
              <td>₹ {row.employeePF}</td>
              <td>₹ {row.employerPF}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}