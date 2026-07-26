"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/lib/api";
import styles from "./CompanySummary.module.css";

interface Company {
  _id: string;
  companyName: string;
  companyCode: string;
  email: string;
  phone: string;
  website: string;
}

export default function CompanySummary() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        const response = await getDashboard();

        if (response.success) {
          setCompany(response.data.company);
        }
      } catch (error) {
        console.error("Company Error:", error);
      }
    }

    loadCompany();
  }, []);

  if (!company) {
    return (
      <div className={styles.card}>
        <h2>Company Summary</h2>
        <p>No company data found.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>Company Summary</h2>

      <table className={styles.table}>
        <tbody>
          <tr>
            <td><strong>Company Name</strong></td>
            <td>{company.companyName}</td>
          </tr>

          <tr>
            <td><strong>Company Code</strong></td>
            <td>{company.companyCode}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>{company.email}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>{company.phone}</td>
          </tr>

          <tr>
            <td><strong>Website</strong></td>
            <td>{company.website}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}