"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import styles from "./app-sidebar.module.css";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Company Management",
    href: "/companies",
    icon: <FaBuilding />,
  },
  {
    title: "Employee Management",
    href: "/employees",
    icon: <FaUsers />,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: <FaMoneyCheckAlt />,
  },
  {
    title: "Compliance",
    href: "/compliance/pf",
    icon: <FaShieldAlt />,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <FaFileInvoiceDollar />,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <FaChartBar />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <FaCog />,
  },
];

export default function AppSidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  console.log("Stored User:", storedUser);

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);

    console.log("Parsed User:", parsedUser);

    setUser(parsedUser);
  }
}, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoBox}>R&S</div>

        <div>
          <h2>R&S Tech Info</h2>
          <p>HRMS Software</p>
        </div>
      </div>

      <div className={styles.searchBox}>
        <FaSearch />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <nav className={styles.menu}>
        {menuItems
          .filter((item) => {
            // Sirf SUPER_ADMIN ko Company Management dikhana hai
            if (
              item.href === "/companies" &&
              user?.role !== "SUPER_ADMIN"
            ) {
              return false;
            }

            return true;
          })
          .map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={styles.menuItem}
            >
              <span className={styles.icon}>
                {item.icon}
              </span>

              <span>{item.title}</span>
            </Link>
          ))}
      </nav>

      <div className={styles.bottomCard}>
        <FaUserCircle className={styles.userIcon} />

        <div>
          <h4>
            {user
              ? `${user.firstName} ${user.lastName}`
              : "User"}
          </h4>

          <p>{user?.role || ""}</p>
        </div>
      </div>
    </aside>
  );
}