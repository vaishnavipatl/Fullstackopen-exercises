const express = require('express');
const router = express.Router();
const User = require('../models/userdata'); // adjust path

router.post('/reset', async (req, res) => {
  await User.deleteMany({});
  res.status(204).end();
});

module.exports = router;
