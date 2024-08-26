const router = require('express').Router();
const contactForm = require('../controllers/contact.controller.js');

router.post('/contact', contactForm);

module.exports = router;