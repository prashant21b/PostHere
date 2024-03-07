const nodemailer = require("nodemailer");

exports.sendWelcomEmail = async (email) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "alfreda.gutmann@ethereal.email",
      pass: "SeXqx7dYQPmWxrRTgD",
    },
  });

  let info = await transporter.sendMail({
    from: '"Prashant kumar jha" <jhakumarprasant111@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Registration confermation", // Subject line
    text: "Welcome to our application", // plain text body
    html: "<b>Thangs for registration</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
 
};