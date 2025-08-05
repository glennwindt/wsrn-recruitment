// CrewHistoryModel.js

const CrewHistoryModel = {
  crewId: String, // Unique crew member ID
  fullName: String,
  dateOfBirth: Date,
  nationality: String,

  statusHistory: [
    {
      status: String, // e.g., "Active", "Retired", "Resigned", "Fired"
      changedBy: String, // User or system that made the change
      changedAt: Date,
      reason: String, // Optional reason for change
    }
  ],

  agencyHistory: [
    {
      agencyName: String,
      startDate: Date,
      endDate: Date,
      notes: String,
    }
  ],

  shippingHistory: [
    {
      companyName: String,
      vesselName: String,
      startDate: Date,
      endDate: Date,
      rank: String,
    }
  ],

  payrollHistory: [
    {
      period: String, // e.g., "Jan 2024"
      salary: Number,
      deductions: Number,
      bonuses: Number,
      paidOn: Date,
    }
  ],

  documentHistory: [
    {
      documentType: String, // e.g., "Contract", "Certificate"
      fileName: String,
      uploadedAt: Date,
      updatedBy: String,
    }
  ],

  notes: String, // General notes or remarks
  createdAt: Date,
  updatedAt: Date,
};

module.exports = CrewHistoryModel;

