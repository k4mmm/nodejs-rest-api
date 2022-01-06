const { User } = require("../../model/users");
const gravatar = require("gravatar");
const { makeHashPass } = require("../../hashpas/hashPassword");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers/sendEmail");
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = nanoid();
  const hashPass = makeHashPass(password);
  await User.create({
    name,
    email,
    password: hashPass,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Email confrimation",
    htma: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}>Confrim</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
    status: "succsess",
    user: {
      name,
      email,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
