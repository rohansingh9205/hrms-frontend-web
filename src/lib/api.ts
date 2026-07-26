const API_URL = process.env.NEXT_PUBLIC_API_URL!;
console.log("API_URL =", API_URL);

if (typeof window !== "undefined") {
  console.log(
    "TOKEN AT API LOAD =",
    localStorage.getItem("token")
  );
}
// ================= Dashboard =================

export async function getDashboard(companyId?: string) {
  let url = `${API_URL}/dashboard`;

  if (companyId) {
    url += `?companyId=${companyId}`;
  }

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return response.json();
}

// ================= Companies =================

export async function getCompanies() {
  const response = await fetch(`${API_URL}/companies`, {
    headers: getHeaders(),
  });

  const text = await response.text();

  console.log("Status =", response.status);
  console.log("Response =", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

// ================= Create Company =================

export async function getCompanyById(id: string) {
  const response = await fetch(
    `${API_URL}/companies/${id}`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function createCompany(data: any) {
  const response = await fetch(`${API_URL}/companies`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

// ================= Update Company =================

export async function updateCompany(id: string, company: any){

  const response = await fetch(`${API_URL}/companies/${id}`, {

    method: "PUT",

    headers: getHeaders(),

    body: JSON.stringify(company),

  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  if (text.trim() === "") {
    return null;
  }

  return JSON.parse(text);

}
export async function updatePayroll(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/payroll/${id}`,
    {
      method: "PUT",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
// ================= Delete Company =================

export async function deleteCompany(id: string){

 const response = await fetch(`${API_URL}/companies/${id}`, {
  method: "DELETE",
  headers: getHeaders(),
});

  if (!response.ok) {
    throw new Error("Failed to delete company");
  }
return true;
}

// ================= Employees =================

export async function getEmployees(companyId?: string) {
  const url = companyId
    ? `${API_URL}/employees?companyId=${companyId}`
    : `${API_URL}/employees`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}


export async function getEmployeeById(id: string) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    headers: getHeaders(),
  });

  const text = await response.text();

  console.log("Employee Status =", response.status);
  console.log("Employee Response =", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function createEmployee(employee: any) {
  console.log("API DATA =", employee);

  const response = await fetch(`${API_URL}/employees`, {

    method: "POST",

    headers: getHeaders(),

    body: JSON.stringify(employee),

  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function updateEmployee(
  id: string,
  employee: any
) {

  const response = await fetch(
    `${API_URL}/employees/${id}`,
    {

      method: "PUT",

     headers: getHeaders(),

      body: JSON.stringify(employee),

    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deleteEmployee(id: string) {

const response = await fetch(
  `${API_URL}/employees/${id}`,
  {
    method: "DELETE",
    headers: getHeaders(),
  }
);

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

}
function getHeaders() {
  const token = localStorage.getItem("token");

  console.log("TOKEN FROM LOCALSTORAGE =", token);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
// ==============================
// Department APIs
// ==============================

export async function getDepartments() {
  const response = await fetch(
    `${API_URL}/departments`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function createDepartment(data: any) {
  const response = await fetch(
    `${API_URL}/departments`,
    {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function updateDepartment(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/departments/${id}`,
    {
      method: "PUT",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deleteDepartment(id: string) {
  const response = await fetch(
    `${API_URL}/departments/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
 // ==============================
// Designation APIs
// ==============================

export async function getDesignations() {
  const response = await fetch(
    `${API_URL}/designations`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
// ==============================
// Attendance APIs
// ==============================

export async function getAttendance() {
  const response = await fetch(`${API_URL}/attendance`, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function createAttendance(data: any) {
  const response = await fetch(`${API_URL}/attendance`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function updateAttendance(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/attendance/${id}`,
    {
      method: "PUT",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deleteAttendance(id: string) {
  const response = await fetch(
    `${API_URL}/attendance/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
// ==============================
// Bulk Monthly Attendance
// ==============================

export async function saveMonthlyAttendance(data: any) {
  const response = await fetch(
    `${API_URL}/attendance/bulk`,
    {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getMonthlyAttendance(
  month: number,
  year: number
) {
  const response = await fetch(
    `${API_URL}/attendance/monthly?month=${month}&year=${year}`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
// ==============================
// Salary Structure APIs
// ==============================

export async function getSalaryStructures() {
  const response = await fetch(
    `${API_URL}/salary-structure`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function createSalaryStructure(data: any) {
  const response = await fetch(
    `${API_URL}/salary-structure`,
    {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function updateSalaryStructure(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/salary-structure/${id}`,
    {
      method: "PUT",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deleteSalaryStructure(id: string) {
  const response = await fetch(
    `${API_URL}/salary-structure/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
// ==============================
// Payroll APIs
// ==============================

export async function getPayroll() {
  const response = await fetch(`${API_URL}/payroll`, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : [];
}

export async function generatePayroll(data: any) {
  const response = await fetch(`${API_URL}/payroll/generate`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function markPayrollPaid(id: string) {
  const response = await fetch(`${API_URL}/payroll/paid/${id}`, {
    method: "PUT",
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deletePayroll(id: string) {
  const response = await fetch(`${API_URL}/payroll/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function getPFReport(
  month?: number,
  year?: number,
  companyId?: string
) {
  const params = new URLSearchParams();

  if (month) params.append("month", month.toString());
  if (year) params.append("year", year.toString());
  if (companyId) params.append("companyId", companyId);

  const response = await fetch(
    `${API_URL}/compliance/pf?${params.toString()}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
// ==============================
// Billing APIs
// ==============================

export async function getInvoices(companyId = "") {
  const url = companyId
    ? `${API_URL}/billing?companyId=${companyId}`
    : `${API_URL}/billing`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  console.log("Billing API Status =", response.status);
  console.log("Billing API Response =", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getInvoiceById(id: string) {
  const response = await fetch(
    `${API_URL}/billing/${id}`,
    {
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function createInvoice(data: any) {
  const response = await fetch(`${API_URL}/billing`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getReportSummary(companyId = "") {
  const url = companyId
    ? `${API_URL}/reports/summary?companyId=${companyId}`
    : `${API_URL}/reports/summary`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getEmployeesReport(companyId = "") {
  const url = companyId
    ? `${API_URL}/reports/employees?companyId=${companyId}`
    : `${API_URL}/reports/employees`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getAttendanceReport(companyId = "") {
  const url = companyId
    ? `${API_URL}/reports/attendance?companyId=${companyId}`
    : `${API_URL}/reports/attendance`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function getPayrollReport(companyId = "") {
  const url = companyId
    ? `${API_URL}/reports/payroll?companyId=${companyId}`
    : `${API_URL}/reports/payroll`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

// ===============================
// Leave APIs
// ===============================

export async function getLeaves(companyId = "") {
  const url = companyId
    ? `${API_URL}/leaves?companyId=${companyId}`
    : `${API_URL}/leaves`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function applyLeave(data: any) {
  const response = await fetch(`${API_URL}/leaves`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function updateLeaveStatus(
  id: string,
  status: string
) {
  const response = await fetch(
    `${API_URL}/leaves/${id}/status`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export async function deleteLeave(id: string) {
  const response = await fetch(
    `${API_URL}/leaves/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}
export async function getLeaveReport(companyId = "") {
  const url = companyId
    ? `${API_URL}/reports/leave?companyId=${companyId}`
    : `${API_URL}/reports/leave`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}