import React from "react";
import { Helmet } from "react-helmet";
import DashboardSidebar from "../DashboardSidebar";
import MembershipStatus from "./MembershipStatus";
import {
  getAgencyMembershipTier,
  getActiveCommissionRate,
  shouldTriggerCommissionNotice
} from "../../utils/MembershipBilling";
import "../../styles/dashboard.css";

// Simulated agency data
const agency = {
  accountType: "membership", // or "commission"
  appliedSeafarers: 42,
  verifiedDocuments: 28,
  scheduledInterviews: 5,
  membershipExpiry: "2025-08-15",
  contractDate: "2025-07-05",
  commissionEffectiveDate: "2025-07-20",
  oldRate: 100,
  newRate: 115
};

const agencyTier = getAgencyMembershipTier(agency.appliedSeafarers);
const commissionRate = getActiveCommissionRate(
  agency.contractDate,
  agency.commissionEffectiveDate,
  agency.oldRate,
  agency.newRate
);
const showNotice = shouldTriggerCommissionNotice(agency.commissionEffectiveDate);

export default function AgencyDashboard() {
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>WSRN Agency Dashboard</title>
        <meta
          name="description"
          content="Control panel for maritime recruitment agencies. Post jobs, manage candidates, schedule interviews and access verified documents."
        />
      </Helmet>

      <DashboardSidebar userRole="agency" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Agency Dashboard</h1>
          <p>
            Post jobs, manage candidates, and access recruitment tools within the WSRN
            network.
          </p>
        </header>

        <section className="dashboard-card">
          <h3 className="section-title">📊 Agency Activity Summary</h3>
          <ul className="feature-list">
            <li>
              <strong>Applied Seafarers:</strong> {agency.appliedSeafarers}
            </li>
            <li>
              <strong>Verified Documents:</strong> {agency.verifiedDocuments}
            </li>
            <li>
              <strong>Scheduled Interviews:</strong> {agency.scheduledInterviews}
            </li>
            {agency.accountType === "membership" ? (
              <>
                <li>
                  <strong>Membership Tier:</strong> {agencyTier}
                </li>
                <li>
                  <strong>Expiry:</strong> {agency.membershipExpiry}
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Commission Rate:</strong> €{commissionRate} per contracted
                  seafarer
                </li>
                {showNotice && (
                  <p className="alert-badge">
                    🔔 Commission rate changing on {agency.commissionEffectiveDate}
                  </p>
                )}
              </>
            )}
          </ul>
        </section>

        {/* ✅ MembershipStatus panel activated */}
        <section className="dashboard-card">
          <h3 className="section-title">🏷️ Membership & Billing Details</h3>
          <MembershipStatus />
        </section>

        <footer className="dashboard-footer">
          <p>
            &copy; {new Date().getFullYear()} WSRN – Empowering Recruitment Agencies
            with Smart Maritime Tools
          </p>
        </footer>
      </main>
    </div>
  );
}

