const User = require('../models/User.Model');
const Contact = require('../models/Contact.Model');
const ApiResponse  = require('../utilities/ApiResponse.js');
const deleteContactById = async(req, res, next) => {
    try {
        const { id } = req.params;
        
        await Contact.deleteOne({_id: id});
        
        return res.status(200).json(
            new ApiResponse(
                200,
                {message: "Contact Deletition Successful"}
                )
            );
    } catch (error) {
        next(error);
    }
}
const deleteUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}
const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
        
        const data = await User.findOne({_id: id}, {password: 0});
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
const updateUserById = async(req, res) => {
    try {

        const { id } = req.params;
        
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id: id}, {
            $set: updatedUserData
        })
        if (updatedData.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedData);
    } catch (error) {
        console.error("Error updating user:", error);
        next(error);
    }
}



const ensureAdminExists = async () => {
    try {
        
        const existingAdmin = await User.findOne({ isAdmin: true });
        if (!existingAdmin) {
            
            const adminDetails = {
                username: "admin@myblog.com",
                email: "admin@myblog.com",
                phone: "01234567812",
                password: "adminmyblog",
                fullName: {
                    firstName: "adminmyblog",
                    middleName: "",
                    lastName: [""],
                },
                profile_Pic: "",
                refreshToken: "",
                isAdmin: true,
                roles: ["user", "admin"]
            };
            try {
                await User.create(adminDetails);
            } 
            catch (error) {
                if (error.code === DUPLICATE_KEY_ERROR_CODE) {
                
                    
                    const uniqueTimestamp = new Date().getTime();
                    const uniqueAdminDetails = {
                        ...adminDetails,
                        username: `admin${uniqueTimestamp}@myblog.com`,
                        email: `admin${uniqueTimestamp}@myblog.com`
                    };
                    try{
                        await User.create(uniqueAdminDetails);
                    }
                    catch(error){
                        console.error("Error creating unique admin:", innerError);
                        throw new Error("Failed to create unique admin.");
                        
                    }
                } 
                else {
                    console.error("Error creating admin:", error);
                    throw new Error("Failed to create admin.");
                    
                }
            }
        }
    } catch (error) {
        console.error("Error ensuring admin exists:", error);
        throw new Error("Failed to ensure admin existence");
    }
};
            
            





const getAllUsers = async(req, res, next) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated/ logged in." });
        }
        
        if (!req.user || !req.user.isAdmin) {
            
            await ensureAdminExists();
            return res.status(403).json({ error: "Access denied. User is not an admin." });
        }
        
        const users = await User.find({}, {password:0});
        if(!users || users.length === 0){
            return res.status(404).json({message: "No users found"});

        }
        return res.status(200).json({users});
    } catch (error) {
        console.error("Error getting all users:", error);
    
        next(error);
    }
}

const getAllContacts = async(req, res, next) => {
    
        
    try{
        
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated." });
        }
        
        if (!req.user.isAdmin) {
            
            await ensureAdminExists();
            return res.status(403).json({ error: "Access denied. User is not an admin." });
        }
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No contact info found"});
        }
        return res.status(200).json({contacts});
    }
    catch(error){
        console.error("Error getting all contacts:", error);

        
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById , updateUserById, deleteContactById, ensureAdminExists};