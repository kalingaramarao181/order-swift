const User = require("../models/userModel");
require("dotenv").config();

const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  if (req.user.role !== "super_admin" && req.user.role !== "enterprise_admin") {
    return res.status(403).json({ message: "Permission Denied" });
  }
  try {
    await User.updateUserRole(userId, newRole);
    res.status(200).json({ message: `User role updated to ${newRole}` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user.id,
      fullName: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const users = await User.findUserByRole(req.params.roleId);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user.id,
      fullName: user.name,
      phone: user.phone,
      address: user.address,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.log(err);
  }
};

const getUserDetails = async (req, res) => {
  
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user.id,
      fullName: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserRole,
  getUserDetails,
  getUsersByRole,
  getUserById,
  getAllUsers,
};
