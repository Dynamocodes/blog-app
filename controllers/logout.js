const router = require('express').Router();
const Session = require('../models/session');  // Import the Session model
const tokenExtractor = require('../utils/middleware').tokenExtractor;

router.delete('/', tokenExtractor, async (req, res) => {
    const token = req.get('authorization').split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'token missing' });
    }
  
    const session = await Session.findOne({
      where: {
        token: token,
      },
    });
  
    if (!session) {
      return res.status(404).json({ error: 'session not found' });
    }
  
    await session.destroy();
  
    return res.status(204).end();
  });
  
  module.exports = router;
  