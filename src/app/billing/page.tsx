"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "../../components/layout/app-layout";
import {
  getInvoices,
  createInvoice,
  getCompanies,
} from "../../lib/api";

interface Invoice {
  _id: string;
  invoiceNumber: string;
  companyId: {
    _id: string;
    companyName: string;
  };
  invoiceDate: string;
  dueDate: string;
  description: string;
  amount: number;
  gst: number;
  totalAmount: number;
  status: string;
  notes: string;
}

interface Company {
  _id: string;
  companyName: string;
}

export default function BillingPage() {
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : "";

  const [loading, setLoading] = useState(true);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Filter
  const [selectedCompany, setSelectedCompany] = useState("");

  // Create Form
  const [companyId, setCompanyId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("18");
  const [notes, setNotes] = useState("");

  const loadInvoices = async (company = "") => {
    try {
      const res = await getInvoices(company);

      setInvoices(res?.data || []);
    } catch (err) {
      console.error(err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompanyFilter = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;

    setSelectedCompany(id);

    loadInvoices(id);
  };

  const handleCreate = async () => {
    try {
      await createInvoice({
        companyId,
        invoiceDate,
        dueDate,
        description,
        amount: Number(amount),
        gst: Number(gst),
        notes,
      });

      alert("Billing Created Successfully");

      setCompanyId("");
      setInvoiceDate("");
      setDueDate("");
      setDescription("");
      setAmount("");
      setGst("18");
      setNotes("");

      loadInvoices(selectedCompany);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (role === "SUPER_ADMIN") {
      loadCompanies();
    }

    loadInvoices();
  }, []);
    return (
    <AppLayout>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        Billing
      </h1>

      {/* Company Filter - Super Admin Only */}
      {role === "SUPER_ADMIN" && (
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Filter Company
          </label>

          <select
            value={selectedCompany}
            onChange={handleCompanyFilter}
            style={{
              padding: "8px",
              minWidth: "250px",
            }}
          >
            <option value="">All Companies</option>

            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Create Billing */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        {role === "SUPER_ADMIN" && (
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          >
            <option value="">Select Company</option>

            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.companyName}
              </option>
            ))}
          </select>
        )}

        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="GST %"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          onClick={handleCreate}
          style={{
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Billing
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Billing Found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.invoiceNumber}</td>

                  <td>{invoice.companyId?.companyName}</td>

                  <td>
                    ₹
                    {Number(invoice.totalAmount).toLocaleString("en-IN")}
                  </td>

                  <td>{invoice.status}</td>

                  <td>
                    <Link href={`/billing/invoice/${invoice._id}`}>
                      <button
                        style={{
                          padding: "6px 12px",
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        View Invoice
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </AppLayout>
  );
}