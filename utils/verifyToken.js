import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function to verify Firebase ID token
export async function verifyToken(idToken) {
  const apiKey = process.env.FIREBASE_API_KEY; // Replace with your Firebase Web API key
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      idToken: idToken
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
    
  } catch (error) {
    console.error('Error verifying token:', error.response ? error.response.data : error.message);
    throw new Error('Invalid token');
  }
}

