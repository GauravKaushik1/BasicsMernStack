const router = require('express').Router();
const registerController = require('../controllers/user.controller');
const { signupSchema, loginSchema } = require('../Validators/user.validator');
const validate = require('../middleware/user.validator.middleware');
const {isLoggedInMiddleware} = require('../middleware/user.isloggedIn.middleware');

const {upload} = require('../middleware/UploadMulter.middleware.js');
router.post('/register', 
  upload(4, ['image/jpeg', 'image/png']).fields([//upload.single,upload.array,upload.fields
  {
      name: "profile_Pic",
      maxCount: 1
  }, 
  {
      name: "coverImage",
      maxCount: 1
  }
]),
 validate(signupSchema, 0), registerController.register);
 router.post('/login', validate(loginSchema, 1),  registerController.login);
 router.get('/user', isLoggedInMiddleware, registerController.users_data);//if json web token is kept or not

module.exports = router;