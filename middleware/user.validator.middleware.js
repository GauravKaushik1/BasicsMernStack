const validate = (schema, num) => async (req, res, next) => {
    try {
        if (![0, 1].includes(num)) {
        
           return res.status(401).json({ error: "Unauthorized access to middleware"});
            
        }
        const { email, password} = req.body;
        
        
        if(num === 1)
        {
            
            const LoginobjToValidate = {
                email: email?email.trim().toLowerCase(): "",
                password
            };


            
            const LoginValidatedBody = await schema.parseAsync(LoginobjToValidate);
        

            
            console.log("the loginvalidatedbody: ",LoginValidatedBody);
            req.body = LoginValidatedBody;
            return next();
        }
        
        
        const { username,  phone, firstName, middleName, lastName, profile_Pic, refreshToken, isAdmin, roles } = req.body;
        
        const normalizedLastName = Array.isArray(lastName) ? lastName : (lastName?lastName.toLowerCase().trim().split(" "):[""]); 
        const normalizedRoles = Array.isArray(roles)? roles : (roles?[roles]: ["user"]);

        const objToValidate = {
            username: username?username.toLowerCase(): "",
            email: email?email.toLowerCase(): "",
            phone,
            password,
            firstName: firstName ? firstName.toLowerCase() : "AskFrontendWhyIsFirstNameNotGiven", 
            middleName: middleName ? middleName.toLowerCase() : "",
            lastName: normalizedLastName || [""],
            
            profile_Pic: profile_Pic || "",
            refreshToken: refreshToken || "",
            isAdmin: isAdmin || false,
            roles: normalizedRoles || ["user"],
        };
        
        
        const validatedBody = await schema.parseAsync(objToValidate);
        console.log("the loginvalidatedbody: ",objToValidate);
        
        req.body = validatedBody;
        
       
        return next();
    } catch (err) {
        console.error("error in validate in user validator middleware",JSON.stringify(err));
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors?err.errors[0].message: err?err.message:err;
        const error = {
            status,
            message,
            extraDetails
        };

        console.error("Validation error:", error);
        
        return next(error);
    }
};

module.exports = validate;
