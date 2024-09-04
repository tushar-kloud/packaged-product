import User from '../models/user.js';
import validator from 'validator';

/**
 * Create a new user.
 * 
 * @param {Object} req - The request object, containing the user data in the body.
 * @param {Object} res - The response object.
 * @returns {Object} - The created user document.
 */
export const createUser = async (req, res) => {
    try {
     const userId=req.user.localId;
      const { firstName,lastName, email, companyName } = req.body;
  
      // Validate request body
      if (!firstName || !lastName || !email || !companyName) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Ensure email format is correct
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Create and save the user
      const newUser = new User({ userId,firstName,lastName, email, companyName });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

/**
 * Retrieve a user by ID.
 * 
 * @param {Object} req - The request object, containing the user ID in params.
 * @param {Object} res - The response object.
 * @returns {Object} - The user document if found.
 */
export const getUserData = async (req, res) => {
    try {
      // Ensure Firebase token is valid
      
      const userId = req.user.localId;
      const user = await User.findOne({userId:userId}).select('-__v'); // Exclude __v field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };