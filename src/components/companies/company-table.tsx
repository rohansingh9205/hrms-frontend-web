"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./company-table.module.css";
import { getCompanies, deleteCompany } from "@/lib/api";

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

const PAGE_SIZE = 5;

export default function CompanyTable() {
  const router = useRouter();

  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const response = await getCompanies();

        // Handles both {data:[...]} and [...] responses
        if (Array.isArray(response)) {
          setCompanyData(response);
        } else {
          setCompanyData(response.data || []);
        }
      } catch (error) {
        console.error("Error loading companies:", error);
      }
    }

    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companyData.filter((company) => {
      const q = search.toLowerCase();

      return (
        company.companyName.toLowerCase().includes(q) ||
        company.companyCode.toLowerCase().includes(q) ||
        company.email.toLowerCase().includes(q) ||
        company.phone.toLowerCase().includes(q)
      );
    });
  }, [companyData, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / PAGE_SIZE)
  );

  const companies = filteredCompanies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleView = (id: string) => {
    router.push(`/companies/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/companies/edit/${id}`);
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = window.confirm(`Delete ${name}?`);

    if (!ok) return;

    try {
      await deleteCompany(id);

      setCompanyData((prev) =>
        prev.filter((company) => company._id !== id)
      );

      alert("Company deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button
          className={styles.addBtn}
          onClick={() => router.push("/companies/add")}
        >
          + Add Company
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Company Code</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company._id}>
                <td>{company.companyName}</td>
                <td>{company.companyCode}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
                <td>{company.city || "-"}</td>

                <td>
                  <span className={styles.status}>
                    {company.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <div className={styles.action}>
                    <button
                      className={styles.view}
                      onClick={() => handleView(company._id)}
                    >
                      View
                    </button>

                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(company._id)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.delete}
                      onClick={() =>
                        handleDelete(company._id, company.companyName)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                style={{
                  textAlign: "center",
                  padding: "24px",
                  color: "#64748b",
                }}
              >
                No company found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span>
          Showing {companies.length} of {filteredCompanies.length}
        </span>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}