'use strict';

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA12345.?",
                }
            }
        */
        // Implement login logic here

        const { username,email, password } = req.body;
         
        if(!(username || email) && !password){throw new CustomError("Username or email and password are required", 401);
        } else {

        }
        
        res.status(200).send({ 
            error: false,
            message: 'Login successful' 
        });
    },
    logout: async (req, res) => {
        // Implement logout logic here
        res.status(200).send({ 
            error: false,
            message: 'Logout successful' 
        });
    },
    refresh: async (req, res) => {
        // Implement refresh logic here
        res.status(200).send({ 
            error: false,
            message: 'Token refreshed successfully' 
        });
    }
    // Add more functions as needed
    
    
    

}