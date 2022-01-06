const { User } = require("../../model/users");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers/sendEmail");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Email verifying",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    status: "success",
    code: "200",
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
