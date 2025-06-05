let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: [
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://localhost:3002',
                    'http://localhost:3003',
                    'http://localhost:3004'
                ],
                methods: ["GET", "POST"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"]
            },
            transports: ['websocket', 'polling'],
            allowEIO3: true
        });

        // Handle socket connections
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialize');
        }
        return io;
    }
};