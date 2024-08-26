const multer = require('multer'); 

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("error in multer  captured by multer error handler middleware : ", err)
    
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  
  next(err);
};

module.exports = errorHandler;
