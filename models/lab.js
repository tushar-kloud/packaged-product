import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  notebookUrl: {
    type: String,
    required: false
  },
  agenda: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  course:{
    type:String,
    enum:['ML','AI','BIZ'],
    required:true
  }
}, { 
  timestamps: true
});

const Lab = mongoose.model('Lab', labSchema);
export default Lab;

