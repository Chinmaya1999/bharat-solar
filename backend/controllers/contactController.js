// controllers/contactController.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'saiadityabehera@bharatsolarsolution.com',
      subject: `New Contact from ${name}`,
      html: `... (your existing email template) ...`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { contact };