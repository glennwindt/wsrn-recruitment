\# 🚢 WSRN Maritime Recruitment Platform

\### 📆 Version: 1.0 — Homepage \& Dashboard Framework

\### 📅 Released: July 2025



---



\## 🌐 Homepage Redesign



\- Introduced a modern \*\*three-pane homepage layout\*\* (`Home.jsx` + `Home.css`)

&nbsp; - 💡 Header with WSRN logo and navigation (Home, About, Contact, Log In)

&nbsp; - 🌉 Hero pane featuring `lisbon-msc.jpg` with glowing overlay and animated CTA

&nbsp; - 🧭 Footer pane styled in medium blue with branding and contact line

\- Fully responsive design for desktop and mobile users

\- Smooth text animation and polished "Get Started" button



---



\## 🗂️ Component Architecture Refactor



\- Reorganized components by functional domains:

&nbsp; - `admin-dashboard/`

&nbsp; - `agency-dashboard/`

&nbsp; - `finance-tools/`

&nbsp; - `seafarer-application-form/`

&nbsp; - `payroll/`

&nbsp; - `compliance/`

&nbsp; - `widgets/`

\- Added `DashboardSidebar.jsx` with responsive mobile toggle

\- Created `overview/Dashboard.js` with company finance summary using ledger utilities



---



\## 📄 Registration Pages



\- Built fully styled pages for:

&nbsp; - `SeafarerRegister.jsx` with country selector and boarding preferences

&nbsp; - `AgencyRegister.jsx`, `ShippingRegister.jsx`, and `TrainingRegister.jsx` scaffolded and styled



---



\## 📦 Utilities \& Helpers



\- Added:

&nbsp; - `CompanyLedger.js` and `CompanyUtils.js` for financial calculations

&nbsp; - `MembershipBilling.js` to dynamically calculate agency tiers and commission changes

&nbsp; - `DataExportHelper.js` for reporting

&nbsp; - `portugueseHolidays.js` for smart scheduling logic



---



\## 🖼️ Asset Management



\- Added official WSRN logo `wsrn-logo.png` to `/assets`

\- Added full-width image `lisbon-msc.jpg` to `/pages/images`

\- Updated styling in `dashboard.css`, `Home.css`, and `Navbar.css`



---



\## 🔒 Security \& Context



\- Created `AccessControl.js` (admin), `AuthContext.jsx`, and `FinanceContext.js`



---



\## 💾 Cleanup \& Modernization



\- Removed deprecated components (`App.js`, backup JSONs)

\- Replaced with `App.jsx` and modular `AppRoutes.jsx`

\- Deleted legacy Firebase config (pending migration)



---



\## 📈 Next Steps



\- Style mobile nav bars and overlays

\- Animate login and dashboard transitions

\- Integrate real backend data

\- Publish version tag and README update



---



Created with ♥ by WSRN Dev Team — and designed by Glenn, your visionary helmsman ⚓





