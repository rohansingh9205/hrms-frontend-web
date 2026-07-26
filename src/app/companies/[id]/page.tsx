"use client";

import AppLayout from "../../../components/layout/app-layout";
import CompanyProfile from "../../../components/companies/company-profile";
import { useParams } from "next/navigation";

export default function CompanyProfilePage() {
  const params = useParams();

  return (
    <AppLayout>
      <CompanyProfile id={params.id as string} />
    </AppLayout>
  );
}