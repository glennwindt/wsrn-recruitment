export const sendEmail = ({ to, subject, body }) => {
  if (!to || !subject || !body) {
    console.warn('EmailComposer: Missing required fields.');
    return;
  }

  // Simulated email dispatch — replace with actual email service integration
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${body}`);

  // Future: integrate with EmailJS, Nodemailer, or internal API
  // Example:
  // return emailService.send({ to, subject, body });
};

