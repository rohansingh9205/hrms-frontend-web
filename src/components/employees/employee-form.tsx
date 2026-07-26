"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./employee-form.module.css";

import {
  createEmployee,
  updateEmployee,
  getEmployeeById,
  getCompanies,
  getDepartments,
  getDesignations,
}
 from "@/lib/api";

interface Company {
  _id: string;
  companyName: string;
}
interface Department {
  _id: string;
  departmentName: string;
}

interface Designation {
  _id: string;
  designationName: string;
}

export interface EmployeeFormData {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joiningDate: string;
  gender: string;
  employmentType: string;
  salary: string;
  address: string;
  companyId: string;
  departmentId: string;
  designation: string; 
}

export default function EmployeeForm() {

  const router = useRouter();

  const params = useParams();

  const isEdit = !!params?.id;
  const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};

  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] =
    useState<Company[]>([]);

    const [departments, setDepartments] =
  useState<Department[]>([]);

const [designations, setDesignations] =
  useState<Designation[]>([]);

  const [form, setForm] =
    useState<EmployeeFormData>({

      employeeCode: "",

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      dateOfBirth: "",

      joiningDate: "",

      gender: "",

      employmentType: "Full Time",

      salary: "",

      address: "",

      companyId: "",

      departmentId: "",

      designation: "",

    });

 useEffect(() => {

  async function loadMasterData() {

    try {

      let companyRes: any = [];

if (user?.role === "SUPER_ADMIN") {
  companyRes = await getCompanies();
}

const [departmentRes, designationRes] = await Promise.all([
  getDepartments(),
  getDesignations(),
]);

if (user?.role === "SUPER_ADMIN") {
  setCompanies(
    Array.isArray(companyRes)
      ? companyRes
      : companyRes.data || []
  );
}

setDepartments(
  Array.isArray(departmentRes)
    ? departmentRes
    : departmentRes.data || []
);

setDesignations(
  Array.isArray(designationRes)
    ? designationRes
    : designationRes.data || []
);

      

    } catch (error) {

      console.error(error);

    }

  }

  loadMasterData();

}, []);

  useEffect(() => {

    if (!isEdit) return;

    async function loadEmployee() {

      try {

        const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

const response = await getEmployeeById(id);

const data = response.data;

setForm({

  employeeCode:
    data.employeeCode || "",

  firstName:
    data.firstName || "",

          lastName:
            data.lastName || "",

          email:
            data.email || "",

          phone:
            data.phone || "",

          dateOfBirth:
            data.dateOfBirth || "",

          joiningDate:
            data.joiningDate || "",

          gender:
            data.gender || "",

          employmentType:
            data.employmentType || "Full Time",

          salary:
            data.salary?.toString() || "",

          address:
            data.address || "",

          companyId:
  data.companyId?._id || "",

departmentId:
  data.departmentId?._id || "",

designation:
  data.designation || "",

        });

      } catch (error) {

        console.error(error);

      }

    }

    loadEmployee();

  }, [isEdit, params]);
 function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLSelectElement |
    HTMLTextAreaElement
  >
) {
  const { name, value } = e.target;



  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}

