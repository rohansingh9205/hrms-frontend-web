"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEmployeeById } from "@/lib/api";
import styles from "./employee-profile.module.css";

export default function EmployeeProfile() {

  const params = useParams();

  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {

   async function loadEmployee() {
  try {
    const employeeId = Array.isArray(params.id)
      ? params.id[0]
      : params.id;

    const data = await getEmployeeById(employeeId);

console.log("Employee API =", data);
console.log("Employee data =", data?.data);

setEmployee(data?.data ?? null);
  } catch (error) {
    console.error(error);
  }
}

    loadEmployee();

  }, [params]);

  if (!employee) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className={styles.container}>

      <div className={styles.header}>

        <div className={styles.avatar}>

          {employee.firstName.charAt(0)}
          {employee.lastName
            ? employee.lastName.charAt(0)
            : ""}

        </div>

        <div>

          <h2>

            {employee.firstName} {employee.lastName}

          </h2>

          <p>{employee.designationName}</p>

          <span className={styles.status}>

            {employee.employmentType}

          </span>

        </div>

      </div>

      <div className={styles.grid}>

        <div className={styles.card}>

          <h3>Personal Information</h3>

          <div className={styles.item}>
            <span>Employee Code</span>
            <strong>{employee.employeeCode}</strong>
          </div>

          <div className={styles.item}>
            <span>Email</span>
            <strong>{employee.email}</strong>
          </div>

          <div className={styles.item}>
            <span>Phone</span>
            <strong>{employee.phone}</strong>
          </div>

          <div className={styles.item}>
            <span>Gender</span>
            <strong>{employee.gender}</strong>
          </div>

          <div className={styles.item}>
            <span>Date of Birth</span>
            <strong>{employee.dateOfBirth}</strong>
          </div>

          <div className={styles.item}>
            <span>Address</span>
            <strong>{employee.address}</strong>
          </div>

        </div>
                <div className={styles.card}>

          <h3>Employment Details</h3>

          <div className={styles.item}>
            <span>Company</span>
            <strong>{employee.companyName}</strong>
          </div>

          <div className={styles.item}>
            <span>Department</span>
            <strong>{employee.departmentName}</strong>
          </div>

          <div className={styles.item}>
            <span>Designation</span>
            <strong>{employee.designationName}</strong>
          </div>

          <div className={styles.item}>
            <span>Joining Date</span>
            <strong>{employee.joiningDate}</strong>
          </div>

          <div className={styles.item}>
            <span>Employment Type</span>
            <strong>{employee.employmentType}</strong>
          </div>

          <div className={styles.item}>
            <span>Salary</span>
            <strong>₹ {employee.salary}</strong>
          </div>

        </div>

        <div className={styles.card}>

          <h3>Attendance Summary</h3>

          <div className={styles.stats}>

            <div>
              <h4>22</h4>
              <span>Present</span>
            </div>

            <div>
              <h4>2</h4>
              <span>Leave</span>
            </div>

            <div>
              <h4>1</h4>
              <span>Absent</span>
            </div>

          </div>

        </div>
                <div className={styles.card}>

          <h3>Payroll Summary</h3>

          <div className={styles.item}>
            <span>Basic Salary</span>
            <strong>₹ {employee.salary}</strong>
          </div>

          <div className={styles.item}>
            <span>Bonus</span>
            <strong>₹ 0</strong>
          </div>

          <div className={styles.item}>
            <span>Deductions</span>
            <strong>₹ 0</strong>
          </div>

          <div className={styles.item}>
            <span>Net Salary</span>
            <strong>₹ {employee.salary}</strong>
          </div>

        </div>

      </div>

    </div>

  );

}