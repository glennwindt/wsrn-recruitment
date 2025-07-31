import React, { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { collections } from "../services/firebase";

export default function NotificationSystem({ userRole = "admin", notifications = [] }) {
  const [notificationList, setNotificationList] = useState([
    {
      id: "NOT001",
      title: "New Interview Scheduled",
      message: "Your interview has been scheduled for April 20 at 10 AM.",
      recipient: "john.doe@example.com",
      type: "interview",
      date: "2025-04-18T14:30:00",
      read: false,
      sent: true
    },
    {
      id: "NOT002",
      title: "Legal Document Reminder",
      message: "Visa application for Carlos Mendes expires in 30 days. Please renew.",
      recipient: "carlos.mendes@shippingcompany.pt",
      type: "legal",
      date: "2025-04-15T16:45:00",
      read: true,
      sent: true
    },
    {
      id: "NOT003",
      title: "Applicant Match Found",
      message: "Lucas van der Meer matches your current job posting for Engine Room Rating on MV Blue Horizon.",
      recipient: "agency@dsamaritime.pt",
      type: "match",
      date: "2025-04-10T09:15:00",
      read: false,
      sent: false
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "",
    type: "all",
    sendEmail: true,
    sendSMS: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "sendEmail" || name === "sendSMS") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSend = async () => {
    if (!formData.title.trim() || !formData.message.trim() || !formData.recipient.includes("@")) {
      alert("Please fill all fields and ensure valid email address.");
      return;
    }

    const newNote = {
      id: `NOT${String(notificationList.length + 1).padStart(3, "0")}`,
      ...formData,
      date: new Date().toISOString(),
      read: false
    };

    try {
      await addDoc(collection(collections.db, "notifications"), newNote);
      setNotificationList([newNote, ...notificationList]);
      alert(`📧 SMS/Email sent to ${newNote.recipient}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send notification. Try again later.");
    }

    // Clear form after submission
    setFormData({
      title: "",
      message: "",
      recipient: "",
      type: "all",
      sendEmail: true,
      sendSMS: false
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotificationList(notificationList.filter(n => n.id !== id));
    }
  };

  const handleResend = (note) => {
    alert(`Resending to ${note.recipient}...`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Notification Center</h2>

      {/* Send New Notification */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Send New Notification</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">Recipient</label>
            <input
              type="email"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="glenn@wsrn.com"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="all">All Types</option>
              <option value="match">Applicant Match</option>
              <option value="legal">Legal Processing</option>
              <option value="payroll">Payroll / Tax</option>
              <option value="interview">Interview Reminder</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Delivery Method</label>
            <div className="flex space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sendEmail"
                  checked={formData.sendEmail}
                  onChange={handleChange}
                  className="mr-2"
                />
                Email
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sendSMS"
                  checked={formData.sendSMS}
                  onChange={handleChange}
                  className="mr-2"
                />
                SMS
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="New Interview Scheduled"
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Message</label>
          <textarea
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your interview has been scheduled..."
            className="w-full p-3 bg-gray-800 rounded"
          ></textarea>
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          📨 Send Notification
        </button>
      </form>

      {/* List of Notifications */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Sent Notifications ({notificationList.length})</h3>

        {notificationList.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Recipient</th>
                <th className="text-left p-2">Type</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notificationList.map((note, index) => {
                const noteDate = new Date(note.date);
                const formattedDate = noteDate.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3 text-gray-400">{formattedDate}</td>
                    <td className="py-3 font-medium">{note.title}</td>
                    <td className="py-3 text-sm">{note.recipient}</td>
                    <td className="py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        note.type === "match" ? "bg-green-900/30 text-green-400" :
                        note.type === "legal" ? "bg-yellow-900/30 text-yellow-400" :
                        note.type === "payroll" ? "bg-blue-900/30 text-blue-400" :
                        note.type === "interview" ? "bg-purple-900/30 text-purple-400" : "bg-red-900/30 text-red-400"
                      }`}>
                        {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => handleResend(note)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🔄 Resend
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No notifications sent yet.</p>
        )}
      </section>
    </div>
  );
}