async function handleSubmit(
  e: React.FormEvent
) {

  e.preventDefault();

  if (
  !form.employeeCode ||
  !form.firstName ||
  !form.email ||
  !form.phone ||
  !form.companyId ||
  !form.departmentId ||
  !form.designation
) {
  alert("Please fill required fields.");
  return;
}

   

  try {

    setLoading(true);

   const payload = {

  employeeCode: form.employeeCode,

  firstName: form.firstName,

  lastName: form.lastName,

  email: form.email,

  phone: form.phone,

  dateOfBirth: form.dateOfBirth,

  joiningDate: form.joiningDate,

  gender: form.gender,

  employmentType: form.employmentType,

  salary: Number(form.salary),

  address: form.address,

  companyId: form.companyId,

  departmentId: form.departmentId,

  designation: form.designation,

};



if (isEdit) {

  const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

await updateEmployee(
  id,
  payload
);

} else {

  await createEmployee(payload);
 

}

    router.push("/employees");

  } catch (error: any) {

    console.error(error);

    alert(error.message);

  } finally {

    setLoading(false);

  }

}
return (

<form
  className={styles.container}
  onSubmit={handleSubmit}
>

  <h2>

    {isEdit
      ? "Edit Employee"
      : "Add Employee"}

  </h2>

  <div className={styles.grid}>

  {/* Employee Code */}
  <div className={styles.group}>
    <label>Employee Code</label>

    <input
      name="employeeCode"
      value={form.employeeCode}
      onChange={handleChange}
      placeholder="EMP001"
    />
  </div>

  {/* Department */}
  <div className={styles.group}>
    <label>Department</label>

    <select
      name="departmentId"
      value={form.departmentId}
      onChange={handleChange}
    >
      <option value="">Select Department</option>

      {departments.map((department) => (
        <option
          key={department._id}
          value={department._id}
        >
          {department.departmentName}
        </option>
      ))}
    </select>
  </div>

  {/* First Name */}
  <div className={styles.group}>
    <label>First Name</label>

    <input
      name="firstName"
      value={form.firstName}
      onChange={handleChange}
    />
  </div>
    
    <div className={styles.group}>

      <label>Last Name</label>

      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />

    </div>

    <div className={styles.group}>

      <label>Email</label>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

    </div>

    <div className={styles.group}>

      <label>Phone</label>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />

    </div>

    <div className={styles.group}>

      <label>Company</label>

      <select
        name="companyId"
        value={form.companyId}
        onChange={handleChange}
      >

        <option value="">
          Select Company
        </option>

        {companies.map((company) => (

          <option
  key={company._id}
  value={company._id}
>
  {company.companyName}
</option>

        ))}

      </select>

    </div>

    

    <div className={styles.group}>

  <label>Designation</label>

  <input
  list="designation-list"
  name="designation"
  value={form.designation}
  onChange={handleChange}
/>

  <datalist id="designation-list">
    {designations.map((designation) => (
      <option
        key={designation._id}
        value={designation.designationName}
      />
    ))}
  </datalist>

</div>
        <div className={styles.group}>

      <label>Joining Date</label>

      <input
        type="date"
        name="joiningDate"
        value={form.joiningDate}
        onChange={handleChange}
      />

    </div>

    <div className={styles.group}>

      <label>Date of Birth</label>

      <input
        type="date"
        name="dateOfBirth"
        value={form.dateOfBirth}
        onChange={handleChange}
      />

    </div>

    <div className={styles.group}>

      <label>Gender</label>

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
      >

        <option value="">Select</option>

        <option value="Male">Male</option>

        <option value="Female">Female</option>

        <option value="Other">Other</option>

      </select>

    </div>

    <div className={styles.group}>

      <label>Employment Type</label>

      <select
        name="employmentType"
        value={form.employmentType}
        onChange={handleChange}
      >

        <option value="Full Time">
          Full Time
        </option>

        <option value="Part Time">
          Part Time
        </option>

        <option value="Contract">
          Contract
        </option>

        <option value="Intern">
          Intern
        </option>

      </select>

    </div>

    <div className={styles.group}>

      <label>Salary</label>

      <input
        type="number"
        name="salary"
        value={form.salary}
        onChange={handleChange}
      />

    </div>

    <div
      className={`${styles.group} ${styles.fullWidth}`}
    >

      <label>Address</label>

      <textarea
        rows={4}
        name="address"
        value={form.address}
        onChange={handleChange}
      />

    </div>

  </div>

  <div className={styles.buttons}>

    <button
      type="button"
      onClick={() => router.push("/employees")}
    >

      Cancel

    </button>

    <button
      type="submit"
      disabled={loading}
    >

      {loading
        ? "Saving..."
        : isEdit
        ? "Update Employee"
        : "Save Employee"}

    </button>

  </div>

</form>

);
}