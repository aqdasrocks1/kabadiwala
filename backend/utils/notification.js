const nodemailer = require("nodemailer");
const twilio = require("twilio");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = async function sendNotification(data) {
  const msg = `${data.name} requested pickup for ${data.scrapType} (${data.quantity}) at ${data.address}`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "New Scrap Pickup Request",
    text: msg
  });

  await client.messages.create({
    body: msg,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: data.contact
  });
};
