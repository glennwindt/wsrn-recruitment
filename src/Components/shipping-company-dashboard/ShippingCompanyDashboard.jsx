import React from "react";
import { Helmet } from "react-helmet";
import DashboardSidebar from "../DashboardSidebar";
import {
  getShippingMembershipTier,
  getActiveCommissionRate,
  shouldTriggerCommissionNotice
} from "../../utils/MembershipBilling";
import "../../styles/dashboard.css";

// Simulated backend values
const vesselCount = 8;
const crewMatches = 23;
const compliancePending = 2;
const membershipModel = "membership"; // or "commission"
const contractDate = "2025-07-01";
const commissionEffectiveDate = "2025-07-20";
const oldRate = 100;
const newRate = 115;

const tier = getShippingMembershipTier(vesselCount);
const commissionRate = getActiveCommissionRate(contractDate, commissionEffectiveDate, oldRate, newRate);
const showNotice = shouldTriggerCommissionNotice(commissionEffectiveDate);

export default function ShippingCompanyDashboard() {
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>WSRN Shipping Company Dashboard</title>
        <meta name="description" content="Manage fleet, match with certified crew, choose membership model and track legal compliance with WSRN's maritime tools." />
      </Helmet>

      <DashboardSidebar userRole="shipping" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Shipping Company Dashboard</h1>
          <p>Register vessels, match with certified crew, and manage membership tools with WSRN's maritime system.</p>
        </header>

        <section className="dashboard-card">
          <h3 className="section-title">📊 Fleet & Membership Summary</h3>
          <ul className="feature-list">
            <li><strong>Registered Vessels:</strong> {vesselCount}</li>
            <li><strong>Crew Matches Available:</strong> {crewMatches}</li>
            <li><strong>Compliance Pending:</strong> {compliancePending} case(s)</li>
            {membershipModel === "membership" ? (
              <>
                <li><strong>Membership Tier:</strong> {tier}</li>
                {vesselCount === 10 && (
                  <p className="alert-badge">⚠️ You're nearing Tier 3 — upgrade soon for unlimited access</p>
                )}
              </>
            ) : (
              <>
                <li><strong>Commission Rate:</strong> €{commissionRate} per seafarer</li>
                {showNotice && (
                  <p className="alert-badge">🔔 Upcoming commission rate change effective {commissionEffectiveDate}</p>
                )}
              </>
            )}
          </ul>
        </section>

        {/* Additional dashboard cards can remain as-is */}
        <footer className="dashboard-footer">
          <p>&copy; {new Date().getFullYear()} WSRN – Maritime Power at Your Fingertips</p>
        </footer>
      </main>
    </div>
  );
}
