const User = require('../models/User.Model');
const ApiResponse = require('../utilities/ApiResponse');


const register = async (req, res) => {
    try {
        const { username, email, phone, password, firstName, middleName, lastName, refreshToken, isAdmin, roles } = req.body;
        const profile_PicLocalPath = req.file ? req.file.filename.path : "";

        

        
        if ([firstName, email, username, password].some(field => !field.trim())) {



        
            return res.status(422).json({ message: "Required fields not sent" });
        }
        
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(403).json({
                message: existingUser.username === username
                    ? "The username already exists"
                    : "The email already exists"
            
            });

            
            
            
            
            
        }
        
        
        const normalizedLastName = Array.isArray(lastName) 
        ? lastName.flat().filter(str => str.trim()!=="").map(str => str.toLowerCase()) 
        
        : ((typeof lastName === 'string')?lastName.toLowerCase().split(" ").filter(str => str.trim() != "") : [""]); 
        const normalizedRoles = Array.isArray(roles)? roles : (roles?[roles]: ["user"]);
        const profile_Pic = profile_PicLocalPath ? await uploadOnCloudinary(profile_PicLocalPath) : "";
        
        
        const newUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            phone,
            password,
            fullName: {
                firstName: firstName.toLowerCase()||"AskFrontendWhyIsFirstNameNotGiven",
                middleName: middleName ? middleName.toLowerCase() : "",
                lastName: normalizedLastName,
                
            },
            profile_Pic: profile_Pic?.url || "",
            refreshToken: refreshToken || "",
            isAdmin: isAdmin || false,
            roles: normalizedRoles || ["user"]
        });
        
        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

        if (!createdUser) {
            return res.status(500).json({ message: "Error occurred while registring the user." });
        }

        res.status(201).json(
            new ApiResponse(
                201,
                {
                    UserDetails:{
                        user_id:createdUser.id, 
                        username:createdUser.username, 
                        email:createdUser.email, 
                        phone:createdUser.phone, 
                        password:createdUser.password, 
                        firstName:createdUser.fullName.firstName, 
                        middleName:createdUser.fullName.middleName, 
                        lastName:createdUser.fullName.lastName.filter(str=> str.trim()!== "").join(" "), 
                        profile_Pic:createdUser.profile_Pic, 
                        refreshToken:createdUser.refreshToken, 
                        isAdmin:createdUser.isAdmin, 
                        roles:createdUser.roles, 
                    },
                    userId: createdUser._id.toString(),
                    token: await createdUser.generateToken(), 
                },
                "User registered Successfully"
            )
        );
    } catch (error) {
        console.error("Error in user registration:", error);
        
        return next(error);
    }
};

const login = async (req, res)=> {
    try {
        const {email, username, password} = req.body;
        const userExist = await User.findOne({ $or: [{email}, {username}]});
        console.log("user controller login function the user exists: ",userExist);
        if(!userExist){
            return res
            .status(400)
            .json({message: "invalid credentials: "});
        }
         
        const match = await userExist.comparePassword(password);
        if(!match){
            return res.status(401).json({ message: "Invalid email or password"});
        }
        
        
        
        

        return res
        .status(200)
        
        
        .json(
            new ApiResponse(
                200, 
                {/*you may pass directly userExist .
                    userExist
                    .select(
                        "-password -refreshToken"
                    )  but scince the exclusing only works at the db retrival*/
                   user: 
                   {
                        user_id:userExist.id, 
                        username:userExist.username, 
                        email:userExist.email, 
                        phone:userExist.phone, 
                        password:userExist.password, 
                        firstName:userExist.fullName.firstName, 
                        middleName:userExist.fullName.middleName, 
                        lastName:userExist.fullName.lastName.filter(str=> str.trim()!== "").join(" "), 
                        profile_Pic:userExist.profile_Pic, 
                        refreshToken:userExist.refreshToken, 
                        isAdmin:userExist.isAdmin, 
                        roles:userExist.roles, 
                        createdAt:userExist.createdAt,
                        updatedAt:userExist.updatedAt,
                        token: await userExist.generateToken(), 
                    },
                    userId: userExist._id.toString(),
                    token: await userExist.generateToken(), 
            }, 
                "User logged in Successfully")
        )
    } catch (error) {
        console.error("Error in user login:", error);
        return res
        .status(500)
        .json({message: error.message});
    }
}
const logoutUser = async(req, res) => {
   try{ 
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 
                }
            },
            {
                new: true
            }
        )

        
        
        
        
        

        return res
        .status(200)
        
        
        .json(new ApiResponse(200, {}, "User logged Out"))
    }
    catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: `An error occurred while logging out ${error.message}` });
    }

}

const changeCurrentPassword = async(req, res) => {
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(req.user?._id)
        if (!user) {
                return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await user.comparePassword(oldPassword);

        if (!isPasswordCorrect) {
            return res(400).
            json({error:"Invalid old password"});
        }

        user.password = newPassword;
        await user.save({validateBeforeSave: false})

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
    }
    catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: `An error occurred while changing the password ${error.message}` });
    }
}

const ProfilePicUpdater = async (req, res) => {
    const profile_PicLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Profile Pic file is missing");
    }

    const profile_Pic = await uploadOnCloudinary(avatarLocalPath);
    if (!profile_Pic.url) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(req.user._id, { profile_Pic: profile_Pic.url }, { new: true }).select("-password");
    res.status(200).json(new ApiResponse(200, user, "Profile Pic image updated successfully"));
};



const users_data = async (req, res) => {
    try {
        const userData = req.user;
        console.log("user controller users_data function received data : ",userData);
        return res.status(200).json(
            new ApiResponse(
                200,
                userData,
                "the users data grab successful"
            )
        )
        
        
        
        
        
        
    } catch (error) {
        console.error(`error from the user controller in users_data function : ${error}`);
        return res.status(500).json({error: error.message})
    }
}
module.exports = { register , login, users_data, logoutUser, changeCurrentPassword};
