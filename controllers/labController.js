import Lab from '../models/lab.js';
import User from '../models/user.js';
import UserLab from '../models/userLab.js';


/**
 * Create lab details in the database.
 * 
 * @param {Object} req - The request object, containing lab details in the body.
 * @param {Object} res - The response object.
 * @returns {Object} - The created lab details.
 */
export const createLab = async (req, res) => {
  try {
    // Destructure properties from request body
    const { title, description, imageUrl, difficulty, pdfUrl, companyName, keywords, agenda, course } = req.body;

    // Basic validation
    if (!title || !description || !imageUrl || !difficulty || !pdfUrl || !companyName || !keywords || !agenda || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new lab instance
    const lab = new Lab({ title, description, imageUrl, difficulty, pdfUrl, companyName, keywords, agenda, course });
    // Save the lab to the database
    await lab.save();

    // Respond with the created lab
    res.status(201).json(lab);
  } catch (error) {
    console.error('Error creating lab:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
/**
 * Get all labs associated with the user's company.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - List of labs with their details and status.
 */
export const getAllLabs = async (req, res) => {
  try {
    const userId = req.user.localId;

    // Get user details
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { companyName } = user;
    // Find all labs for the user's company
    const labs = await Lab.find({ companyName }).select('title description imageUrl _id difficulty keywords agenda course');

    if (labs.length === 0) {
      return res.status(404).json({ message: 'No labs found for this company' });
    }

    // Populate lab details with user status
    const labsWithStatus = await Promise.all(labs.map(async (lab) => {
      const userLab = await UserLab.findOne({ userId: userId, labId: lab._id });
      const status = userLab ? userLab.status : 'not started';

      return {
        id: lab._id,
        title: lab.title,
        description: lab.description,
        imageUrl: lab.imageUrl,
        difficulty: lab.difficulty,
        keywords: lab.keywords,
        agenda: lab.agenda,
        status: status,
        course: lab.course
      };
    }));
    res.status(200).json(labsWithStatus);
  } catch (error) {
    console.error('Error getting labs by user company:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get detailed information about a specific lab and update user lab status.
 * 
 * @param {Object} req - The request object, containing the lab ID in params.
 * @param {Object} res - The response object.
 * @returns {Object} - Details of the lab and the updated status.
 */
export const getLabDetails = async (req, res) => {
  try {
    const { labId } = req.params;
    const userId = req.user.localId;

    // Get lab details
    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    // Update or create user's lab status
    let userLab = await UserLab.findOne({ userId, labId });
    if (!userLab) {
      userLab = new UserLab({ userId, labId, status: 'in progress', sessionStart: new Date() });
    } else {
      // If the lab is not completed, update the status to in progress
      console.log();
      if (userLab.status !== 'completed') {
        userLab.status = 'in progress';
        userLab.sessionStart = new Date();
      }
    }


    await userLab.save();

    // Send lab details along with updated status
    res.status(200).json({
      id: lab._id,
      title: lab.title,
      description: lab.description,
      difficulty: lab.difficulty,
      pdfUrl: lab.pdfUrl,
      keywords: lab.keywords,
      course: lab.course,
      agenda: lab.agenda,
      status: userLab.status,
      timeSpent: userLab.timeSpent
    });
  } catch (error) {
    console.error('Error getting lab details and updating status:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
