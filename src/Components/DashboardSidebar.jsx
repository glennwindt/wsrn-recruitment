import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css"; // ✅ Correct relative path

export default function DashboardSidebar({ userRole }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  const navItems = {
    seafarer: [
      { label: "Dashboard", to: "/dashboard/seafarer" },
      { label: "Jobs", to: "/dashboard/jobs" },
      { label: "Training", to: "/dashboard/training" },
      { label: "Social Security", to: "/dashboard/seafarer/social-security" },
    ],
    agency: [
      { label: "Dashboard", to: "/dashboard/agency" },
      { label: "Candidates", to: "/dashboard/agency/candidates" },
      { label: "Documents", to: "/dashboard/agency/docs" },
    ],
    shipping: [
      { label: "Dashboard", to: "/dashboard/shipping" },
      { label: "Fleet", to: "/dashboard/shipping/fleet" },
      { label: "Matching", to: "/dashboard/shipping/match" },
    ],
    admin: [
      { label: "Dashboard", to: "/dashboard/admin" },
      { label: "Training Integration", to: "/admin/training-integration" },
    ],
  };

  return (
    <>
      {isMobile && (
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖ Close" : "☰ Menu"}
        </button>
      )}
      <aside className={`dashboard-sidebar ${isOpen ? "open" : "collapsed"}`}>
        <h2>WSRN</h2>
        <nav>
          {navItems[userRole]?.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? "active" : ""}
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

