const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class authController {
  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Plese provide your email" });
    }
    if (!password) {
      return res.status(404).json({ message: "Plese provide your password" });
    }

    try {
      const user = await authModel.findOne({ email }).select("+password");
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const obj = {
            id: user.id,
            name: user.name,
            category: user.category,
            role: user.role,
          };
          const token = await jwt.sign(obj, process.env.secret, {
            expiresIn: process.env.exp_time,
          });
          return res.status(200).json({ message: "Login success", token });
        } else {
          return res.status(404).json({ message: "Invalid Password" });
        }
      } else {
        return res.status(404).json({ message: "User Not found" });
      }
    } catch (error) {}
  };

  add_writer = async (req, res) => {
    const { email, name, password, category } = req.body;
    if (!name) {
      return res.status(404).json({ message: "Plese Provide name" });
    }
    if (!password) {
      return res.status(404).json({ message: "Plese Provide password" });
    }
    if (!category) {
      return res.status(404).json({ message: "Plese Provide category" });
    }
    if (!email) {
      return res.status(404).json({ message: "Plese Provide email" });
    }
    if (email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }
    try {
      const writer = await authModel.findOne({ email: email.trim() });
      if (writer) {
        return res.status(404).json({ message: "users allready exit" });
      } else {
        const new_writer = await authModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password.trim(), 9),
          category: category.trim(),
          role: "writer",
        });
        return res
          .status(201)
          .json({ message: "Writer add sucess...", writer: new_writer });
      }
    } catch (error) {
      return res.status(404).json({ message: "Internal server error" });
    }
  };
  get_writers = async (req, res) => {
    try {
      const writers = await authModel
        .find({ role: "writer" })
        .sort({ createdAt: -1 });
      return res.status(200).json({ writers });
    } catch (error) {
      return res.status(404).json({ message: "Internal server error" });
    }
  };
}
module.exports = new authController();


