import React, { useState } from "react";

const ComplaintForm = ({ onSubmit }) => {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) return alert("Please confirm your submission.");
    const complaintData = {
      category,
      details,
      timestamp: new Date().toISOString(),
    };
    onSubmit?.(complaintData);
  };

  return (
    <form className="wsrn-complaint-form" onSubmit={handleSubmit}>
      <h2>📝 Submit a Concern</h2>

      <label>
        Type of Complaint:
        <select required onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select...</option>
          <option value="payment">Delayed Payment</option>
          <option value="harassment">Discrimination/Harassment</option>
          <option value="contract">Inaccurate Contract Terms</option>
          <option value="safety">Unsafe Working Conditions</option>
          <option value="dispatch">CTT Dispatch Issue</option>
          <option value="other">Other</option>
        </select>
      </label>

      {category === "other" && (
        <textarea
          required
          placeholder="Describe your concern..."
          onChange={(e) => setDetails(e.target.value)}
        />
      )}

      {category !== "other" && (
        <textarea
          required
          placeholder="Additional details (optional)..."
          onChange={(e) => setDetails(e.target.value)}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          required
        />
        I confirm the information is accurate and agree to WSRN's Ethics Review Process.
      </label>

      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;

