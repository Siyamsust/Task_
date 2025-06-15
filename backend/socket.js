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

            // Handle company joining their specific room
            socket.on('join_company', (companyId) => {
                console.log(`Company ${companyId} joined their room`);
                socket.join(`company_${companyId}`);
            });

            // Handle license response events
            socket.on('license_response', (data) => {
                console.log('Received license_response:', data);
                if (data.companyId) {
                    // Emit only to the specific company's room
                    io.to(`company_${data.companyId}`).emit('license_response', data);
                    console.log(`Sent license response to company_${data.companyId}`);
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized');
        }
        return io;
    }
};