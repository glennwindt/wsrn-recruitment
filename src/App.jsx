// 🔹 Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import DashboardLogin from "./pages/DashboardLogin";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminDashboard from "./pages/AdminDashboard";
import TrainingCenterDashboard from "./pages/TrainingCenterDashboard";
import LandingPage from "./pages/LandingPage";
import TrackingPage from "./pages/TrackingPage";
import SalaryCalculatorPage from "./pages/SalaryCalculatorPage";
import TrainingLogin from "./pages/TrainingLogin";
import SeafarerLogin from "./pages/SeafarerLogin";
import ShippingLogin from "./pages/ShippingLogin";
import AgencyLogin from "./pages/AgencyLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // ✅ Policy & Procedures Page

// 🛡 Dashboards
import AgencyDashboard from "./components/agency-dashboard/AgencyDashboard";
import SeafarerDashboard from "./components/seafarer-dashboard/SeafarerDashboard";
import ShippingCompanyDashboard from "./components/shipping-company-dashboard/ShippingCompanyDashboard";
import PayrollDashboard from "./components/PayrollDashboard";

// 📝 Register Pages
import SeafarerRegister from "./pages/register/SeafarerRegister";
import AgencyRegister from "./pages/register/AgencyRegister";
import ShippingRegister from "./pages/register/ShippingRegister";
import TrainingRegister from "./pages/register/TrainingRegister";

// 🔒 Protected Route
import ProtectedRoute from "./routing/ProtectedRoute";

// 🌐 Global UI
import Navbar from "./components/Navbar";
import ChatAgentWidget from "./components/ChatAgentWidget";
import FloatingLogo from "./components/FloatingLogo";

// 🧭 Global Styles
import "./App.css";

// 🌐 Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧪 Test Data
const testEmployee = {
  name: "João Silva",
  baseSalary: 2200,
  hourlyRate: 12,
  fieldHours: 18,
  overtimeShifts: [
    { date: "2025-08-15", hours: 4 },
    { date: "2025-08-17", hours: 6 },
    { date: "2025-08-19", hours: 2 },
  ],
};

function App() {
  return (
    <div id="root">
      <Router>
        <Navbar />
        <FloatingLogo />

        <main>
          <Routes>
            {/* 🆕 Landing Page */}
            <Route path="/landing" element={<LandingPage />} />

            {/* 🌊 Public Navigation */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/policy" element={<PrivacyPolicy />} /> {/* ✅ Policy & Procedures */}

            {/* 🔐 Login Pages */}
            <Route path="/login/training" element={<TrainingLogin />} />
            <Route path="/login/seafarer" element={<SeafarerLogin />} />
            <Route path="/login/shipping" element={<ShippingLogin />} />
            <Route path="/login/agency" element={<AgencyLogin />} />

            {/* 🧭 Other Public Pages */}
            <Route path="/dashboard-login" element={<DashboardLogin />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* 📝 Registration Routes */}
            <Route path="/register/seafarer" element={<SeafarerRegister />} />
            <Route path="/register/agency" element={<AgencyRegister />} />
            <Route path="/register/shipping" element={<ShippingRegister />} />
            <Route path="/register/training" element={<TrainingRegister />} />

            {/* ⚓ Dashboards Protected by Role */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "staff", "bookkeeper"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/agency"
              element={
                <ProtectedRoute allowedRoles={["agency"]}>
                  <AgencyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seafarer"
              element={
                <ProtectedRoute allowedRoles={["seafarer"]}>
                  <SeafarerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/shipping"
              element={
                <ProtectedRoute allowedRoles={["shipping"]}>
                  <ShippingCompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/training"
              element={
                <ProtectedRoute allowedRoles={["training"]}>
                  <TrainingCenterDashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ NEW: Task Tracking Route */}
            <Route path="/tracking" element={<TrackingPage />} />

            {/* 🧮 Payroll Dashboard Route */}
            <Route path="/payroll" element={<PayrollDashboard employee={testEmployee} />} />

            {/* 🧮 NEW: Salary Calculator Page */}
            <Route path="/salarycalculator" element={<SalaryCalculatorPage />} />
          </Routes>
        </main>

        <footer>
          © 2025 WSRN. All rights reserved. | Powered by oceans of opportunity
        </footer>

        <ChatAgentWidget />
      </Router>
    </div>
  );
}

export default App;

