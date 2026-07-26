"use client";

import { useEffect, useState } from "react";
import styles from "./company-profile.module.css";
import { getCompanyById } from "@/lib/api";

interface Props {
  id: string;
}

interface Company {
  _id: string;
  companyName: string;
  companyCode: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isActive: boolean;
}

export default function CompanyProfile({ id }: Props) {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        const response = await getCompanyById(id);
        setCompany(response.data || response);
      } catch (error) {
        console.error(error);
      }
    }

    loadCompany();
  }, [id]);

  if (!company) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>{company.companyName}</h2>
          <p>ID : {company._id}</p>
        </div>

        <span className={styles.status}>
          {company.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Company Information</h3>

          <div className={styles.item}>
            <span>Company Name</span>
            <strong>{company.companyName}</strong>
          </div>

          <div className={styles.item}>
            <span>Company Code</span>
            <strong>{company.companyCode}</strong>
          </div>

          <div className={styles.item}>
            <span>Email</span>
            <strong>{company.email}</strong>
          </div>

          <div className={styles.item}>
            <span>Phone</span>
            <strong>{company.phone}</strong>
          </div>

          <div className={styles.item}>
            <span>Website</span>
            <strong>{company.website || "-"}</strong>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Address Information</h3>

          <div className={styles.item}>
            <span>Address</span>
            <strong>{company.address}</strong>
          </div>

          <div className={styles.item}>
            <span>City</span>
            <strong>{company.city}</strong>
          </div>

          <div className={styles.item}>
            <span>State</span>
            <strong>{company.state}</strong>
          </div>

          <div className={styles.item}>
            <span>Country</span>
            <strong>{company.country}</strong>
          </div>

          <div className={styles.item}>
            <span>Postal Code</span>
            <strong>{company.postalCode}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}