const ApiResponse = require('../utilities/ApiResponse');
const Contact = require('../models/Contact.Model');

const contactForm = async(req, res) => {
    try {
        const {username} = req.body;
        console.log("the contact form send this data to contact controller", req.body);
        if(username.length<3){
            return res.status(402).json({error : "username must contain more than 3 charaters"});
        }
        const ContactRequestCreated = await Contact.create(req.body);


        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                ContactRequestCreated,
                "message recieved successfully"
            )
        );
    } catch (error) {
        console.error("error in contacts controller", error);
        return res.status(500).json({ error: error.message, message: "message is not delivered" });
    }
}

module.exports = contactForm;