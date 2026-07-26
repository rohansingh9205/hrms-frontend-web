"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./attendance-table.module.css";
import { useRouter } from "next/navigation";
import { getAttendance } from "@/lib/api";

interface Attendance {
  _id: string;

  employeeId: {
    employeeCode: string;
    firstName: string;
    lastName: string;
  };

  companyId: {
    companyName: string;
  };

  date: string;
  status: string;
}

const PAGE_SIZE = 5;

interface Props {
  onAddAttendance: () => void;
}

export default function AttendanceTable({
  onAddAttendance,
}: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [attendanceData, setAttendanceData] = useState<
    Attendance[]
  >([]);

  useEffect(() => {
    async function loadAttendance() {
      try {
        const response = await getAttendance();

        setAttendanceData(
          Array.isArray(response)
            ? response
            : response.data || []
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadAttendance();
  }, []);

  const filtered = useMemo(() => {
    return attendanceData.filter((emp) => {
      const fullName =
        `${emp.employeeId.firstName} ${emp.employeeId.lastName}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        emp.employeeId.employeeCode
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        emp.companyId.companyName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [attendanceData, search]);

  const rows = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          className={styles.search}
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
  className={styles.addButton}
  onClick={onAddAttendance}
>
  Mark Attendance
</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Company</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId.employeeCode}</td>

              <td>
                {emp.employeeId.firstName}{" "}
                {emp.employeeId.lastName}
              </td>

              <td>{emp.companyId.companyName}</td>

              <td>
                {new Date(emp.date).toLocaleDateString()}
              </td>

              <td>{emp.status}</td>

              <td>
                <button
                  className={styles.viewButton}
                  onClick={() =>
                    router.push(`/attendance/${emp._id}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}