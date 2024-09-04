import { verifyToken } from '../utils/verifyToken.js';
/**
 * Middleware to verify Firebase token.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export async function authMiddleware(req, res, next) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
  
    if (!idToken) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const tokenData = await verifyToken(idToken);
      // Attach user data to request object
      req.user = tokenData.users[0]; // Attach user data to req.user
      next(); // Pass control to the next middleware/route handler
    } catch (error) {
      res.status(401).send('Invalid or expired token');
    }
  }