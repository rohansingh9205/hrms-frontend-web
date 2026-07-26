"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./company-form.module.css";

import {
  createCompany,
  updateCompany,
} from "@/lib/api";

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function CompanyForm({
  initialData,
  isEdit = false,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Company Details
    companyName: "",
    companyCode: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",

    // Admin Details
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        companyName: initialData.companyName || "",
        companyCode: initialData.companyCode || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        website: initialData.website || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "India",
        postalCode: initialData.postalCode || "",

        // Edit mode me admin details update nahi hongi
        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPassword: "",
      });
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    if (
      !form.companyName ||
      !form.companyCode ||
      !form.email ||
      !form.phone
      
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      !isEdit &&
      (
        !form.adminFirstName ||
        !form.adminEmail ||
        !form.adminPassword
      )
    ) {
      alert("Please fill admin details.");
      return;
    }

    try {
      setLoading(true);

      let result;

const companyData = {
  companyName: form.companyName,
  companyCode: form.companyCode,
  email: form.email,
  phone: form.phone,
  website: form.website,
  address: form.address,
  city: form.city,
  state: form.state,
  country: form.country,
  postalCode: form.postalCode,
};

if (isEdit) {
  result = await updateCompany(
    initialData._id,
    companyData
  );

  alert("Company Updated Successfully.");
} else {
  result = await createCompany(form);

  alert("Company Created Successfully.");
}

      console.log(result);

      router.replace("/companies");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className={styles.container}>

  <h2>{isEdit ? "Edit Company" : "Add Company"}</h2>

  <div className={styles.grid}>

    <div className={styles.inputGroup}>
      <label>Company Name *</label>
      <input
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        placeholder="Enter Company Name"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Company Code *</label>
      <input
        name="companyCode"
        value={form.companyCode}
        onChange={handleChange}
        placeholder="RST001"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Company Email *</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="company@email.com"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Phone *</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="9876543210"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Website</label>
      <input
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>City</label>
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="Lucknow"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>State</label>
      <input
        name="state"
        value={form.state}
        onChange={handleChange}
        placeholder="Uttar Pradesh"
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Country</label>
      <input
        name="country"
        value={form.country}
        onChange={handleChange}
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Postal Code</label>
      <input
        name="postalCode"
        value={form.postalCode}
        onChange={handleChange}
        placeholder="226001"
      />
    </div>

  </div>

  <div className={styles.addressBox}>
    <label>Address</label>

    <textarea
      rows={4}
      name="address"
      value={form.address}
      onChange={handleChange}
      placeholder="Enter Company Address"
    />
  </div>
  {!isEdit && (
  <>
    <h3 style={{ marginTop: "30px" }}>
      Company Admin Details
    </h3>

    <div className={styles.grid}>
      <div className={styles.inputGroup}>
        <label>Admin First Name *</label>
        <input
          name="adminFirstName"
          value={form.adminFirstName}
          onChange={handleChange}
          placeholder="Rohan"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Admin Last Name</label>
        <input
          name="adminLastName"
          value={form.adminLastName}
          onChange={handleChange}
          placeholder="Singh"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Admin Email *</label>
        <input
          type="email"
          name="adminEmail"
          value={form.adminEmail}
          onChange={handleChange}
          placeholder="admin@company.com"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Admin Password *</label>
        <input
          type="password"
          name="adminPassword"
          value={form.adminPassword}
          onChange={handleChange}
          placeholder="123456"
        />
      </div>
    </div>
  </>
)}

<div className={styles.buttonArea}>
  <button
    type="button"
    className={styles.cancel}
    onClick={() => router.push("/companies")}
  >
    Cancel
  </button>

  <button
    type="button"
    className={styles.save}
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading
      ? "Saving..."
      : isEdit
      ? "Update Company"
      : "Save Company"}
  </button>
</div>

</div>
  );
}