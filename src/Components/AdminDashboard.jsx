import React from 'react';
import StaffPane from './StaffPane';
import GeneralStaffPane from './GeneralStaffPane';
import OwnerPane from './OwnerPane';

const AdminDashboard = ({ user, incomingMessages }) => {
  const { email, role, permissions = [] } = user;

  const canViewOwnerPane = role === 'Owner' || permissions.includes('view_owner_pane');

  return (
    <div>
      <h1>Welcome, {email}</h1>

      <section>
        <h2>Your Personal Messages</h2>
        <StaffPane incomingMessages={incomingMessages} user={user} />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>General Staff Messages</h2>
        <GeneralStaffPane incomingMessages={incomingMessages} />
      </section>

      {canViewOwnerPane && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Owner Messages</h2>
          <OwnerPane incomingMessages={incomingMessages} />
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;

