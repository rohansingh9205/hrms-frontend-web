"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  async function login() {

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),

    });

    if (!response.ok) {

      const errorText = await response.text();
      throw new Error(errorText);

    }


    const data = await response.json();

console.log("LOGIN RESPONSE =", data);
console.log("TOKEN =", data.token);



    localStorage.setItem("token", data.token);
    console.log(
  "TOKEN AFTER SAVE =",
  localStorage.getItem("token")
);

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", data.user.role);
localStorage.setItem("companyId", data.user.companyId || "");
localStorage.setItem(
  "userName",
  `${data.user.firstName} ${data.user.lastName}`
);
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

    alert(data.message);

    router.replace("/dashboard");

  } catch (error: any) {

    alert(error.message);

  }

}

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            textAlign: "center",
          }}
        >
          HRMS Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        <div
          style={{
            textAlign: "right",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => router.push("/forgot-password")}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={login}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}