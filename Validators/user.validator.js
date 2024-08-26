const { z } = require('zod');
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
        
    password: z
        .string({ required_error: "Password is required" })
        .min(8, {message: "password must be of atleast 8 charaters"})
        .max(1024, {message:"password can be of atmost 1024 charaters"}),
})
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "userName is required for registration" })
        .trim()
        .min(5,{ message: "userName must be at least of 5 characters" })
        .max(255, { message: "userName must not be more than 255 characters" }),
    
    phone: z
        .string({ required_error: "Phone is required for registration" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
    firstName: z
        .string({ required_error: "First Name is required for registration" })
        .min(3, { message: "First Name must be at least of 3 characters" })
        .max(100, { message: "First Name must not be more than 100 characters" }),
    middleName: z
        .string()
        .max(100, { message: "Midname Name must not be more than 100 characters" })
        .optional(),
    lastName: z
        .array(
            z
            .string()
            .max(100, { message: "Last Name must not be more than 100 characters" })
            .optional()
        )
        .optional(),
    profile_Pic: z
        .string()
        .max(1024, { message: "ProfilePic url must not be more than 1024 characters" })
        .optional(),
    refreshToken: z
        .string()
        .optional(),
    isAdmin: z
        .boolean()
        .default(false),
    roles: z
        .array(
            z
            .string()
        )
        .optional(),
});


  
module.exports = {signupSchema,loginSchema};