const errorMiddleware = (error, req, res, next) => {
  // Log the full error stack trace to the server console
  console.error(error.stack);
  // Determine the HTTP status code
  const status = error.status || 500;
  // Determine the message to be sent to the client
  const message = error.message || "Backend Error";
  
  
  // Additional details for debugging or logging
  const extraDetails = error.extraDetails || "Error from the Backend";
  // Log error details with request method and path
  console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${extraDetails}`);
  // Send the response
  return res.status(status).json({ 
    message, 
    extraDetails, 
    error_message: error.stack 
     
  });


};

module.exports = errorMiddleware;
