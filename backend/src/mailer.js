const nodemailer = require('nodemailer');
const Settings   = require('./models/Settings');

async function sendMail({ to, subject, html }) {
  if (!to) return;
  try {
    const settings = await Settings.getSingleton();
    const user = settings.smtpUser || process.env.SMTP_USER;
    const pass = settings.smtpPass || process.env.SMTP_PASS;
    if (!user || !pass) return;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
    await transporter.sendMail({ from: `"StoneLegacy Website" <${user}>`, to, subject, html });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

module.exports = { sendMail };
