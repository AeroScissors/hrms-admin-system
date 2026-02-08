import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   ERROR NORMALIZER
========================= */

const normalizeError = (error) => {
  if (error.response) {
    return (
      error.response.data?.detail ||
      error.response.data?.message ||
      "Server error occurred"
    );
  }

  if (error.request) {
    return "Unable to reach server. Please check backend.";
  }

  return error.message || "Unexpected error";
};

/* =========================
   EMPLOYEES
========================= */

export const getEmployees = async () => {
  try {
    const res = await api.get("/employees");
    return { data: res.data || [], error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const res = await api.post("/employees", employeeData);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const res = await api.delete(`/employees/${employeeId}`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

/* =========================
   ATTENDANCE
========================= */

export const markAttendance = async (attendanceData) => {
  try {
    const res = await api.post("/attendance", attendanceData);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const getAttendanceByEmployee = async (
  employeeId,
  startDate,
  endDate
) => {
  try {
    const res = await api.get(`/attendance/${employeeId}`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return { data: res.data || [], error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

/* =========================
   REPORTS
========================= */

export const getEmployeeAttendanceReport = async (
  employeeId,
  startDate,
  endDate
) => {
  try {
    const res = await api.get(
      `/reports/attendance/employee/${employeeId}`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const getMonthlyAttendanceReport = async (
  employeeId,
  startDate,
  endDate
) => {
  try {
    const res = await api.get(
      `/reports/attendance/monthly/${employeeId}`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const getOrganizationAttendanceSummary = async (
  startDate,
  endDate
) => {
  try {
    const res = await api.get("/reports/attendance/summary", {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const getAttendanceByDepartment = async () => {
  try {
    const res = await api.get("/reports/attendance/by-department");
    return { data: res.data || [], error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

/* =========================
   DASHBOARD
========================= */

export const getDashboardToday = async () => {
  try {
    const res = await api.get("/dashboard/today");
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export const getDashboardLast30Days = async () => {
  try {
    const res = await api.get("/dashboard/last-30-days");
    return { data: res.data || [], error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
};

export default api;
