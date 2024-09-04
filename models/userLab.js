import mongoose from 'mongoose';

const userLabSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    labId: {
        type: String,
        ref: 'Lab',
        required: true
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],
        default: 'not started'
    },
    timeSpent: {
        type: Number,
        default: 0
    },  // Total time spent on the lab in minutes
    sessionStart: {
        type: Date,
        required: false,
        allowNull: true
    },
},
    {
        timestamps: true
    });

const UserLab = mongoose.model('UserLab', userLabSchema);
export default UserLab;
