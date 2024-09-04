import jwt from 'jsonwebtoken'; // Importing jwt for token verification
import UserModel from '../models/user.js'; // Importing the User model

export default {
  /**
   * Middleware to check user authentication.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware or route handler.
   */
  checkUserAuth: async (req, res, next) => {
    try {
      const { authorization } = req.headers; // Get authorization header

      if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token provided" }); // Handle missing token
      }

      const token = authorization.split(" ")[1]; // Extract token from Bearer scheme
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY); // Verify token and extract user ID

      req.user = await UserModel.findById(decoded.id).select("-password"); // Find user by ID and exclude password

      if (!req.user) {
        return res.status(401).json({ message: "User not found" }); // Handle user not found
      }

      next(); // Call the next middleware or route handler
    } catch (err) {
      console.error(`Authentication error: ${err.message}`);
      res.status(401).json({ message: "Unauthorized user" }); // Handle invalid token
    }
  },
};
