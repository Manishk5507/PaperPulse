import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send verification email
export const sendVerificationEmail = async (email, token) => {
  await transporter.sendMail({
    from: `"PaperPulse: " <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h2>Almost there!</h2>
      <p>Click below to verify your email:</p>
      <a href="${process.env.CLIENT_URL}/verify-email?token=${token}">
        Verify Email
      </a>
    `
  });
};

// Send paper status notification
export const sendStatusUpdateEmail = async (email, status, paperTitle) => {
  await transporter.sendMail({
    from: `"PaperPulse: " <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Paper ${status}`,
    html: `
      <h2>Your paper "${paperTitle}" has been ${status}</h2>
      ${status === 'rejected' ? 
        '<p>Reason: Please ensure the paper meets our guidelines</p>' : ''}
    `
  });
};