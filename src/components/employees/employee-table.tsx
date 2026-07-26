    "use client";

    import { useEffect, useMemo, useState } from "react";
    import { useRouter } from "next/navigation";
    import styles from "./employee-table.module.css";

    import {
  getEmployees,
  getCompanies,
  deleteEmployee,
} from "@/lib/api";

    interface Employee {
    _id: string;

      employeeCode: string;

      firstName: string;

      lastName: string;

      email: string;

      phone: string;

      departmentName: string;

      designationName: string;

      companyName: string;

      joiningDate: string;

    }

    const PAGE_SIZE = 6;

    export default function EmployeeTable() {
      const [companies, setCompanies] = useState<any[]>([]);
const [selectedCompany, setSelectedCompany] = useState("All");

const user =

  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};

const isSuperAdmin = user?.role === "SUPER_ADMIN";

      const router = useRouter();

      const [employeeData, setEmployeeData] =
        useState<Employee[]>([]);

      const [search, setSearch] =
        useState("");

      const [department, setDepartment] =
        useState("All");

      const [page, setPage] =
        useState(1);
        

      useEffect(() => {
  async function loadEmployees() {
    try {
      if (isSuperAdmin) {
        const companyRes = await getCompanies();
        setCompanies(Array.isArray(companyRes) ? companyRes : companyRes.data || []);
      }
      const data =
  isSuperAdmin && selectedCompany !== "All"
    ? await getEmployees(selectedCompany)
    : await getEmployees();

const employees = Array.isArray(data)
  ? data
  : data.data || [];

const formattedEmployees = employees.map((emp: any) => ({
  ...emp,
  departmentName: emp.departmentId?.departmentName || "",
  companyName: emp.companyId?.companyName || "",
}));

setEmployeeData(formattedEmployees);

      
      
    } catch (error) {
      console.error(error);
    }
  }

  loadEmployees();
}, [selectedCompany, isSuperAdmin]);

      const departments = useMemo(() => {

        return [

          "All",

          ...new Set(

            employeeData.map(

              (emp) => emp.departmentName

            )

          ),

        ];

      }, [employeeData]);

      const filteredEmployees =
        useMemo(() => {

          return employeeData.filter(
            (employee) => {

              const matchesSearch =

                `${employee.firstName} ${employee.lastName}`

                  .toLowerCase()

                  .includes(
                    search.toLowerCase()
                  )

                ||

                employee.employeeCode

                  .toLowerCase()

                  .includes(
                    search.toLowerCase()
                  )

                ||

                employee.email

                  .toLowerCase()

                  .includes(
                    search.toLowerCase()
                  );

              const matchesDepartment =

                department === "All"

                ||

                employee.departmentName ===
                department;

              return (

                matchesSearch

                &&

                matchesDepartment

              );

            }

          );

        }, [

          employeeData,

          search,

          department,

        ]);

      const totalPages = Math.max(

        1,

        Math.ceil(

          filteredEmployees.length /

          PAGE_SIZE

        )

      );

      const currentPage = Math.min(

        page,

        totalPages

      );

      const paginatedEmployees =

        filteredEmployees.slice(

          (currentPage - 1) *

          PAGE_SIZE,

          currentPage * PAGE_SIZE

        );

      const handleView = (
        employee: Employee
      ) => {

        router.push(
  `/employees/${employee._id}`
);

      };

      const handleEdit = (
  employee: Employee
) => {

  router.push(
    `/employees/edit/${employee._id}`
  );

};

      const handleDelete = async (
        employee: Employee
      ) => {

        const confirmed = window.confirm(

          `Delete ${employee.firstName} ${employee.lastName}?`

        );

        if (!confirmed) return;

        try {

          await deleteEmployee(
    employee._id
  );

          setEmployeeData((prev) =>

            prev.filter(
    (emp) => emp._id !== employee._id
  )

          );

          alert(
            "Employee deleted successfully."
          );

        } catch (error) {

          console.error(error);

          alert("Delete failed.");

        }

      };

      return (   
        <div className={styles.container}>

          <div className={styles.toolbar}>

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => {

                setSearch(e.target.value);

                setPage(1);

              }}
              className={styles.searchInput}
            />
            
            <select
              value={department}
              onChange={(e) => {

                setDepartment(e.target.value);

                setPage(1);

              }}
              
              className={styles.select}
            >

              {departments.map((dept, index) => (
    <option
      key={`${dept}-${index}`}
      value={dept}
    >
      {dept}
    </option>
  ))}

            </select>
            <button
      className={styles.addButton}
      onClick={() => router.push("/employees/add")}
    >
      + Add Employee
    </button>

          </div>

          <div className={styles.tableWrapper}>

            <table className={styles.table}>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Employee</th>

                  <th>Department</th>

                  <th>Designation</th>

                  <th>Phone</th>

                  <th>Joining</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {

                  paginatedEmployees.length === 0

                  ?

                  (

                    <tr>

                      <td
                        colSpan={8}
                        className={styles.empty}
                      >

                        No employees found.

                      </td>

                    </tr>

                  )

                  :

                  (

                    paginatedEmployees.map(

                      (employee) => (

                        <tr
                          key={employee._id}
                        >

                          <td>

                            {employee.employeeCode}

                          </td>

                          <td>

                            <div
                              className={styles.employeeInfo}
                            >

                              <span
                                className={styles.employeeName}
                              >

                                {employee.firstName}{" "}

                                {employee.lastName}

                              </span>

                              <span
                                className={styles.employeeEmail}
                              >

                                {employee.email}

                              </span>

                            </div>

                          </td>

                          <td>

                            {employee.departmentName}

                          </td>

                          <td>

                            {employee.designationName}

                          </td>

                          <td>

                            {employee.phone}

                          </td>

                          <td>

                            {employee.joiningDate}

                          </td>

                          <td>

                            <span
                              className={`${styles.status} ${styles.active}`}
                            >

                              Active

                            </span>

                          </td>

                          <td>

                            <div
                              className={styles.actions}
                            >

                              <button
                                className={styles.viewButton}
                                onClick={() =>
                                  handleView(employee)
                                }
                              >

                                View

                              </button>

                              <button
                                className={styles.editButton}
                                onClick={() =>
                                  handleEdit(employee)
                                }
                              >

                                Edit

                              </button>

                              <button
                                className={styles.deleteButton}
                                onClick={() =>
                                  handleDelete(employee)
                                }
                              >

                                Delete

                              </button>

                            </div>

                          </td>

                        </tr>

                      )

                    )

                  )

                }

              </tbody>

            </table>

          </div>
                <div className={styles.pagination}>

            <div className={styles.paginationInfo}>

              Showing{" "}

              {

                filteredEmployees.length === 0

                  ? 0

                  : (currentPage - 1) * PAGE_SIZE + 1

              }

              {" - "}

              {

                Math.min(

                  currentPage * PAGE_SIZE,

                  filteredEmployees.length

                )

              }

              {" of "}

              {filteredEmployees.length}

              {" employees"}

            </div>

            <div className={styles.paginationControls}>

              <button

                type="button"

                className={styles.pageButton}

                disabled={currentPage === 1}

                onClick={() =>

                  setPage((prev) =>

                    Math.max(prev - 1, 1)

                  )

                }

              >

                Previous

              </button>

              {

                Array.from(

                  {

                    length: totalPages,

                  },

                  (_, index) => {

                    const pageNumber = index + 1;

                    return (

                      <button

                        key={pageNumber}

                        type="button"

                        className={`${styles.pageButton} ${

                          currentPage === pageNumber

                            ? styles.activePage

                            : ""

                        }`}

                        onClick={() =>

                          setPage(pageNumber)

                        }

                      >

                        {pageNumber}

                      </button>

                    );

                  }

                )

              }

              <button

                type="button"

                className={styles.pageButton}

                disabled={

                  currentPage === totalPages

                }

                onClick={() =>

                  setPage((prev) =>

                    Math.min(

                      prev + 1,

                      totalPages

                    )

                  )

                }

              >

                Next

              </button>

            </div>

          </div>

        </div>

      );

    }