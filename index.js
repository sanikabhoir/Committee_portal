const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database endpoint
app.get('/api/test-db', async (req, res) => {
    try {
        // Here you would typically add your database connection test
        // For now, we'll just send a success response
        res.json({ 
            status: 'success',
            message: 'Database connection test endpoint reached',
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Database connection test failed',
            error: error.message
        });
    }
});

// Basic root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running successfully!' });
});

// Start server with error handling
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test database connection at: http://localhost:${PORT}/api/test-db`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Please try these solutions:`);
        console.log('1. Kill the process using this port');
        console.log('2. Change the port number in index.js');
        console.log('\nTo kill the process on macOS/Linux:');
        console.log(`lsof -i :${PORT}`);
        console.log('Then: kill -9 <PID>');
    } else {
        console.error('Server error:', err);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server shutdown complete');
    });
});