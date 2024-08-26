const router = require('express').Router();
const adminControllers = require('../controllers/admin.controller');

const {isLoggedInMiddleware} = require('../middleware/user.isloggedIn.middleware');
const adminCheckMiddleware = require("../middleware/adminCheck.middleware");

router.get('/users', isLoggedInMiddleware,adminCheckMiddleware, adminControllers.getAllUsers);
router.get('/contacts', isLoggedInMiddleware, adminCheckMiddleware,adminControllers.getAllContacts);

router.get('/checkAdminhealth',isLoggedInMiddleware, adminControllers.ensureAdminExists);
router.delete('/contacts/delete/:id', isLoggedInMiddleware, adminCheckMiddleware, adminControllers.deleteContactById);//using colon here to get the data from the uri or url itself in this variable
router.delete('/users/delete/:id', isLoggedInMiddleware, adminCheckMiddleware, adminControllers.deleteUserById);//using colon here to get the data from the uri or url itself in this variable
router.get('/users/:id', isLoggedInMiddleware, adminCheckMiddleware, adminControllers.getUserById);//using colon here to get the data from the uri or url itself in this variable
router.patch('/users/update/:id', isLoggedInMiddleware, adminCheckMiddleware, adminControllers.updateUserById);//using colon here to get the data from the uri or url itself in this variable 
//use patch or put method for update
module.exports = router;