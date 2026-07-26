"use client";

import AppLayout from "@/components/layout/app-layout";
import Link from "next/link";

export default function CompliancePage() {
  const cards = [
    {
      title: "Provident Fund (PF)",
      description: "Employee & Employer PF Report",
      href: "/compliance/pf",
    },
    {
      title: "Employee State Insurance (ESI)",
      description: "Employee & Employer ESI Report",
      href: "/compliance/esi",
    },
    {
      title: "Labour Welfare Fund (LWF)",
      description: "Monthly LWF Report",
      href: "/compliance/lwf",
    },
    {
      title: "Professional Tax (PT)",
      description: "Professional Tax Report",
      href: "/compliance/pt",
    },
  ];

  return (
    <AppLayout>
      <h1
        style={{
          margin: 0,
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        Compliance
      </h1>

      <p
        style={{
          marginTop: "8px",
          color: "#64748b",
        }}
      >
        Manage statutory compliance reports.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "24px",
          marginTop: "30px",
        }}
      >
                {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </p>
            </div>

            <Link
              href={card.href}
              style={{
                marginTop: "20px",
                display: "inline-block",
                textAlign: "center",
                padding: "12px",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Open Report
            </Link>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}