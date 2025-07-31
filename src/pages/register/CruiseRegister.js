import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DropdownRoleSelector from "@/components/common/DropdownRoleSelector";
import { cruiseCrewCategories } from "@/utils/cruiseCrewCategories";

export default function CruiseRegister() {
  const [formData, setFormData] = useState({
    cruiseCompanyName: "",
    vesselName: "",
    vesselType: "",
    contactPerson: "",
    contactEmail: "",
    countryOfOperation: "",
    appliedRole: "" // 🔧 dropdown selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, appliedRole: role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cruise registration:", formData);
    alert("Cruise operator registered successfully!");
  };

  return (
    <main className="page">
      <Helmet>
        <title>Register Cruise Operator | WSRN</title>
        <meta
          name="description"
          content="Connect with WSRN to streamline cruise crew hiring, onboard training, and verified documentation for your vessels."
        />
      </Helmet>

      <h1>Register Cruise Company</h1>
      <p>
        Cruise companies can access certified crew, automate onboarding flows,
        and optimize placement through the WSRN platform.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="cruiseCompanyName"
          placeholder="Cruise Company Name"
          value={formData.cruiseCompanyName}
          onChange={handleChange}
          required
        />
        <input
          name="vesselName"
          placeholder="Primary Vessel Name"
          value={formData.vesselName}
          onChange={handleChange}
          required
        />
        <input
          name="vesselType"
          placeholder="Vessel Type"
          value={formData.vesselType}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Primary Contact Person"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
        <input
          name="countryOfOperation"
          placeholder="Country of Operation"
          value={formData.countryOfOperation}
          onChange={handleChange}
          required
        />

        <label>Select Target Crew Role</label>
        <DropdownRoleSelector
          onSelect={handleRoleSelect}
          defaultValue=""
          categories={cruiseCrewCategories}
        />

        <button type="submit">Submit Registration</button>
      </form>

      <footer>
        <p>
          © {new Date().getFullYear()} WSRN – Enhancing Cruise Operations
          Worldwide
        </p>
      </footer>
    </main>
  );
}

