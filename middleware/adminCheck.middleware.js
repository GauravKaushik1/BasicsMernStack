const { ensureAdminExists } = require("../controllers/admin.controller");

const adminCheckMiddleware = async (req, res, next) => {
    
    console.log("adminCheckMiddleware started");
    
    try {
        
        if (!req.user) {
            console.error("User information is missing. It was not set by authentication middleware");
            return res.status(401).json({ error: "User not authenticated." });
        }
        
       
        
        console.log("The data received by admin check middleware:", req.user);

        
        if (!req.user.isAdmin) {
            await ensureAdminExists();
            console.error("User is not an admin.");
            return res.status(403).json({ error: "Access denied. User is not an admin." });
        }
        console.log("User is an admin.");
        next();
    } catch (error) {
        console.error("Error in adminCheckMiddleware:", error);
        next(error);  
    }
};

module.exports = adminCheckMiddleware;
