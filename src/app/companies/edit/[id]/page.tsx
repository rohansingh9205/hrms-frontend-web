"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AppLayout from "@/components/layout/app-layout";
import CompanyForm from "@/components/companies/company-form";
import { getCompanyById } from "@/lib/api";

export default function EditCompanyPage() {
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      try {
        const response = await getCompanyById(id);
        setCompany(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, [id]);

  return (
    <AppLayout>
      <div style={{ marginBottom: 24 }}>
        <h1>Edit Company</h1>
        <p>Update company information.</p>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <CompanyForm
          initialData={company}
          isEdit={true}
        />
      )}
    </AppLayout>
  );
}