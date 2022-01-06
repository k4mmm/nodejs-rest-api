const { User } = require("../../model/users");
const { NotFound } = require("http-errors");

const verifyEmail = (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    status: "success",
    code: "200",
    message: "Verify success",
  });
};

module.exports = verifyEmail;
