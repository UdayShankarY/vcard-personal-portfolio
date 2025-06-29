const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ THIS is the correct way to include cors

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "newemailbyuday@gmail.com",  // your Gmail
    pass: "rpmi xoum yhgk wytl"        // your App Password from Gmail
  }
});

app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  // Email to YOU (portfolio owner)
  const toOwner = {
    from: email,
    to: "newemailbyuday@gmail.com",
    subject: `New message from ${fullname}`,
    text: `You received a message:\n\nName: ${fullname}\nEmail: ${email}\nMessage:\n${message}`
  };

  // Auto-response to USER
  const toUser = {
    from: "newemailbyuday@gmail.com",
    to: email,
    subject: "Message Received ✔",
    text: `Hi ${fullname},\n\nI’m Uday Shankar Y. I’ve received your message and will respond shortly.\n\nThank you for reaching out!\n\nRegards,\nUday`
  };

  try {
    await transporter.sendMail(toOwner);
    await transporter.sendMail(toUser);
    res.status(200).json({ success: true, message: "Messages sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send emails." });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
