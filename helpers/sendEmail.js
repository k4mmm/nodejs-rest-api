const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { API_KEY } = process.env;

sgMail.setApiKey(API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "k.chaikovskyi@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
