const { Router } = require('express');
const db = require('../config/databaseConnect');
const router = Router();

router.get('/health', async (_req, res) => {
    const startTime = Date.now();
    try {
        await db.query('SELECT NOW()');
        const duration = Date.now() - startTime;
        
        return res.json({
            status: 'OK',
            database: 'Online',
            message: 'Server is running',
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        return res.json({
            status: 'Error',
            database: 'Offline',
            message: 'Server is running',
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router; 