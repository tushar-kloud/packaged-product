import UserLab from "../models/userLab.js";

export default (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('stop-session', async (data) => {
            console.log('Received stop-session event');
            try {
                const { userId, labId } = data;
                if (!userId || !labId) {
                    console.error('Missing userId or labId');
                    return socket.emit('error', 'Missing userId or labId');
                }

                const userLab = await UserLab.findOne({ userId, labId });

                if (!userLab) {
                    console.error('UserLab entry not found');
                    return socket.emit('error', 'UserLab entry not found');
                }

                const sessionStart = new Date(userLab.sessionStart);
                const sessionEnd = new Date();
                const timeSpent = userLab.timeSpent + (sessionEnd - sessionStart);

                if (timeSpent > 0) {
                    await UserLab.findOneAndUpdate(
                        { userId, labId },
                        { timeSpent, sessionStart: null }
                    );

                    console.log('Session completed');
                } else {
                    console.error('Time spent is less than 0');
                    socket.emit('error', 'Time spent is less than 0');
                }

            } catch (error) {
                console.error('Error handling stop-session event:', error);
                socket.emit('error', 'An error occurred while processing the session.');
            }
        });

        socket.on('mark-as-completed', async (data) => {
            try {
                const { userId, labId } = data;

                if (!userId || !labId) {
                    console.error('Missing userId or labId');
                    return socket.emit('error', 'Missing userId or labId');
                }

                const userLab = await UserLab.findOne({ userId, labId });

                if (!userLab) {
                    console.error('UserLab entry not found');
                    return socket.emit('error', 'UserLab entry not found');
                }

                const sessionStart = new Date(userLab.sessionStart); 
                const sessionEnd = new Date();
                const timeSpent = userLab.timeSpent + (sessionEnd - sessionStart); 

                if (timeSpent > 0) {
                    await UserLab.findOneAndUpdate({ userId, labId }, { timeSpent, sessionStart: null, status: 'completed' });
                    console.log('Lab marked as completed');
                    socket.emit('labCompleted');
                } else {
                    console.error('Time spent is less than 0');
                    return socket.emit('error', 'Time spent is less than 0');
                }



            } catch (error) {
                console.error('Error marking lab as completed:', error);
                socket.emit('error', 'An error occurred while marking the lab as completed.');
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};