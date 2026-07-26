"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppLayout from "../../../../components/layout/app-layout";
import { getInvoiceById } from "../../../../lib/api";

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

export default function InvoicePage() {
  const params = useParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await getInvoiceById(params.id as string);

      setInvoice(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    if (loading) {
    return (
      <AppLayout>
        <p>Loading Invoice...</p>
      </AppLayout>
    );
  }

  if (!invoice) {
    return (
      <AppLayout>
        <p>Invoice not found.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Invoice</h1>

            <p style={{ marginTop: "10px" }}>
              Invoice No : <strong>{invoice.invoiceNumber}</strong>
            </p>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Print Invoice
          </button>
        </div>

        <hr />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <div>
            <h3>Company Details</h3>

            <p>
              <strong>Company :</strong>{" "}
              {invoice.companyId?.companyName}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {invoice.status}
            </p>
          </div>

          <div>
            <h3>Invoice Details</h3>

            <p>
              <strong>Invoice Date :</strong>{" "}
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Due Date :</strong>{" "}
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3>Description</h3>

          <p>{invoice.description}</p>
        </div>
                <table
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Amount
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                GST
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                ₹{Number(invoice.amount).toLocaleString("en-IN")}
              </td>

              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                {invoice.gst}%
              </td>

              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ₹{Number(invoice.totalAmount).toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>

        {invoice.notes && (
          <div style={{ marginTop: "30px" }}>
            <h3>Notes</h3>

            <p>{invoice.notes}</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}