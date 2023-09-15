import jwt from "jsonwebtoken";
import users from "../models/users.js";

const createAccessToken = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the account exists in the database
    const account = await users.findOne({ username });

    // If account not found, return error
    if (!account) {
      return res.status(401).json({ error: "Account not found" });
    }

    // Compare the provided password with the password in the database
    if (password !== account.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create the payload for the access token
    const payload = { accountId: account._id, username: account.username };

    // Generate the access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "365d", // Set the token expiration time (e.g., 1 hour)
    });

    // Return the access token to the client
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { createAccessToken };
