import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  jupyterLabUrl: {
    type: String,
    default: ""
  }
},
  {
    timestamp: true
  });

const User = mongoose.model('User', userSchema);
export default User;
