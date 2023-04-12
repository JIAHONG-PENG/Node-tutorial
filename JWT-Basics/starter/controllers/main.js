const jwt = require("jsonwebtoken");
const { CustomAPIError } = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status.json({ msg: "User created", token: token });
};

const dashboard = async (req, res) => {
  const authorHeader = req.headers.authorization;
  if (!authorHeader || !authorHeader.startWith("Bearer ")) {
    return CustomAPIError("Unauthorised to access", 400);
  }

  try {
    const token = authorHeader.split(" ")[1];
    const decoded = token.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `hello ${decoded.username}`,
      secret: `Your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    return CustomAPIError("Unauthorised to access", 400);
  }
};

module.exports = { login, dashboard };
